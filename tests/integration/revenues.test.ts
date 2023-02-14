import supertest from "supertest"
import { prisma } from "../../src/config/dataBase.js"
import app from "../../src/app.js"
import * as factory from "../factories/index.js"
import dotenv from "dotenv"
import utils from "../../src/utils/index.js"
dotenv.config()

console.log("Tests running on base" + process.env.DATABASE_URL)

beforeEach(async () => {
    await utils.DELETE_DB()
})

describe("Post revenue", () => {
    it("should sucess post revenue", async () => {
        const token = await factory.createValidToken()
        const value = factory.createFakeValue("valid")
        const response = await supertest(app).post("/revenues").send(value).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(201)
    })
    it("should fail post revenue when not send Token", async () => {
        const token = factory.createInvalidToken()
        const value = factory.createFakeValue("valid")
        const response = await supertest(app).post("/revenues").send(value).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(401)
    })
    it("should fail post revenue when send invalid value", async () => {
        const token = factory.createInvalidToken()
        const value = factory.createFakeValue("invalid")
        const response = await supertest(app).post("/revenues").send(value).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(422)
    })
})

describe("Get revenue", () => {
    it("should sucess get revenue", async () => {
        const token = await factory.createValidToken()
        const response = await supertest(app).get("/revenues").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(200)
    })
    it("should fail get revenue when not send Token", async () => {
        const token = factory.createInvalidToken()
        const value = factory.createFakeValue("valid")
        const response = await supertest(app).post("/revenues").send(value).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(401)
    })
})