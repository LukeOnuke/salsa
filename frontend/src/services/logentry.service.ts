import type { LogEntry } from "@/models/logentry.model";
import { UserService } from "./user.service";
import type { Pagenated } from "@/models/pagenated.model";
import type { AxiosResponse } from "axios";

export class LogEntryService {
    static async getLogsPagenated(pageSize: number, page: number): Promise<AxiosResponse<Pagenated<LogEntry>>>{
        return await UserService.useAxios<Pagenated<LogEntry>>(`/logentry/fetch?page=${page}&limit=${pageSize}`)
    }

    static async getLogById(id: number){
        return await UserService.useAxios<LogEntry>(`/logentry/fetch-singular/${id}`)
    }
}