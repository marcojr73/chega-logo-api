import { Readable } from "stream"
import { placesEntity } from "../interfaces/index.js"
import placesRepository from "../repositories/placesRepository.js"
import readLine from "readline"
import errors from "../utils/errors/index.js"

async function getAllPlaces(page: number, limit: number) {
    if (!page) page = 1
    if (!limit) limit = 10
    return await placesRepository.findAllPlaces(page, limit)
}

function createReader(buffer: any) {
    const readAbleFile = new Readable()
    readAbleFile.push(buffer)
    readAbleFile.push(null)
    return buffer
}

async function readOfLineCsv(readAbleFile: any) {
    const placesLine = readLine.createInterface({
        input: readAbleFile
    })
    const places: placesEntity[] = []

    for await (const line of placesLine) {
        const placesLineSplit = line.split(";")
        places.push({
            id: Number(placesLineSplit[0]),
            name: placesLineSplit[1],
            distance: placesLineSplit[2],
        })
    }
    places.shift()
    return places
}

async function insertUnregisteredPlaces(places: placesEntity[]) {
    for await (const place of places) {
        const ans = await placesRepository.findPlaceById(place.id)
        if (!ans) {
            await placesRepository.createPlaceDb(place)
        }
    }
}

async function isPlaceRegistered(id: number) {
    const place = await placesRepository.findPlaceById(id)
    if (!place) errors.notFound("Place not found")
}

async function deletePlace(id: number) {
    await placesRepository.deletePlaceById(id)
}


export default {
    getAllPlaces,
    readOfLineCsv,
    createReader,
    insertUnregisteredPlaces,
    isPlaceRegistered,
    deletePlace
}