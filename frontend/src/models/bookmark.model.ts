import type { MovieModel } from "./movie.model"

export interface BookmarkModel {
    bookmarkId: number
    movieId: number
    movie: MovieModel
    createdAt: string
    updatedAt: string
}