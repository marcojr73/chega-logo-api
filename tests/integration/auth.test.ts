import supertest from "supertest"
import app from "../../src/app.js"
import * as factory from "../factories/index.js"
import dotenv from "dotenv"
import utils from "../../src/utils/index.js"

dotenv.config()

console.log("tests running on base" + process.env.DATABASE_URL)

beforeEach(async () => {
    await utils.DELETE_DB()
})

describe("sign-up", () => {
    it("should create an new user", async () => {
        const user = factory.createValidAuthData()
        const response = await supertest(app).post("/sign-up").send(user)
        expect(response.statusCode).toBe(201)
    })
    it("should fail to create an new user from the incorrect data", async () => {
        const user = factory.createInvalidAuthData()
        const response = await supertest(app).post("/sign-up").send(user)
        expect(response.statusCode).toBe(422)
    })
    it("should fail to create a duplicate user", async () => {
        const user = factory.createValidAuthData()
        await supertest(app).post("/sign-up").send(user)
        const response = await supertest(app).post("/sign-up").send(user)
        expect(response.statusCode).toBe(409)
    })
})

describe("sign-in", () => {
    it("should send token from correct user data", async () => {
        const user = factory.createValidAuthData()
        await supertest(app).post("/sign-up").send(user)
        const response = await supertest(app).post("/sign-in").send(user)
        expect(response.statusCode).toBe(200)
    })
    it("should not send token from nonexistent user", async () => {
        const user = factory.createValidAuthData()
        const response = await supertest(app).post("/sign-in").send(user)
        expect(response.statusCode).toBe(404)
    })
    it("should not send token from incorrect password", async () => {
        const user = factory.createValidAuthData()
        await supertest(app).post("/sign-up").send(user)
        const response = await supertest(app).post("/sign-in").send({userName: user.userName, password: user.userName})
        expect(response.statusCode).toBe(422)
    })
})