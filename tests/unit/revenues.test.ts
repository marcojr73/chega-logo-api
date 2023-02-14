/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from "@jest/globals"

import dotenv from "dotenv"
import * as factory from "../factories/index.js"
import * as mock from "../factories/mocks.js"

import revenuesService from "../../src/services/revenuesServices.js"
import revenuesRepository from "../../src/repositories/revenuesRepository.js"
import errors from "../../src/utils/errors/index.js"


dotenv.config()

jest.mock("../../src/repositories/revenuesRepository.js")

describe("auth service", () => {
    it("Shold return array", async () => {
        const ans = revenuesService.getLastTwelveMonthYear()
        expect(ans).toHaveLength(12)
    })
    it("Shold return array", async () => {
        jest.spyOn(revenuesRepository, "getBalanceByMonthYear").mockImplementationOnce((): any => [{sum: 0, count: 0}])
        const lastMonths = factory.lastMonthYear()
        const ans = await revenuesService.mappingBalanceLastMonth(lastMonths)
        expect(ans).toHaveProperty("balance")
        expect(ans).toHaveProperty("stats")
    })
    it("Shold return undefined", async () => {
        jest.spyOn(revenuesRepository, "getBalanceByMonthYear").mockImplementationOnce((): any => [])
        const lastMonths = factory.lastMonthYear()
        const ans = await revenuesService.mappingBalanceLastMonth(lastMonths)
        expect(ans).toBeUndefined()
    })
})