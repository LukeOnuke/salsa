import type { CinemaModel } from "@/models/cinema.model";
import { UserService } from "./user.service";

export class CinemaService {
    static async getCinemas() {
        return await UserService.useAxios<CinemaModel[]>('/cinema')
    }

    static async getCinemaById(id: number) {
        return await UserService.useAxios<CinemaModel>(`/cinema/${id}`)
    }

    static async createCinema(model: any) {
        return await UserService.useAxios('/cinema', 'post', model)
    }

    static async updateCinema(id: number, model: CinemaModel) {
        return await UserService.useAxios(`/cinema/${id}`, 'put', model)
    }

    static async deleteCinemaById(id: number) {
        return await UserService.useAxios(`/cinema/${id}`, 'delete')
    }
}