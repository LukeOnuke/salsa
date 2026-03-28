import { AppDataSource } from "../db";
import { LogEntry } from "../entities/LogEntry";
import { Process } from "../entities/Process";
import type { LogLevel } from "../models/log-level.model";

const logEntryRepo = AppDataSource.getRepository(LogEntry);
const processRepo = AppDataSource.getRepository(Process);

export class LogEntryService {
    /**
     * Creates or inserts a LogEntry entry.
     */
    static async createLogEntry(
        content: string, 
        severity: LogLevel,
        isImportant: boolean, 
        importance: number,
        createdAt: Date,
        processId: number
    ) {

        // Check if process actualy exists, good practise for some reason
        const processValid = await processRepo.existsBy({
            processId: processId
        });

        if (!processValid) {
            throw new Error("PROCESS_NOT_FOUND");
        }

        await logEntryRepo.save({
            content: content,
            isImportant: isImportant,
            importance: importance,
            processId: processId,
            severity: severity,
            createdAt: createdAt
        });
    }

    /**
     * Got this as extra just for shi and giggles rn.
     */
    static async getLogsByProcessId(processId: number) {
        return await logEntryRepo.find({
            select: {
                logEntryId: true,
                content: true,
                isImportant: true,
                importance: true,
            },
            where: {
                processId: processId
            },
            order: {
                logEntryId: "DESC"
            }
        });
    }
}