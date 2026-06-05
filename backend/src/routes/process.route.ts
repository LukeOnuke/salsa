import { Router } from "express";
import { defineRequest } from "../utils";
import { ProcessService } from "../services/process.service";

export const ProcessRoute = Router()

ProcessRoute.get('/list', async (req: any, res) => {
    await defineRequest(res, async ()=>{
        return await ProcessService.getProcesses();
    })
})