import type { MovieModel } from "./movie.model"
import type { ProjectionModel } from "./projection.model"

export interface OptionsModel {
    movie: MovieModel
    projections: ProjectionModel[]
}