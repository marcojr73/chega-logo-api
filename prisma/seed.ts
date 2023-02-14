import { prisma } from "../src/config/dataBase.js"
import data from "./data.js"

import dotenv from "dotenv"

dotenv.config()

console.log("seed running on base" + process.env.DATABASE_URL)

async function seed() {
    const user = await prisma.users.findFirst({ where: {} })
    if (!user) {
        await prisma.users.create({ data: { userName: "seed", password: "4815162342", id: 1 } })
        await prisma.revenues.createMany({
            data
        })
        console.log("sucess create seed")
    }
} seed().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})