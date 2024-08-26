import {redirect} from "@remix-run/node";
import {prisma} from "../db.server.js";


export const action = async ({request}) => {
    const formData = await request.formData();

    const newContact = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
    };


    await prisma.contact.create({data: newContact});

    return redirect("/");
};

export default function New() {
    return (
        <div>
            <h1>Add New Contact</h1>
            <form method="post">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required/>

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" required/>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required/>

                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" required/>

                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
}
