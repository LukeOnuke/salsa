import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    type Relation,
} from "typeorm";
import { Server } from "./Server";
import { LogEntry } from "./LogEntry";

@Index("fk_process_server_server_id_idx", ["serverId"])
@Entity("process")
export class Process {
    @PrimaryGeneratedColumn({ type: "int", name: "process_id", unsigned: true })
    processId: number;

    @Column("varchar", { name: "name", length: 128, nullable: true })
    name: string | null;

    @Column("int", { name: "server_id", unsigned: true })
    serverId: number;

    @Column({
        type: 'varchar',
        length: 512,
        default: () => "(HEX(RANDOM_BYTES(256)))"
    })
    secret: string;

    @ManyToOne(() => Server, (server) => server.processes, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "server_id", referencedColumnName: "serverId" }])
    server: Relation<Server>;

    @OneToMany(() => LogEntry, (logEntry) => logEntry.process)
    logEntries: LogEntry[];
}