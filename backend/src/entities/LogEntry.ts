import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    type Relation,
} from "typeorm";
import { Process } from "./Process";
import { LogLevel } from "../models/log-level.model";


@Index("log_entry_process_process_id_idx", ["processId"])
@Entity("log_entry")
export class LogEntry {
    @PrimaryGeneratedColumn({ type: "int", name: "log_entry_id", unsigned: true })
    logEntryId: number;

    @Column("text", { name: "content" })
    content: string;

    @Column("tinyint", {
        name: "is_important",
        transformer: {
            to: (value: boolean) => (value ? 1 : 0), // App to DB
            from: (value: number) => value === 1,    // DB to App
        }
    })
    isImportant: boolean;

    @Column("tinyint", { name: "importance", unsigned: true })
    importance: number;

    @Column({
        type: "enum",
        enum: LogLevel,
        default: LogLevel.INFO,
        name: "severity"
    })
    severity: LogLevel;

    @Column("datetime", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @Column("int", { name: "process_id", unsigned: true })
    processId: number;

    @ManyToOne(() => Process, (process) => process.logEntries, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "process_id", referencedColumnName: "processId" }])
    process: Relation<Process>;
}