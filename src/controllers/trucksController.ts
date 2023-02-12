import { Request, Response } from "express"
import { truckEntity } from "../interfaces/index.js"
import trucksService from "../services/trucksService.js"

async function newTruck(req: Request, res: Response){
    const data: truckEntity = req.body
    await trucksService.truckAlreadyExist(data.licensePlate)
    await trucksService.registerNewTruck(data)
    res.status(201).send("Created")
}

async function listTrucks(req: Request, res: Response){
    const page = +req.query.page
    const limit = +req.query.limit
    const trucks = await trucksService.getAllTrucks(page, limit)
    res.status(200).send(trucks)
}

async function updateTruck(req: Request, res: Response){
    const data: truckEntity = req.body
    await trucksService.isTruckRegister(data.licensePlate)
    await trucksService.updateTruck(data)
    res.status(200).send("Updated")
}

async function deleteTrucks(req: Request, res: Response){
    const {licensePlate} = req.params
    await trucksService.isTruckRegister(licensePlate)
    await trucksService.deleteTruck(licensePlate)
    res.status(204).send("Deleted")
}

export default {
    newTruck,
    listTrucks,
    updateTruck,
    deleteTrucks
}