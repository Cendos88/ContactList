import {json} from "@remix-run/node";
import {prisma} from "../db.server.js";
import ContactList from "../Components/ContactList.jsx";

export const loader = async () => {
    const contacts = await prisma.contact.findMany();
    return json({contacts});
};


export default function Index() {
    return (<div>
            <ContactList/>
        </div>
    )
}
