import { Router } from "express";
import { defineRequest } from "../utils";
import { LocationService } from "../services/location.service";
import type { Location } from "../entities/Location";

export const LocationRoute = Router();

LocationRoute.get('/list', async (req: any, res) => {
    await defineRequest(res, async () => {
        return await LocationService.getLocations();
    });
});

LocationRoute.get('/fetch', async (req: any, res) => {
    await defineRequest(res, async () => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        return LocationService.getLocationsPagenated(limit, page);
    });
});

LocationRoute.get('/fetch-singular/:id', async (req: any, res) => {
    await defineRequest(res, async () => {
        const { id } = req.params;
        return await LocationService.getLocationById(id);
    });
});

LocationRoute.delete('/delete/:id', async (req: any, res) => {
    await defineRequest(res, async () => {
        const { id } = req.params;
        return LocationService.deleteLocationById(id);
    });
});

LocationRoute.put('/update/', async (req: any, res) => {
    await defineRequest(res, async () => {
        const request: Location = req.body;
        await LocationService.updateLocation(request);
    });
});