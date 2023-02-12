import { Request, Response } from "express"
import { Readable } from "stream"
import placesService from "../services/placesService.js"

async function newPlace(req: Request, res: Response){
    const { buffer } = req.file
    const readAbleFile = new Readable()
    readAbleFile.push(buffer)
    readAbleFile.push(null)
    const places = await placesService.readOfLineCsv(readAbleFile)
    await placesService.insertUnregisteredPlaces(places)
    res.status(201).send("Created")
}

async function listPlaces(req: Request, res: Response){
    const page = +req.query.page
    const limit = +req.query.limit
    const places = await placesService.getAllPlaces(page, limit)
    res.status(200).send(places)
}

async function deletePlace(req: Request, res: Response){
    const id = +req.params.id
    await placesService.isPlaceRegistered(id)
    await placesService.deletePlace(id)
    res.status(204).send("Deleted")
}

export default {
    newPlace,
    listPlaces,
    deletePlace
}