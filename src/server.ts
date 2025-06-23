import 'dotenv/config'
import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server
const PORT = 4000

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eko35.mongodb.net/L2-A3-book_library-server?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('connected to mongoDB by mongoose')
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`)
        })

    } catch (error) {
        console.log(error)
    }
}

main()