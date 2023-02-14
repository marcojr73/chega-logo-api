import cors from "cors"
import express from "express"
import "express-async-errors"
import errorHandler from "./middlewares/errorHandlerMiddleware.js"
import authRoute from "./routers/authRouter.js"
import placesRouter from "./routers/placesRouter.js"
import revenuesRouter from "./routers/revenuesRouter.js"
import trucksRouter from "./routers/trucksRouter.js"
import swaggerUi from "swagger-ui-express"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swaggerDocs from "./config/swagger.json" assert { type: "json" }


const app = express()

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(cors())
app.use(express.json())

app.use(authRoute)
app.use(trucksRouter)
app.use(placesRouter)
app.use(revenuesRouter)
app.use(errorHandler)

export default app