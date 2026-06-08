import { AppDataSource } from "../db";
import { Server } from "../entities/Server";
import { dataExists, getPagenated } from "../utils";
import type { Pagenated } from "../models/pagenated.model";
import type { DeepPartial, Repository } from "typeorm";

const serverRepo: Repository<Server> = AppDataSource.getRepository(Server);

export class ServerService {
    static async getServers() {
        return await serverRepo.find();
    }

    static async getServersPagenated(pageSize: number, pageNumber: number): Promise<Pagenated<Server>> {
        return getPagenated(
            serverRepo,
            {
                location: true
            },
            {
                serverId: "DESC"
            },
            pageSize,
            pageNumber
        );
    }

    static async getServerById(id: number) {
        return dataExists(
            await serverRepo.findOne({
                where: { serverId: id },
                relations: {
                    location: true
                },
                withDeleted: true
            })
        );
    }

    static async deleteServerById(id: number) {
        await serverRepo.softDelete(id);
    }

    static async updateServer(server: Server) {
        await this.getServerById(server.serverId);
        await serverRepo.save(server);
    }

    static async createServer(server: Server){
        const partialServer: DeepPartial<Server> = server;
        partialServer.serverId = undefined
        await serverRepo.save(partialServer);
    }
}