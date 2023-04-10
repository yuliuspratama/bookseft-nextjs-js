const { PrismaClient } = require("@prisma/client");

const prisma = 
    global.prisma ||
    new PrismaClient({
        log: ['query'],
    })

export {prisma}