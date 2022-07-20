import { Request } from 'express'
import { Controller } from './controller'

export class UploadController implements Controller {
	handle(request: Request): AppResponse {
		return {
			statusCode: 200,
			response: `File '${request.file?.originalname}' sent.`,
		}
	}
}
