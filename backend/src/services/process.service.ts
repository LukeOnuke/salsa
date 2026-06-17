import { IsNull, type DeepPartial } from "typeorm";
import { AppDataSource } from "../db";
import { Process } from "../entities/Process";
import { dataExists, getPagenated } from "../utils";
import type { Pagenated } from "../models/pagenated.model";

const processRepo = AppDataSource.getRepository(Process);

export class ProcessService {
    /**
     * Check if a process exists matching both the given ID and secret.
     */
    static async authentificateProcess(id: number, secret: string): Promise<boolean> {
        return await processRepo.existsBy({
            processId: id,
            secret: secret
        });
    }

    static async getProcesses(){
        return dataExists(
            await processRepo.find({
                take: 250
            })
        )
    }

    static async getProcessesPagenated(pageSize: number, pageNumber: number): Promise<Pagenated<Process>> {
        return getPagenated(
            processRepo,
            {
                server: true
            },
            {
                processId: "DESC"
            },
            pageSize,
            pageNumber
        )
    }

    static async getProcessById(id: number){
        return dataExists(
            processRepo.findOne({
                where: {
                    processId: id
                },
                relations: {
                    server: {
                        location: true
                    }
                }
            })
        )
    }

    static async updateProcessEntry(process: Process) {
        await this.getProcessById(process.processId);
        const partialProcess: DeepPartial<Process> = process;
        partialProcess.server = undefined
        await processRepo.save(
            partialProcess
        )
    }

    static async createProcess(process: Process){
        const partialProcess: DeepPartial<Process> = process;
        partialProcess.processId = undefined
        partialProcess.secret = undefined
        
        await processRepo.save(partialProcess);
    }

    static async deleteProcessById(id: number) {
        await processRepo.softDelete(id);
    }
}