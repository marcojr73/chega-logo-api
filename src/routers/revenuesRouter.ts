import { Router } from "express"
import revenuesController from "../controllers/revenuesController.js"
import revenuesMiddleware from "../middlewares/revenuesMiddleware.js"
import utils from "../utils/index.js"

const revenuesRouter= Router()

revenuesRouter.post("/revenues", revenuesMiddleware.validateRevenuesdata, utils.validateTokenAndGetAccount, revenuesController.newRevenue)
revenuesRouter.get("/revenues", utils.validateTokenAndGetAccount, revenuesController.listRevenues)

export default revenuesRouter