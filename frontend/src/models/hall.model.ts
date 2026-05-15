import type { CinemaModel } from "./cinema.model"

export interface HallModel {
    hallId: number
    cinemaId: number
    cinema: CinemaModel
    name: string
    numOfSeats: number
    dolby: boolean
    has3d: boolean
    createdAt: string
    updatedAt: null | string
}