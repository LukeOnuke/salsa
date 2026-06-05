import type { Process } from "@/models/process.model";
import { UserService } from "./user.service";

export class ProcessService{
    static async getProcesses(){
        return await UserService.useAxios<Process[]>(`/process/list`)
    }
}