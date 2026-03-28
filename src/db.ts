import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Location } from "./entities/Location";
import { LogEntry } from "./entities/LogEntry";
import { Process } from "./entities/Process";
import { Server } from "./entities/Server";
import { User } from "./entities/User";

configDotenv()
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        Location, LogEntry, Process, Server, User
    ],
    synchronize: true,
    logging: false
})