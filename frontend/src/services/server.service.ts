import type { Pagenated } from "@/models/pagenated.model";
import type { ServerModel } from "@/models/server.model";
import type { AxiosResponse } from "axios";
import { UserService } from "./user.service";

export class ServerService {
    static async getServers(): Promise<AxiosResponse<ServerModel[]>> {
        return await UserService.useAxios<ServerModel[]>(`/server/list`);
    }

    static async getServersPagenated(pageSize: number, page: number): Promise<AxiosResponse<Pagenated<ServerModel>>> {
        return await UserService.useAxios<Pagenated<ServerModel>>(`/server/fetch?page=${page}&limit=${pageSize}`);
    }

    static async getServerById(id: number) {
        return await UserService.useAxios<ServerModel>(`/server/fetch-singular/${id}`);
    }

    static async deleteServerById(id: number) {
        await UserService.useAxios<ServerModel>(`/server/delete/${id}`, "delete");
    }

    static async updateServer(server: ServerModel) {
        await UserService.useAxios<ServerModel>(`/server/update/`, "put", server);
    }

    static async createServer(server: ServerModel) {
        await UserService.useAxios<ServerModel>(`/server/create/`, "put", server);
    }
}