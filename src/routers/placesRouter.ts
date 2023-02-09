import { Router } from "express"
import placesController from "../controllers/placesController.js"
import utils from "../utils/index.js"

const placesRouter = Router()

placesRouter.post("/places")
placesRouter.get("/places", utils.validateTokenAndGetAccount, placesController.listPlaces)

export default placesRouter