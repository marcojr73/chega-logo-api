import { prisma } from "../config/dataBase.js"
import { userEntity } from "../interfaces/index.js"

async function findUserByName(userName: string){
    return await prisma.users.findFirst({
        where: {userName}
    })
}

async function createUser(user: userEntity){
    await prisma.users.create({
        data: user
    })
}

export default {
    findUserByName,
    createUser
}