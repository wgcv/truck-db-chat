import { Hono } from "hono";
import { db } from "../../db/index.js";
import { maintenanceCommentsTable } from "../../db/schema.js";
const maintenanceCommentsTableRoute = new Hono();



maintenanceCommentsTableRoute.post('/', async (c) => {
    const { vehicleId, comment } = await c.req.json();
    const maintenanceComment = await db.insert(maintenanceCommentsTable).values({ vehicleId, comment });
    return c.json({ status: "success", data: maintenanceComment });
});

maintenanceCommentsTableRoute.get('/', async (c) => {
    const maintenanceComments = await db.select().from(maintenanceCommentsTable);
    return c.json({ status: "success", data: maintenanceComments });
});

export default maintenanceCommentsTableRoute;