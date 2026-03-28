import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Server } from "./Server";

@Entity("location")
export class Location {
    @PrimaryGeneratedColumn({ type: "int", name: "location_id", unsigned: true })
    locationId: number;

    @Column("varchar", { name: "shorthand", length: 20 })
    shorthand: string;

    @Column("text", { name: "adress", nullable: true })
    address: string | null;

    @Column("varchar", { name: "city", length: 50, nullable: true })
    city: string | null;

    @Column("varchar", { name: "country", length: 128, nullable: true })
    country: string | null;

    @OneToMany(() => Server, (server) => server.location)
    servers: Server[];
}