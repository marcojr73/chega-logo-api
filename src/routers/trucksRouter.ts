import { Router } from "express"
import trucksController from "../controllers/trucksController.js"
import trucksMiddleware from "../middlewares/trucksMiddleware.js"
import utils from "../utils/index.js"

const trucksRouter= Router()

trucksRouter.post("/truckes", trucksMiddleware.validateTruckdata, utils.validateTokenAndGetAccount, trucksController.newTruck)
trucksRouter.get("/truckes", utils.validateTokenAndGetAccount, trucksController.listTrucks)
trucksRouter.put("/truckes", trucksMiddleware.validateTruckdata, utils.validateTokenAndGetAccount, trucksController.updateTruck)
trucksRouter.delete("/truckes/:licensePlate", utils.validateTokenAndGetAccount, trucksController.deleteTrucks)

export default trucksRouter