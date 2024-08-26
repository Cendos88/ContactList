import {Link, useLoaderData} from "@remix-run/react";


export default function ContactList() {
    const {contacts} = useLoaderData();

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
        <div>
            <h1>Contact List</h1>
            <table>
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
                {contacts.map(contact => (
                    <tr key={contact.id}>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>
                            <button onClick={() => handleDelete(contact.id)}>Delete</button>
                        </td>
                        <td>
                            <Link to={`/${contact.id}`}>Edit</Link>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/new">Add New Contact</Link>
        </div>
    );


}
