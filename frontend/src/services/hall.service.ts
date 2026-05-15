import type { HallModel } from "@/models/hall.model"
import { UserService } from "./user.service"

export class HallService {

    static async getHalls() {
        return await UserService.useAxios<HallModel[]>('/hall')
    }

    static async getHallsByCinemaId(id: number) {
        return await UserService.useAxios<HallModel[]>(`/cinema/${id}/hall`)
    }

    static async getHallById(id: number) {
        return await UserService.useAxios<HallModel>(`/hall/${id}`)
    }

    static async getExpandedHallById(id: number) {
        return await UserService.useAxios<HallModel>(`/hall/${id}/expanded`)
    }

    static async createHall(model: any) {
        return await UserService.useAxios('/hall', 'post', model)
    }

    static async updateHall(id: number, model: any) {
        return await UserService.useAxios(`/hall/${id}`, 'put', model)
    }

    static async deleteHall(id: number) {
        return await UserService.useAxios(`/hall/${id}`, 'delete')
    }
}