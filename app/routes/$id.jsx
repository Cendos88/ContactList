import {prisma} from "../db.server.js";
import {json, redirect} from "@remix-run/node";
import {useActionData, useLoaderData} from "@remix-run/react";
import "./styles/edit.css"

export const loader = async ({params}) => {
    const id = parseInt(params.id);
    const contact = await prisma.contact.findUnique({where: {id: id}});
    return json({contact});
};
export const action = async ({request, params}) => {
    const id = parseInt(params.id);
    const formData = await request.formData();

    const updatedContact = {
        firstName: formData.get("firstName").trim(),
        lastName: formData.get("lastName").trim(),
        email: formData.get("email").trim(),
        phone: formData.get("phone").trim(),
    };
    if (!updatedContact.firstName || updatedContact.firstName.length < 2 || updatedContact.firstName.length > 50) {
        return json({error: "First Name must be between 2 and 50 characters.", values: updatedContact}, {status: 400});
    }
    if (!updatedContact.lastName || updatedContact.lastName.length < 2 || updatedContact.lastName.length > 50) {
        return json({error: "Last Name must be between 2 and 50 characters.", values: updatedContact}, {status: 400});
    }
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(updatedContact.email)) {
        return json({error: "Please enter a valid email address.", values: updatedContact}, {status: 400});
    }
    const phonePattern = /^[0-9]{9}$/;
    if (!phonePattern.test(updatedContact.phone)) {
        return json({error: "Please enter a valid 10-digit phone number.", values: updatedContact}, {status: 400});
    }

    await prisma.contact.update({
        where: {id},
        data: updatedContact,
    });
    return redirect("/");


};


export default function Id() {
    const {contact} = useLoaderData();
    const actionData = useActionData()
    return (
        <div className="container">
            <h1 className="header">Edit Contact</h1>
            <form method="POST">
                {actionData?.error && <p style={{color: 'red'}}>{actionData.error}</p>}
                <label htmlFor="firstName">First Name</label>
                <input type="text"
                       id="firstName"
                       name="firstName"
                       minLength="2"
                       maxLength="50"
                       required
                       defaultValue={actionData?.values?.firstName || contact.firstName}
                />

                <label htmlFor="lastName">Last Name</label>
                <input type="text"
                       id="lastName"
                       name="lastName"
                       minLength="2"
                       maxLength="50"
                       required
                       defaultValue={actionData?.values?.lastName || contact.lastName}
                />

                <label htmlFor="email">Email</label>
                <input type="email"
                       id="email"
                       name="email"
                       required
                       defaultValue={actionData?.values?.email || contact.email}
                />

                <label htmlFor="phone">Phone</label>
                <input type="tel"
                       id="phone"
                       name="phone"
                       required
                       pattern="^[0-9]{9}$"
                       defaultValue={actionData?.values?.phone || contact.phone}
                />

                <button type={"submit"}>Edit</button>
            </form>
        </div>
    );
}