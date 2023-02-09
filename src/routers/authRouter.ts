import { Router } from "express"
import authController from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const authRoute= Router()

authRoute.post("/sign-up", authMiddleware.validateAuthdata, authController.signUp)
authRoute.post("/sign-in", authMiddleware.validateAuthdata, authController.signIn)

export default authRoute