import type { Server } from "./server.model";

export interface Process{
    processId: number,
    name: string,
    serverId: number,
    server: Server,
    secret: string
}