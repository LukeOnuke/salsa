import { Router } from "express";
import { defineRequest } from "../utils";
import ollama from 'ollama';
import type { DigestRequest } from "../models/request/logentry/digest-request.model";
import type { DigestResponseBody } from "../models/response/logentry/digest-response.model";
import type { DigestedLogEntry } from "../models/digested-log-entry.model";
import { LogEntryService } from "../services/log-entry.service";
import { ProcessService } from "../services/process.service";
import fs from 'fs'

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