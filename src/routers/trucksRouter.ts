import { Router } from "express"
import trucksController from "../controllers/trucksController.js"
import trucksMiddleware from "../middlewares/trucksMiddleware.js"
import utils from "../utils/index.js"

const trucksRouter= Router()

trucksRouter.post("/truck", trucksMiddleware.validateTruckdata, utils.validateTokenAndGetAccount, trucksController.newTruck)
trucksRouter.get("/truckes", utils.validateTokenAndGetAccount, trucksController.listTrucks)

export default trucksRouter