export interface Pagenated<T>{
    currentPage: number,
    totalPages: number,
    entries: T[]
}