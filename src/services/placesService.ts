import placesRepository from "../repositories/placesRepository.js"

async function getAllPlaces(){
    return await placesRepository.findAllPlaces()
}

export default {
    getAllPlaces
}