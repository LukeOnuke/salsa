import type { ActorModel } from "@/models/actor.model";
import type { DirectorModel } from "@/models/director.model";
import type { GenreModel } from "@/models/genre.model";
import type { MovieModel } from "@/models/movie.model";
import type { SearchModel } from "@/models/search.model";
import axios from "axios";

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'PSEP_2025'
    },
    validateStatus: (status: number) => {
        return status === 200
    }
})

export class MovieService {
    static async getMovies(search: SearchModel | null = null) {
        return await client.request<MovieModel[]>({
            url: '/movie',
            params: search
        })
    }

    static async getMovieByShortUrl(short: string) {
        return await client.get<MovieModel>(`/movie/short/${short}`)
    }

    static async getMovieById(id: number) {
        return await client.get<MovieModel>(`/movie/${id}`)
    }

    static async getActors() {
        return await client.get<ActorModel[]>('/actor')
    }

    static async getGenres() {
        return await client.get<GenreModel[]>('/genre')
    }

    static async getDirectors() {
        return await client.get<DirectorModel[]>('/director')
    }
}