import { Request } from 'express'
import { Controller } from './controller'

export class UploadController implements Controller {
	handle(request: Request): AppResponse {
		return {
			statusCode: 201,
			response: `${request.files?.length} file(s) sent.`,
		}
	}
}
