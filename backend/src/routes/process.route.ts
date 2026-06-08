import { Router } from "express";
import { defineRequest } from "../utils";
import { ProcessService } from "../services/process.service";
import type { Process } from "../entities/Process";

export const ProcessRoute = Router()

ProcessRoute.get('/list', async (req: any, res) => {
    await defineRequest(res, async ()=>{
        return await ProcessService.getProcesses();
    })
})

ProcessRoute.get('/fetch', async (req: any, res) => {
    await defineRequest(res, async ()=>{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        return ProcessService.getProcessesPagenated(limit, page);
    }) 
})

ProcessRoute.get('/fetch-singular/:id', async (req: any, res) => {
    await defineRequest(res, async ()=>{
        const { id } = req.params;
        return await ProcessService.getProcessById(id);
    })
})

ProcessRoute.put('/update/', async (req: any, res) => {
    await defineRequest(res, async ()=>{
        const request: Process = req.body;
        await ProcessService.updateProcessEntry(request);
    })
})

ProcessRoute.put('/create/', async (req: any, res) => {
    await defineRequest(res, async ()=>{
        const request: Process = req.body;
        await ProcessService.createProcess(request);
    })
})