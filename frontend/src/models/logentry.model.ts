import type { Process } from "./process.model";

export interface LogEntry{
    logEntryId: number,
    content: string,
    isImportant: boolean,
    importance: number,
    severity: LogLevel,
    createdAt: string,
    processId: number,
    process: Process
}

export enum LogLevel{
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL"
}