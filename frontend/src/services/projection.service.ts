import type { ProjectionModel } from "@/models/projection.model"
import { UserService } from "./user.service"

export class ProjectionService {
    static async getProjectionsByHallId(id: number) {
        return await UserService.useAxios<ProjectionModel[]>(`/hall/${id}/projection`)
    }

    static async getProjectionsByMovieId(id: number) {
        return await UserService.useAxios<ProjectionModel[]>(`/projection/movie/id/${id}`)
    }

    static async getProjectionById(id: number) {
        return await UserService.useAxios<ProjectionModel>(`/projection/${id}`)
    }

    static async createProjection(model: any) {
        return await UserService.useAxios('/projection', 'post', model)
    }

    static async updateProjection(id: number, model: any) {
        return await UserService.useAxios(`/projection/${id}`, 'put', model)
    }

    static async deleteProjection(id: number) {
        return await UserService.useAxios(`/projection/${id}`, 'delete')
    }
}