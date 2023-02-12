import { Router } from "express"
import placesController from "../controllers/placesController.js"
import utils from "../utils/index.js"
import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage })
const placesRouter = Router()

placesRouter.post("/places", upload.single("file"), utils.validateTokenAndGetAccount, placesController.newPlace)
placesRouter.get("/places", utils.validateTokenAndGetAccount, placesController.listPlaces)
placesRouter.delete("/places/:id", utils.validateTokenAndGetAccount, placesController.deletePlace)

export default placesRouter