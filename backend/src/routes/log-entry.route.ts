import { Router } from "express";
import { defineRequest } from "../utils";
import type { DigestRequest } from "../models/request/logentry/digest-request.model";
import { LogEntryService } from "../services/log-entry.service";
import { ProcessService } from "../services/process.service";
import type { LogEntry } from "../entities/LogEntry";

export const LogEntryRoute = Router()

LogEntryRoute.post('/digest', async (req: any, res) => {
    await defineRequest(res, async () => {
        const request: DigestRequest = req.body;
        const apiKey: string = req.headers['x-api-key'];

        // Check if secrets and ids match up, if not throw a not found as it doesnt exist.
        if (!await ProcessService.authentificateProcess(request.processId, apiKey)) throw new Error("NOT_FOUND");

        LogEntryService.processLogEntry(request)

        return;
    })
})

LogEntryRoute.get('/fetch', async (req: any, res) => {
    await defineRequest(res, async ()=>{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        return LogEntryService.getLogsPagenated(limit, page);
    }) 
})

LogEntryRoute.get('/fetch-singular/:id', async (req: any, res) => {
    await defineRequest(res, async ()=>{
        const { id } = req.params;
        return await LogEntryService.getLogById(id);
    })
})

LogEntryRoute.delete('/delete/:id', async (req: any, res) => {
    await defineRequest(res, async ()=>{
        const { id } = req.params;
        console.log(id)
        return LogEntryService.deleteLogById(id);
    })
})

LogEntryRoute.put('/update/', async (req: any, res) => {
    await defineRequest(res, async ()=>{
        const request: LogEntry = req.body;
        await LogEntryService.updateLogEntry(request);
    })
})