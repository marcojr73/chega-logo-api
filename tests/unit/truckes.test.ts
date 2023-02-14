/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from "@jest/globals"

import dotenv from "dotenv"
import * as factory from "../factories/index.js"
import * as mock from "../factories/mocks.js"

import truckesService from "../../src/services/trucksService"
import truckesRepository from "../../src/repositories/trucksRepository.js"
import errors from "../../src/utils/errors/index.js"


dotenv.config()

jest.mock("../../src/repositories/revenuesRepository.js")

describe("Truckes service", () => {
    it("Shold not call conflict error in truckAlreadyExist", async () => {
        jest.spyOn(truckesRepository, "findTruckByLicensePlate").mockImplementationOnce((): any => false)
        jest.spyOn(errors, "conflict").mockImplementationOnce((): any => null)
        await truckesService.truckAlreadyExist("")
        expect(errors.conflict).not.toBeCalled()
    })
    it("Shold call conflict error in truckAlreadyExist", async () => {
        jest.spyOn(truckesRepository, "findTruckByLicensePlate").mockImplementationOnce((): any => true)
        jest.spyOn(errors, "conflict").mockImplementationOnce((): any => null)
        await truckesService.truckAlreadyExist("")
        expect(errors.conflict).toBeCalled()
    })
    it("Shold not call notFound error in isTruckRegister", async () => {
        jest.spyOn(truckesRepository, "findTruckByLicensePlate").mockImplementationOnce((): any => true)
        jest.spyOn(errors, "notFound").mockImplementationOnce((): any => null)
        await truckesService.isTruckRegister("")
        expect(errors.notFound).not.toBeCalled()
    })
    it("Shold call notFound error in isTruckRegister", async () => {
        jest.spyOn(truckesRepository, "findTruckByLicensePlate").mockImplementationOnce((): any => false)
        jest.spyOn(errors, "notFound").mockImplementationOnce((): any => null)
        await truckesService.isTruckRegister("")
        expect(errors.notFound).toBeCalled()
    })
    it("Shold not happen nothing", async () => {
        jest.spyOn(truckesRepository, "upsertTruck").mockImplementationOnce((): any => false)
        const truck = factory.createValidTruck()
        const ans = await truckesService.registerNewTruck(truck)
        expect(ans).toBeUndefined()
    })
    it("Shold return array in getAllTrucks", async () => {
        jest.spyOn(truckesRepository, "findAllTrucks").mockImplementationOnce((): any => [])
        const ans = await truckesService.getAllTrucks()
        expect(typeof ans).toBe("object")
    })
    it("Shold not happen nothing in updateTruck", async () => {
        jest.spyOn(truckesRepository, "upsertTruck").mockImplementationOnce((): any => false)
        const truck = factory.createValidTruck()
        const ans = await truckesService.updateTruck(truck)
        expect(ans).toBeUndefined()
    })
    it("Shold not happen nothing in deleteTruck", async () => {
        jest.spyOn(truckesRepository, "deleteTruckByLicensePlate").mockImplementationOnce((): any => false)
        const ans = await truckesService.deleteTruck("")
        expect(ans).toBeUndefined()
    })
})