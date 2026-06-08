import type { LogEntryModel } from "@/models/logentry.model";
import { UserService } from "./user.service";
import type { Pagenated } from "@/models/pagenated.model";
import type { AxiosResponse } from "axios";

export class LogEntryService {
    static async getLogsPagenated(pageSize: number, page: number): Promise<AxiosResponse<Pagenated<LogEntryModel>>>{
        return await UserService.useAxios<Pagenated<LogEntryModel>>(`/logentry/fetch?page=${page}&limit=${pageSize}`)
    }

    static async getLogById(id: number){
        return await UserService.useAxios<LogEntryModel>(`/logentry/fetch-singular/${id}`)
    }

    static async deleteLogById(id: number){
        await UserService.useAxios<LogEntryModel>(`/logentry/delete/${id}`, "delete")
    }

    static async updateLogEntry(logEntry: LogEntryModel){
        await UserService.useAxios<LogEntryModel>(`/logentry/update/`, "put", logEntry)
    }
}