import express from "express"
import dotenv from "dotenv"
import path from "path"
import cookieParser from "cookie-parser"

// Utils
import connectDB from "./config/db.js"


//routes
import userRoutes from "./routes/userRoutes.js"


dotenv.config()
const port = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())




app.use("/api/v1/users", userRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})