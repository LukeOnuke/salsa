import { Router } from "express";
import { defineRequest } from "../utils";
import ollama from 'ollama';
import type { DigestRequest } from "../models/request/logentry/digest-request.model";
import type { DigestResponseBody } from "../models/response/logentry/digest-response.model";
import type { DigestedLogEntry } from "../models/digested-log-entry.model";
import { LogEntryService } from "../services/log-entry.service";
import { ProcessService } from "../services/process.service";

export const LogEntryRoute = Router()

LogEntryRoute.post('/digest', async (req: any, res) => {
    await defineRequest(res, async () => {
        const request: DigestRequest = req.body;
        const apiKey: string = req.headers['x-api-key'];

        // Check if secrets and ids match up, if not throw a not found as it doesnt exist.
        if (!await ProcessService.authentificateProcess(request.processId, apiKey)) throw new Error("NOT_FOUND");

        const [importanceRating] = await Promise.all([
            ollama.generate({
                model: 'llama3.2:3b',
                prompt: "You are a expert in server administration at a high earning position. Your job is to decide if a log entry is important enough to save, decide if its a error and rate its importance. Your main mission is to cut out all the unimportant log entries by marking them as unimportant to make the job easier for other system administrators. You respond only in JSON which is structured like this: {\"important\":[boolean], \"severity:\"[INFO|WARN|ERROR|FATAL]\" \"importance\":[0-100]}. The long entry is:"
                    + request.content
            })
        ]);

        const response: DigestedLogEntry = JSON.parse(importanceRating.response);
        response.content = request.content;
        console.log(response)

        await LogEntryService.createLogEntry(
            response.content,
            response.severity,
            response.important,
            response.importance,
            request.time,
            request.processId
        )

        res.send(response);

    })
})


// BookmarkRoute.get('/', async (req: any, res) => {
//     await defineRequest(res, async () =>
//         await BookmarkService.getSimpleBookmarksByUserEmail(req.user.email)
//     )
// })

// BookmarkRoute.post('/movie/:id', async (req: any, res) => {
//     await defineRequest(res, async () => {
//         const id = Number(req.params.id)
//         await BookmarkService.createBookmark(req.user.email, id)
//     })
// })

// BookmarkRoute.delete('/:id', async (req: any, res) => {
//     await defineRequest(res, async () => {
//         const id = Number(req.params.id)
//         await BookmarkService.deleteBookmark(id)
//     })
// })