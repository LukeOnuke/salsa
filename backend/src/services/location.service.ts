import { AppDataSource } from "../db";
import { Location } from "../entities/Location";
import { dataExists, getPagenated } from "../utils";
import type { Pagenated } from "../models/pagenated.model";
import type { Repository } from "typeorm";

const locationRepo: Repository<Location> = AppDataSource.getRepository(Location);

export class LocationService {
    static async getLocations() {
        return await locationRepo.find();
    }

    static async getLocationsPagenated(pageSize: number, pageNumber: number): Promise<Pagenated<Location>> {
        return getPagenated(
            locationRepo,
            {
                
            },
            {
                locationId: "DESC"
            },
            pageSize,
            pageNumber
        );
    }

    static async getLocationById(id: number) {
        return dataExists(
            await locationRepo.findOne({
                where: { locationId: id },
                withDeleted: true
            })
        );
    }

    static async deleteLocationById(id: number) {
        await locationRepo.softDelete(id);
    }

    static async updateLocation(location: Location) {
        // Verify it exists before updating
        const baseLocation: Location = await this.getLocationById(location.locationId);

        await locationRepo.save(location);
    }
}