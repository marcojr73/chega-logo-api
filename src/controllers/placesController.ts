import { Request, Response } from "express"
import placesService from "../services/placesService.js"

async function newPlace(req: Request, res: Response){
    res.status(201).send("places")
}

async function listPlaces(req: Request, res: Response){
    const places = await placesService.getAllPlaces()
    res.status(200).send(places)
}

export default {
    newPlace,
    listPlaces
}