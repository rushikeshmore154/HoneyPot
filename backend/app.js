import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { connectDb } from "./db.js"
import mainRouter from "./routes/index.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/api", mainRouter)

const start = async () => {
    await connectDb();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

start()