import { RequestHandler } from 'express'
import { Controller } from '../controllers/controller'

type Adapter = (controller: Controller) => RequestHandler

export const routeAdapter: Adapter = (controller) => async (req, res) => {
	try {
		const httpResponse = await controller.handle(req)
		res.status(httpResponse.statusCode).send(httpResponse)
	} catch (error: unknown) {
		res.status(500).json({ error })
	}
}
