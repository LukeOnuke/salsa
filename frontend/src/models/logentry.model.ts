export interface LogEntry{
    logEntryId: number,
    content: string,
    isImportant: boolean,
    importance: number,
    severity: LogLevel,
    createdAt: string,
    processId: number
}

export enum LogLevel{
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL"
}