import cors from "cors"
import express from "express"
import "express-async-errors"
import errorHandler from "./middlewares/errorHandlerMiddleware.js"
import authRoute from "./routers/authRouter.js"
import placesRouter from "./routers/placesRouter.js"
import revenuesRouter from "./routers/revenuesRouter.js"
import trucksRouter from "./routers/trucksRouter.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use(authRoute)
app.use(trucksRouter)
app.use(placesRouter)
app.use(revenuesRouter)
app.use(errorHandler)

export default app