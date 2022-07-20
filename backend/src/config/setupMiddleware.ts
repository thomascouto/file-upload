import { Express } from 'express'
import { appCors } from '../middlewares/cors'
import logger from 'morgan'
export const setupMiddleware = (app: Express) => {
	if (process.env.TS_NODE_DEV) {
		console.log('TS_NODE_DEV=TRUE')
		app.use(logger('dev'))
		app.use(appCors)
	}
}
