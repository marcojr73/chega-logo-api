import app from "./app.js"
import dotenv from "dotenv"

dotenv.config()

const PORT = +process.env.PORT || 4000

BigInt.prototype["toJSON"] = function () {
  return parseInt(this.toString())
}

app.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}.`)
})