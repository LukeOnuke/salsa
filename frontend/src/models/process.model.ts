import type { ServerModel } from "./server.model";

export interface ProcessModel{
    processId: number,
    name: string,
    serverId: number,
    server: ServerModel,
    secret: string
}