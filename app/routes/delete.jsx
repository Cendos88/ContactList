import {json} from "@remix-run/node";
import {prisma} from "../db.server.js";

export const action = async ({request}) => {
    if (request.method === 'DELETE') {
        try {
            const {id} = await request.json(); // Parse the JSON body

            if (typeof id !== 'number') {
                return json({error: 'Invalid ID'}, {status: 400});
            }

            await prisma.contact.delete({
                where: {id},
            });

            return new Response(null, {status: 204}); // No content
        } catch (error) {
            return json({error: 'Failed to delete contact'}, {status: 500});
        }
    }

    return json({error: 'Method not allowed'}, {status: 405});
};