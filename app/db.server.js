import {PrismaClient} from "@prisma/client";

let prisma;

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.__db) {
        global.__db = new PrismaClient();
    }
    prisma = global.__db;
}

export {prisma};
