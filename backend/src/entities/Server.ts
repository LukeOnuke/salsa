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
import { Location } from "./Location";
import { Process } from "./Process";

@Index("fk_server_location_location_id_idx", ["locationId"])
@Entity("server")
export class Server {
    @PrimaryGeneratedColumn({ type: "int", name: "server_id", unsigned: true })
    serverId: number;

    @Column("varchar", { name: "name", length: 128 })
    name: string;

    @Column("int", { name: "location_id", unsigned: true })
    locationId: number;

    @ManyToOne(() => Location, (location) => location.servers, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "location_id", referencedColumnName: "locationId" }])
    location: Relation<Location>;

    @OneToMany(() => Process, (process) => process.server)
    processes: Process[];
}