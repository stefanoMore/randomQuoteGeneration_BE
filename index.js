import express from 'express'
import mongoose from "mongoose"
import cors from 'cors'
import quoteRoutes from './routes/quote.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'


const app = express()
const PORT = 3000
const CONNECTION_URL = 'mongodb://localhost:27017/quotesDB'

app.use(express.json())
app.use(cors())


app.use('/quote', quoteRoutes)
app.use('/auth',  authRoutes)

// app.use('/', quotesRoutes)

mongoose.connect(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`SERVER RUNNING ON PORT ${CONNECTION_URL}`)
        })
    })
    .catch(error => console.log(error))



