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

describe("post places", () => {
    // ========================= FIX THIS ==========================================//
    // it("should register places", async () => {                                   //
    //     const csvFile = path.resolve(__dirname, "../factories/Localidades.csv")  //
    //     console.log(csvFile)                                                     //
    //     const token = await factory.createValidToken()                           //
    //     const response = await request(app)                                      //
    //         .post("/places")                                                     //
    //         .set("Content-Type", "multipart/form-data")                          //  
    //         .set("Authorization", "Bearer " + token)                             //
    //         .attach("file", csvFile)                                             //
    //     console.log(response)                                                    //
    //     expect(response.statusCode).toBe(201)                                    //
    // })                                                                           //
    //==============================================================================//
})

describe("get places", () => {
    it("should list places", async () => {
        const token = await factory.createValidToken()
        const response = await supertest(app).get("/places").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength
    })
    it("should fail list places when not send token", async () => {
        const token = factory.createInvalidToken()
        const response = await supertest(app).get("/places").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(401)
    })
})

describe("delete places", () => {
    it("should delete place", async () => {
        const token = await factory.createValidToken()
        const placeId = await factory.createPlaceDb()
        const response = await supertest(app).delete(`/places/${placeId}`).auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(204)
    })
    it("should fail delete place not register", async () => {
        const token = await factory.createValidToken()
        const response = await supertest(app).delete("/places/1").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(404)
    })
    it("should fail delete place when not send token", async () => {
        const token = factory.createInvalidToken()
        const response = await supertest(app).delete("/places/1").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(401)
    })
})

