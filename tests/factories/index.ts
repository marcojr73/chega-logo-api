import { faker } from "@faker-js/faker"
import { prisma } from "../../src/config/dataBase"
import Jwt from "jsonwebtoken"
import fs from "fs"

function createValidAuthData() {
    return {
        userName: "marquim",
        password: faker.datatype.number({ min: 10000000 }).toString(),
    }
}

function createInvalidAuthData() {
    return {}
}

async function createValidToken() {
    const KEYJWT = process.env.KEYJWT + ""
    const user = await prisma.users.create({
        data: createValidAuthData()
    })
    return Jwt.sign({ userId: user.id }, KEYJWT, { expiresIn: "1d" })
}

function createInvalidToken() {
    return faker.finance.bitcoinAddress()
}

async function importCsvFilePlace() {
    const csvFile = fs.readFile("./Localidades.csv", "utf8", function (err, data) {
        console.log(data)
        console.log(err)
    })
    return csvFile
}

async function createPlaceDb() {
    const id = faker.datatype.number({ min: 1, max: 100 })
    await prisma.places.create({
        data: {
            id,
            name: faker.address.cityName(),
            distance: faker.address.latitude(),
        }
    })
    return id
}

function createFakeValue(status: string) {
    if (status === "valid") {
        return { value: faker.datatype.number({ min: 0 }) }
    } else {
        return { value: null }
    }
}

function createFakeTruck(valid: boolean) {
    if (valid) return {
        name: faker.name.firstName(),
        licensePlate: "BRA2K23",
        year: "2015",
        color: faker.color.rgb(),
        efficiency: faker.datatype.number({ min: 0 }).toString(),
    }
    else {
        return {}
    }
}

async function registerFakeTruckDB() {
    const truck = await prisma.trucks.create({
        data: {
            name: faker.name.firstName(),
            licensePlate: "BRA2K23",
            year: "2015",
            color: faker.color.rgb(),
            efficiency: faker.datatype.number({ min: 0 }).toString(),
        }
    })
    return truck.id
}

function createFakePlace() {
    return [
        {
            id: faker.datatype.number({ min: 0 }),
            name: faker.name.firstName(),
            distance: faker.address.latitude()
        }
    ]
}

function lastMonthYear() {
    return [{
        month: faker.date.month(),
        year: faker.date.month(),
    }]
}

function createValidTruck(){
    return {
        name: faker.name.firstName(),
        licensePlate: "BRA2K23",
        year: "2015",
        color: faker.color.rgb(),
        efficiency: faker.datatype.number({ min: 0 }).toString(),
    }
}

export {
    createValidAuthData,
    createInvalidAuthData,
    createValidToken,
    createInvalidToken,
    importCsvFilePlace,
    createPlaceDb,
    createFakeValue,
    createFakeTruck,
    registerFakeTruckDB,
    createFakePlace,
    lastMonthYear,
    createValidTruck
}