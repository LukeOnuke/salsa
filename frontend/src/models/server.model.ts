import type { Location } from "./location.model";

export interface Server{
    serverId: number,
    name: string,
    locationId: number,
    location: Location,
}