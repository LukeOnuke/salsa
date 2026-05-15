import type { BookmarkModel } from "@/models/bookmark.model"
import { UserService } from "./user.service"

export class BookmarkService {
    static async getBookmarks() {
        return await UserService.useAxios<BookmarkModel[]>(`/bookmark`)
    }

    static async createBookmark(id: number) {
        return await UserService.useAxios(`/bookmark/movie/${id}`, 'post')
    }

    static async deleteBookmark(id: number) {
        return await UserService.useAxios(`/bookmark/${id}`, 'delete')
    }
}