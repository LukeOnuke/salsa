import type { LocationModel } from "./location.model";

export interface ServerModel{
    serverId: number,
    name: string,
    locationId: number,
    location: LocationModel,
}