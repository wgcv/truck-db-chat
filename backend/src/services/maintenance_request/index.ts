import { Hono } from "hono";
import { db } from "../../db/index.js";
import { maintenanceRequestsTable } from "../../db/schema.js";
const maintenanceRequestRoute = new Hono();



maintenanceRequestRoute.post('/', async (c) => {
    const { vehicleId, status, reason } = await c.req.json();
    const maintenanceRequest = await db.insert(maintenanceRequestsTable).values({ vehicleId, status, reason });
    return c.json({ status: "success", data: maintenanceRequest });
});

maintenanceRequestRoute.get('/', async (c) => {
    const maintenanceRequests = await db.select().from(maintenanceRequestsTable);
    return c.json({ status: "success", data: maintenanceRequests });
});


export default maintenanceRequestRoute;