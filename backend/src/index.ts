import express, { type Request, type Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import { AppDataSource } from './db'
import { UserService } from './services/user.service'
import { UserRoute } from './routes/user.route'
import { LogEntryRoute } from './routes/log-entry.route'
import oolama from 'ollama'
import { ProcessRoute } from './routes/process.route'
import { LocationRoute } from './routes/location.route'
import { ServerRoute } from './routes/server.route'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('public'))

// Application routes
app.use(UserService.validateToken)
app.use('/api/user', UserRoute)
app.use('/api/logentry', LogEntryRoute)
app.use('/api/process', ProcessRoute)
app.use('/api/location', LocationRoute)
app.use('/api/server', ServerRoute)

// 404 Not Found
app.get('{/*path}', function (req, res) {
    res.status(404).json({
        message: 'NOT_FOUND',
        timestamp: new Date()
    })
})

configDotenv()
const port = Number(process.env.SERVER_PORT)

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database')
        app.listen(port, () => {
            console.log(`Server started on port ${port}`)
        })
    })
    .catch((e) => console.log('Database connection failed', e))