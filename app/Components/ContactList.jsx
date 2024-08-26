import {Link, useLoaderData} from "@remix-run/react";
import {useState} from "react";
import "./ContactList.css";


export default function ContactList() {
    const {contacts} = useLoaderData();
    const [searchQuery, setSearchQuery] = useState("")

    const filteredContacts = contacts.filter(contact =>
        contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
    );

    const handleDelete = async (id) => {

        try {
            const response = await fetch('delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id}),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Failed to delete contact');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

    };


    return (
        <div className="container">
            <h1 className="header">Contact List</h1>
            <input
                className="searchInput"
                type="text"
                placeholder="Search by name, email, or phone"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state on input change
                style={{ marginBottom: "20px", padding: "5px", width: "300px" }}
            />
            <table className="table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredContacts.map(contact => (
                    <tr key={contact.id}>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>
                            <button className="button delete"
                                    onClick={() => handleDelete(contact.id)}>Delete</button>
                        </td>
                        <td>
                            <Link to={`/${contact.id}`}
                                  className="button edit">Edit</Link>
                        </td>

                    </tr>

                ))}
                {filteredContacts.length === 0 && (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>No contacts found</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Link to="/new">Add New Contact</Link>
        </div>
    );


}
