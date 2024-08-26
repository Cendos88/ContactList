import {json, redirect} from "@remix-run/node";
import {prisma} from "../db.server.js";
import {useActionData} from "@remix-run/react";
import "./styles/new.css"


export const action = async ({request}) => {
    const formData = await request.formData();

    const newContact = {
        firstName: formData.get("firstName").trim(),
        lastName: formData.get("lastName").trim(),
        email: formData.get("email").trim(),
        phone: formData.get("phone").trim(),
    };
    if (!newContact.firstName || newContact.firstName.length < 2 || newContact.firstName.length > 50) {
        return json({ error: "First Name must be between 2 and 50 characters.",values: newContact }, { status: 400 });
    }
    if (!newContact.lastName || newContact.lastName.length < 2 || newContact.lastName.length > 50) {
        return json({ error: "Last Name must be between 2 and 50 characters.",values: newContact }, { status: 400 });
    }
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(newContact.email)) {
        return json({ error: "Please enter a valid email address.",values: newContact }, { status: 400 });
    }
    const phonePattern = /^[0-9]{9}$/;
    if (!phonePattern.test(newContact.phone)) {
        return json({ error: "Please enter a valid 10-digit phone number.",values: newContact }, { status: 400 });
    }

    await prisma.contact.create({data: newContact});

    return redirect("/");
};

export default function New() {
    const actionData = useActionData();

    return (
        <div className='container'>
            <h1 className="header">Add New Contact</h1>
            {actionData?.error && <p className="error-message" style={{ color: 'red' }}>{actionData.error}</p>}
            <form method="post">
                <label htmlFor="firstName">First Name</label >
                <input type="text"
                       id="firstName"
                       name="firstName"
                       minLength="2"
                       maxLength="50"
                       required
                       defaultValue={actionData?.values?.firstName || ''}/>

                <label htmlFor="lastName">Last Name</label>
                <input type="text"
                       id="lastName"
                       name="lastName"
                       required
                       minLength="2"
                       maxLength="50"
                       defaultValue={actionData?.values?.lastName || ''}/>

                <label htmlFor="email">Email</label>
                <input type="email"
                       id="email"
                       name="email"
                       required
                       defaultValue={actionData?.values?.email || ''}/>

                <label htmlFor="phone">Phone</label>
                <input type="tel"
                       id="phone"
                       name="phone"
                       required
                       pattern="^[0-9]{9}$"
                       defaultValue={actionData?.values?.phone || ''}/>

                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
}
