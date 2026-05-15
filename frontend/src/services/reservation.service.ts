import type { ReservationModel } from "@/models/reservation.model"
import { UserService } from "./user.service"
import type { OptionsModel } from "@/models/options.model"

export class ReservationService {

    static async getReservations() {
        return await UserService.useAxios<ReservationModel[]>('/reservation')
    }

    static async getReservationById(id: number) {
        return await UserService.useAxios<ReservationModel>(`/reservation/${id}`)
    }

    static async getReservationOptionsByMovieShortUrl(link: string) {
        return await UserService.useAxios<OptionsModel>('/projection/movie/short/' + link)
    }

    static async createReservation(model: any) {
        return await UserService.useAxios('/reservation', 'post', model)
    }

    static async payReservation(id: number) {
        return await UserService.useAxios(`/reservation/${id}/pay`, 'put')
    }

    static async rateReservation(id: number, rating: number) {
        return await UserService.useAxios(`/reservation/${id}/rate`, 'put', { rating })
    }

    static async updateReservation(id: number, projectionId: number, numOfSeats: number) {
        return await UserService.useAxios(`/reservation/${id}`, 'put', {
            projectionId, numOfSeats
        })
    }

    static async deleteReservation(id: number) {
        return await UserService.useAxios(`/reservation/${id}`, 'delete')
    }
}