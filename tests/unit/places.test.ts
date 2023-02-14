/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from "@jest/globals"

import dotenv from "dotenv"
import * as factory from "../factories/index.js"
import * as mock from "../factories/mocks.js"

import placesService from "../../src/services/placesService.js"
import placesRepository from "../../src/repositories/placesRepository.js"
import errors from "../../src/utils/errors/index.js"
import { Readable } from "stream"
import readLine  from "readline"


dotenv.config()

jest.mock("../../src/repositories/placesRepository.js")

describe("auth service", () => {
    it("Shold return array", async () => {
        jest.spyOn(placesRepository, "findAllPlaces").mockImplementationOnce((): any => [])
        const ans = await placesService.getAllPlaces(1,2)
        expect(typeof ans).toBe("object")
    })
    it("Create readable by type parameter", async () => {
        jest.spyOn(Readable, "Readable").mockImplementationOnce((): any => [])
        const ans = await placesService.createReader("")
        expect(typeof ans).toBe("string")
    })
    it("should return array", async () => {
        jest.spyOn(readLine, "createInterface").mockImplementationOnce((): any => mock.readable)
        const ans = await placesService.readOfLineCsv("")
        expect(typeof ans).toBe("object")
    })
    it("Shold call db if not place register", async () => {
        jest.spyOn(placesRepository, "findPlaceById").mockImplementationOnce((): any => true)
        jest.spyOn(placesRepository, "createPlaceDb")
        const places = factory.createFakePlace()
        await placesService.insertUnregisteredPlaces(places)
        expect(placesRepository.createPlaceDb).not.toBeCalled()
    })
    it("Shold not call db if place register", async () => {
        jest.spyOn(placesRepository, "findPlaceById").mockImplementationOnce((): any => false)
        jest.spyOn(placesRepository, "createPlaceDb")
        const places = factory.createFakePlace()
        await placesService.insertUnregisteredPlaces(places)
        expect(placesRepository.createPlaceDb).toBeCalled()
    })
    it("Shold not call not found error in isPlaceRegistered", async () => {
        jest.spyOn(placesRepository, "findPlaceById").mockImplementationOnce((): any => true)
        jest.spyOn(errors, "notFound").mockImplementationOnce((): any => null)
        await placesService.isPlaceRegistered(1)
        expect(errors.notFound).not.toBeCalled()
    })
    it("Shold call not found error in isPlaceRegistered", async () => {
        jest.spyOn(placesRepository, "findPlaceById").mockImplementationOnce((): any => false)
        jest.spyOn(errors, "notFound").mockImplementationOnce((): any => null)
        await placesService.isPlaceRegistered(1)
        expect(errors.notFound).toBeCalled()
    })
    it("Not should happen nothing", async () => {
        jest.spyOn(placesRepository, "deletePlaceById").mockImplementationOnce((): any => null)
        const ans = await placesService.deletePlace(1)
        expect(ans).toBeUndefined()
    })
})