import type { ProcessModel } from "@/models/process.model";
import { UserService } from "./user.service";
import type { Pagenated } from "@/models/pagenated.model";

export class ProcessService{
    static async getProcesses(){
        return await UserService.useAxios<ProcessModel[]>(`/process/list`)
    }

    static async getProcessesPagenated(pageSize: number, page: number): Promise<AxiosResponse<Pagenated<ProcessModel>>> {
        return await UserService.useAxios<Pagenated<ProcessModel>>(`/process/fetch?page=${page}&limit=${pageSize}`);
    }

    static async getProcessById(id: number) {
        return await UserService.useAxios<ProcessModel>(`/process/fetch-singular/${id}`);
    }

    static async updateProcess(process: ProcessModel) {
        await UserService.useAxios<ProcessModel>(`/process/update/`, "put", process);
    }

    static async deleteProcessById(id: number){
        await UserService.useAxios<ProcessModel>(`/process/delete/${id}`, "delete")
    }

    static async createProcess(process: ProcessModel) {
        await UserService.useAxios<ProcessModel>(`/process/create/`, "put", process);
    }
}