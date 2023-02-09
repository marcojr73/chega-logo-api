import cors from "cors"
import express from "express"
import "express-async-errors"
import errorHandler from "./middlewares/errorHandlerMiddleware.js"
import authRoute from "./routers/authRouter.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use(authRoute)
app.use(errorHandler)

export default app