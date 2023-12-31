import express from 'express'
import mongoose from "mongoose"
import cors from 'cors'
import quoteRoutes from './routes/quote.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'
import configDotenv from 'dotenv'




const app = express()
const PORT = 3000
const CONNECTION_URL = 'mongodb://localhost:27017/quotesDB'

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:8100',
    credentials: true
}))
 // to save th token nei cookier


app.use('/quote', quoteRoutes)
app.use('/',  authRoutes)

// app.use('/', quotesRoutes)

mongoose.connect(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`SERVER RUNNING ON PORT ${CONNECTION_URL}`)
        })
    })
    .catch(error => console.log(error))



