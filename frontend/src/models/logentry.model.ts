import type { ProcessModel } from "./process.model";

export interface LogEntryModel{
    logEntryId: number,
    content: string,
    isImportant: boolean,
    importance: number,
    severity: LogLevel,
    createdAt: string,
    processId: number,
    process: ProcessModel
}

export enum LogLevel{
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL"
}