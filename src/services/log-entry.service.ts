import { AppDataSource } from "../db";
import { LogEntry } from "../entities/LogEntry";
import { Process } from "../entities/Process";
import type { DigestedLogEntry } from "../models/digested-log-entry.model";
import type { LogLevel } from "../models/log-level.model";
import type { DigestRequest } from "../models/request/logentry/digest-request.model";
import ollama from 'ollama';

const logEntryRepo = AppDataSource.getRepository(LogEntry);
const processRepo = AppDataSource.getRepository(Process);

export class LogEntryService {
    /**
     * Creates or inserts a LogEntry entry. Doesnt check If a processId exists.
     */
    static async createLogEntry(
        content: string,
        severity: LogLevel,
        isImportant: boolean,
        importance: number,
        createdAt: Date,
        processId: number
    ) {

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

    static async processLogEntry(request: DigestRequest) {
        // const [importanceRating] = await Promise.all([
        //     ollama.generate({
        //         model: 'qwen3:0.6b', //llama3.2:3b
        //         think: false,
        //         format: "json",
        //         prompt: "You are a expert in server administration at a high earning position. Your job is to decide if a log entry is important enough to save, decide if its a error and rate its importance. Your main mission is to cut out all the unimportant log entries by marking them as unimportant to make the job easier for other system administrators. You respond only in JSON which is structured like this: {\"important\":[boolean], \"severity:\"[INFO|WARN|ERROR|FATAL]\" \"importance\":[0-100]}. Dont use markdown formatting, without the ```json ``` tags. The logentry is:"
        //          + request.content
        //     })
        // ]);

        const importanceRating = await ollama.chat({
            model: 'qwen3:0.6b', // ili llama3.2
            messages: [
                {
                    role: 'system',
                    content: "You are a expert in server administration at a high earning position. Your job is to decide if a log entry is important enough to save, decide if its a error and rate its importance. Your main mission is to cut out all the unimportant log entries by marking them as unimportant to make the job easier for other system administrators. You respond only in JSON which is structured like this: {\"important\":[boolean], \"severity:\"[INFO|WARN|ERROR|FATAL]\" \"importance\":[0-100]}. The logentry is:"
                },
                {
                    role: 'user',
                    content: request.content
                }
            ],
            format: 'json',
            think: false
        })

        console.log("debug stream from process log entry: ", importanceRating.message.content);

        const response: DigestedLogEntry = JSON.parse(importanceRating.message.content);
        response.content = request.content;

        if (response.important) await LogEntryService.createLogEntry(
            response.content,
            response.severity,
            response.important,
            response.importance,
            request.time,
            request.processId
        )
    }
}