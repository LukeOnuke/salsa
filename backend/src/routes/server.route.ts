import { Router } from "express";
import { defineRequest } from "../utils";
import { ServerService } from "../services/server.service";
import type { Server } from "../entities/Server";

export const ServerRoute = Router();

ServerRoute.get('/list', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await ServerService.getServers();
    });
});

ServerRoute.get('/fetch', async (req: any, res) => {
    await defineRequest(res, async () => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        return ServerService.getServersPagenated(limit, page);
    });
});

ServerRoute.get('/fetch-singular/:id', async (req: any, res) => {
    await defineRequest(res, async () => {
        const { id } = req.params;
        return await ServerService.getServerById(id);
    });
});

ServerRoute.delete('/delete/:id', async (req: any, res) => {
    await defineRequest(res, async () => {
        const { id } = req.params;
        return ServerService.deleteServerById(id);
    });
});

ServerRoute.put('/update/', async (req: any, res) => {
    await defineRequest(res, async () => {
        const request: Server = req.body;
        await ServerService.updateServer(request);
    });
});

ServerRoute.put('/create/', async (req: any, res) => {
    await defineRequest(res, async () => {
        const request: Server = req.body;
        await ServerService.createServer(request);
    });
});