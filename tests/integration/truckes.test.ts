import supertest from "supertest"
import app from "../../src/app.js"
import * as factory from "../factories/index.js"
import dotenv from "dotenv"
import utils from "../../src/utils/index.js"
dotenv.config()

console.log("Tests running on db " + process.env.DATABASE_URL)

beforeEach(async () => {
    await utils.DELETE_DB()
})

describe("Post truck", () => {
    it("should sucess post truck", async () => {
        const token = await factory.createValidToken()
        const truck = factory.createFakeTruck(true)
        const response = await supertest(app).post("/truckes").send(truck).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(201)
    })
    it("should fail post invalid truck type", async () => {
        const token = await factory.createValidToken()
        const truck = factory.createFakeTruck(false)
        const response = await supertest(app).post("/truckes").send(truck).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(422)
    })
    it("should fail post duplicate truck", async () => {
        const token = await factory.createValidToken()
        const truck = factory.createFakeTruck(true)
        await supertest(app).post("/truckes").send(truck).auth(token, {type: "bearer"})
        const response = await supertest(app).post("/truckes").send(truck).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(409)
    })
    it("should fail post truck when not send Token", async () => {
        const token = factory.createInvalidToken()
        const truck = factory.createFakeTruck(true)
        const response = await supertest(app).post("/truckes").send(truck).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(401)
    })
    it("should sucess post truck", async () => {
        const token = await factory.createValidToken()
        const truck = factory.createFakeTruck(false)
        const response = await supertest(app).post("/truckes").send(truck).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(422)
    })
})

describe("Get truckes", () => {
    it("should sucess get truckes", async () => {
        const token = await factory.createValidToken()
        const response = await supertest(app).get("/truckes").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(200)
    })
    it("should fail get truckes when not send token", async () => {
        const token = factory.createInvalidToken()
        const response = await supertest(app).get("/truckes").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(401)
    })
})

describe("Update truckes", () => {
    it("should sucess put truck", async () => {
        const truck = factory.createFakeTruck(true)
        const token = await factory.createValidToken()
        await supertest(app).post("/truckes").send(truck).auth(token, {type: "bearer"})
        const response = await supertest(app).put("/truckes").send(truck).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(200)
    })
    it("should fail put not register truck", async () => {
        const truck = factory.createFakeTruck(true)
        const token = await factory.createValidToken()
        const response = await supertest(app).put("/truckes").send(truck).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(404)
    })
    it("should fail put invalid truck type", async () => {
        const truck = factory.createFakeTruck(false)
        const token = await factory.createValidToken()
        const response = await supertest(app).put("/truckes").send(truck).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(422)
    })
    it("should fail put truck when not send token", async () => {
        const truck = factory.createFakeTruck(true)
        const token = factory.createInvalidToken()
        await supertest(app).post("/truckes").send(truck).auth(token, {type: "bearer"})
        const response = await supertest(app).put("/truckes").send(truck).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(401)
    })
})

describe("Delete truckes", () => {
    it("should sucess delete truck", async () => {
        const token = await factory.createValidToken()
        const truck = factory.createFakeTruck(true)
        await supertest(app).post("/truckes").send(truck).auth(token, {type: "bearer"})
        const response = await supertest(app).delete(`/truckes/${truck.licensePlate}`).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(204)
    })
    it("Should fail delete not register truck", async () => {
        const token = await factory.createValidToken()
        const truck = factory.createFakeTruck(true)
        const response = await supertest(app).delete(`/truckes/${truck.licensePlate}`).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(404)
    })
    it("Should fail delete truck when not send truck", async () => {
        const token = factory.createInvalidToken()
        const truck = factory.createFakeTruck(true)
        const response = await supertest(app).delete(`/truckes/${truck.licensePlate}`).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(401)
    })
})