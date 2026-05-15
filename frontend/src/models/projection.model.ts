import type { HallModel } from "./hall.model"
import type { MovieModel } from "./movie.model"

export interface ProjectionModel {
    projectionId: number
    movieId: number
    movie: MovieModel
    hallId: number
    hall: HallModel
    time: string
    createdAt: string
    updatedAt: null | string
}