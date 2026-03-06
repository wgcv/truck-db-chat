import { Hono } from 'hono'
import { cors } from 'hono/cors'
import maintenanceRequestRoute from './services/maintenance_request/index.js'
import maintenanceCommentsTableRoute from './services/maintenanceCommentsTable/index.js'
import roadSupportServicesTableRoute from './services/roadSupportServicesTable/index.js'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin || origin.includes('127.0.0.1') || origin.includes('localhost')) {
        return origin || '*'
      }
      return null
    },
  })
)

app.get('/', (c) => {
  return c.text('Hello Regulis!')
})

app.route('/maintenance-request', maintenanceRequestRoute)
app.route('/maintenance-comment', maintenanceCommentsTableRoute)
app.route('/road-support-service', roadSupportServicesTableRoute)

export default app
