import { truckEntity } from "../interfaces/index.js"
import trucksRepository from "../repositories/trucksRepository.js"
import errors from "../utils/errors/index.js"

async function truckAlreadyExist(licensePlate: string) {
    const truck = await trucksRepository.findTruckByLicensePlate(licensePlate)
    if(truck) errors.conflict("Truck already register on database")
}

async function isTruckRegister(licensePlate: string) {
    const truck = await trucksRepository.findTruckByLicensePlate(licensePlate)
    if(!truck) errors.notFound("Truck not found")
}

async function registerNewTruck(truck: truckEntity) {
    await trucksRepository.upsertTruck(truck)
}

async function getAllTrucks(page?: number, limit?: number){
    if(!page) page = 1
    if(!limit) limit = 10
    return await trucksRepository.findAllTrucks(page, limit)
}

async function updateTruck(truck: truckEntity){
    await trucksRepository.upsertTruck(truck)
}

async function deleteTruck(licensePlate: string){
    await trucksRepository.deleteTruckByLicensePlate(licensePlate)
}

export default {
    truckAlreadyExist,
    registerNewTruck,
    getAllTrucks,
    isTruckRegister,
    updateTruck,
    deleteTruck
}