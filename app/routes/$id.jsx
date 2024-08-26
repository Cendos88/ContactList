import {prisma} from "../db.server.js";
import {json, redirect} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export const loader = async ({params}) => {
    const id = parseInt(params.id);
    const contact = await prisma.contact.findUnique({where: {id: id}});
    return json({contact});
};
export const action = async ({request, params}) => {
    const id = parseInt(params.id);
    const formData = await request.formData();

    const updatedContact = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
    };

    try {
        await prisma.contact.update({
            where: {id},
            data: updatedContact,
        });
        return redirect("/");
    } catch (error) {
        console.error("Failed to update contact:", error);
        return json({error: "Failed to update contact"}, {status: 500});
    }
};


export default function Id() {
    const {contact} = useLoaderData();
    return (
        <div>
            <h1>Edit Contact</h1>
            <form method="POST">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" defaultValue={contact.firstName} name="firstName" required/>

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" defaultValue={contact.lastName} name="lastName" required/>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" defaultValue={contact.email} name="email" required/>

                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" defaultValue={contact.phone} name="phone" required/>

                <button type={"submit"}>Edit</button>
            </form>
        </div>
    );
}