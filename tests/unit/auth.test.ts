import { jest } from "@jest/globals"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
import * as factory from "../factories/index.js"

import authServices from "../../src/services/authService.js"
import userRepository from "../../src/repositories/userRepository.js"
import errors from "../../src/utils/errors/index.js"

dotenv.config()

jest.mock("../../src/repositories/userRepository.js")

describe("auth service", () => {
    it("Not call function conflict in userAlreadyExist", async () => {
        jest.spyOn(userRepository, "findUserByName").mockImplementationOnce((): any => null)
        jest.spyOn(errors, "conflict")
        const auth = factory.createValidAuthData()
        await authServices.userAlreadyExist(auth.userName)
        expect(errors.conflict).not.toBeCalled()
    })
    it("Thro error conflict in userAlreadyExist", async () => {
        jest.spyOn(userRepository, "findUserByName").mockImplementationOnce((): any => true)
        jest.spyOn(errors, "conflict").mockImplementationOnce((): any => true)
        const auth = factory.createValidAuthData()
        await authServices.userAlreadyExist(auth.userName)
        expect(errors.conflict).toBeCalled()
    })
    it("Call function bcrypt in encryptPassword", async () => {
        jest.spyOn(bcrypt, "hashSync")
        const auth = factory.createValidAuthData()
        await authServices.encryptPassword(auth.userName)
        expect(bcrypt.hashSync).toBeCalled()
    })
    it("Shold be return mock function in isUserRegister", async () => {
        const auth = factory.createValidAuthData()
        jest.spyOn(userRepository, "findUserByName").mockImplementationOnce((): any => auth.userName)
        const ans = await authServices.isUserRegister(auth.userName)
        expect(ans).toBe(auth.userName)
    })
    it("Should Call function conflict in isUserRegister", async () => {
        jest.spyOn(userRepository, "findUserByName").mockImplementationOnce((): any => false)
        jest.spyOn(errors, "notFound").mockImplementationOnce((): any => false)
        const auth = factory.createValidAuthData()
        await authServices.isUserRegister(auth.userName)
        expect(errors.notFound).toBeCalled()
    })
    it("Should not call 422 function in verifyPasswordIsCorrect", async () => {
        const auth = factory.createValidAuthData()
        jest.spyOn(bcrypt, "compareSync").mockImplementationOnce((): any => true)
        jest.spyOn(errors, "unprocessableEntity")
        authServices.verifyPasswordIsCorrect(auth.password, auth.password)
        expect(errors.unprocessableEntity).not.toBeCalled()
    })
    it("Should call 422 function in verifyPasswordIsCorrect", async () => {
        const auth = factory.createValidAuthData()
        jest.spyOn(bcrypt, "compareSync").mockImplementationOnce((): any => false)
        jest.spyOn(errors, "unprocessableEntity").mockImplementationOnce((): any => false)
        authServices.verifyPasswordIsCorrect(auth.password, auth.password)
        expect(errors.unprocessableEntity).toBeCalled()
    })
    it("Should not call 422 function in generateToken", async () => {
        jest.spyOn(jwt, "sign").mockImplementationOnce((): any => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NjM3NjMzMSwiZXhwIjoxNjc2NDYyNzMxfQ.PCRNY7nj0i01oT5wknpT6ikLjOAgyda2KNDKfZ9NmdM")
        const ans = authServices.generateToken(1)
        expect(typeof ans).toBe("string")
    })
})