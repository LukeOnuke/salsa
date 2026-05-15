import type { BookmarkModel } from "./bookmark.model"
import type { GenreModel } from "./genre.model"
import type { MovieModel } from "./movie.model"

export interface UserModel {
    userId: number
    firstName: string
    lastName: string
    email: string
    phone: string
    genreId: number
    genre: GenreModel,
    recommended: MovieModel[]
    bookmarks: BookmarkModel[]
}