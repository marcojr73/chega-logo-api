import { faker } from "@faker-js/faker"
import { prisma } from "../../src/config/dataBase"
import Jwt from "jsonwebtoken"

function createValidAuthData() {
    return {
        userName: faker.name.firstName(),
        password: faker.datatype.number({min: 10000000}).toString(),
    }
}

function createInvalidAuthData() {
    return {}
}

async function createValidToken() {
    const KEYJWT = "pudim"
    const user = await prisma.users.create({
        data: {
            userName: faker.name.firstName(),
            password: faker.finance.bitcoinAddress(),
        }
    })
    return Jwt.sign({ userId: user.id }, KEYJWT, { expiresIn: "1d" })
}

function createInvalidToken() {
    return faker.finance.bitcoinAddress()
}

export {
    createValidAuthData,
    createInvalidAuthData,
    createValidToken,
    createInvalidToken,
}