import type { LogLevel } from "./log-level.model";

export interface DigestedLogEntry{
    important: boolean,
    severity: LogLevel,
    importance: number,
    content: string
}