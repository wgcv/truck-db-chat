import { Hono } from "hono";
import { db } from "../../db/index.js";
import { roadSupportServicesTable } from "../../db/schema.js";
const roadSupportServicesTableRoute = new Hono();



roadSupportServicesTableRoute.post('/', async (c) => {
    const { vehicleId, reason, location } = await c.req.json();
    const roadSupportService = await db.insert(roadSupportServicesTable).values({ vehicleId, reason, location });
    return c.json({ status: "success", data: roadSupportService });
});


roadSupportServicesTableRoute.get('/', async (c) => {
    const roadSupportServices = await db.select().from(roadSupportServicesTable);
    return c.json({ status: "success", data: roadSupportServices });
});

export default roadSupportServicesTableRoute;