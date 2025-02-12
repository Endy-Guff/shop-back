import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import * as mongoose from "mongoose"
import bodyParser from "body-parser"
import errorMiddleware from "./middlewares/error-middleware"
import cookieParser from "cookie-parser"
import { authRouter } from "./routers/auth-router"
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "./swagger-output.json"
import { adminRouter } from "./routers/admin-routers"
import { categoriesRouter } from "./routers/categories-router"
import { productsRouter } from "./routers/products-router"
import fileUpload from "express-fileupload"
import path from "path"
import { reviewsRouter } from "./routers/reviews-router"

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(fileUpload({}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
}
app.use(cors(corsOptions))
app.use(cookieParser())

app.use("/auth", authRouter)
app.use("/categories", categoriesRouter)
app.use("/products", productsRouter)
app.use("/reviews", reviewsRouter)
app.use("/admin", adminRouter)
app.use(errorMiddleware)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(
  "/products-photo",
  express.static(path.join(__dirname, "static", "products-photo"))
)

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)

  try {
    await mongoose
      .connect(process.env.DB_URL as string)
      .then(() => console.log("mongoDb connected"))
      .catch((e) => console.log(e))
  } catch (e) {
    console.log(e)
  }
})
