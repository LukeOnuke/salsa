import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Process } from "../entities/Process";
import { dataExists } from "../utils";

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
}