import express, { Express } from 'express'
import { setupRoutes } from './config/setupRoutes'
import logger from 'morgan'
import { appCors } from './middlewares/cors'
export class Server {
	private app: Express
	private port: string | number = process.env.SERVER_PORT ?? 3000

	private setupMiddlewares() {
		if (process.env.TS_NODE_DEV) {
			console.log('TS_NODE_DEV=TRUE')
			this.app.use(logger('dev'))
			this.app.use(appCors)
		}
	}

	private setupRoutes() {
		setupRoutes(this.app)
	}

	private listen() {
		this.app.listen(this.port, () => {
			console.info(`Server listening on port ${this.port}`)
		})
	}

	public start() {
		this.setupMiddlewares()
		this.setupRoutes()
		this.listen()
	}

	constructor() {
		this.app = express().set('trust proxy', 1).disable('x-powered-by')
	}
}
