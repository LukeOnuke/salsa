import type { Response } from "express";
import type { Pagenated } from "./models/pagenated.model";
import type { FindOptionsOrder, FindOptionsRelations, ObjectLiteral, Repository } from "typeorm";

export async function defineRequest(res: Response, callback: Function) {
    try {
        const data = await callback()
        if (data == null) {
            res.status(204).send()
            return
        }

        res.json(data)
    } catch (e: any) {
        const code = e.message == 'NOT_FOUND' ? 404 : 500
        res.status(code).json({
            message: e.message ?? 'SERVER_ERROR',
            timestamp: new Date()
        })
    }
}

export function dataExists(data: any) {
    if (data == null)
        throw new Error('NOT_FOUND')
    return data
}

/**
 * # Utills.ts
 * Utility function to fetch pagenated data out of typeorm repositories. 
 * Insures a bit more DRY code.
 * @param repo Repository to fetch data out of.
 * @param relations Relations to furfill.
 * @param order Order *(sort)* to furfill.
 * @param pageSize Size of a single page.
 * @param pageNumber Number of the page to get.
 * @returns Pagenated wrapper including the data fetched from the repository.
 */
export async function getPagenated<T extends ObjectLiteral>(repo: Repository<T>, relations: FindOptionsRelations<T>, order: FindOptionsOrder<T>, pageSize: number, pageNumber: number): Promise<Pagenated<T>>{
    const [data, totalItems] = await repo.findAndCount({
        skip: (pageNumber - 1) * pageSize,  // reduce 1 from page no.
                                            // so that page count
                                            // starts from one
        take: pageSize,
        relations: relations,
        order: order
    })

    return {
        currentPage: pageNumber,
        totalPages: totalItems / pageSize,
        entries: data
    } as Pagenated<T>
}