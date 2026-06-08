import type { AxiosResponse } from "axios";
import { UserService } from "./user.service";
import type { Pagenated } from "@/models/pagenated.model";
import type { LocationModel } from '@/models/location.model';

export class LocationService {
    static async getLocations(): Promise<AxiosResponse<LocationModel[]>> {
        return await UserService.useAxios<LocationModel[]>(`/location/list`);
    }

    static async getLocationsPagenated(pageSize: number, page: number): Promise<AxiosResponse<Pagenated<LocationModel>>> {
        return await UserService.useAxios<Pagenated<LocationModel>>(`/location/fetch?page=${page}&limit=${pageSize}`);
    }

    static async getLocationById(id: number) {
        return await UserService.useAxios<LocationModel>(`/location/fetch-singular/${id}`);
    }

    static async deleteLocationById(id: number) {
        await UserService.useAxios<LocationModel>(`/location/delete/${id}`, "delete");
    }

    static async updateLocation(location: LocationModel) {
        await UserService.useAxios<LocationModel>(`/location/update/`, "put", location);
    }

    static async createLocation(location: LocationModel) {
        await UserService.useAxios<LocationModel>(`/location/create/`, "put", location);
    }
}