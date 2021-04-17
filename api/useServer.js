import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import { menuRouter } from './routes/menu'

const mongoUri = process.env.RAZZLE_MONGO_URI

export function useServer(server) {
    // mongodb connection
    mongoose.connect(
        mongoUri,
        {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (error) => {
            if (error) {
                console.error(error)
            }

            console.log('Mongodb is connected')
        }
    )

    const corsOptions = {
        origin: 'http://localhost:3000',
    }

    // add middle ware
    server.use(express.json())
    server.use(cors(corsOptions))
    server.use('/api/menu', menuRouter)
}
