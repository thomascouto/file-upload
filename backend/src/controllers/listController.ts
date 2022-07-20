import { Request } from 'express'
import { Controller } from './controller'
import { readdir } from 'fs/promises'

export class ListController implements Controller {
	async handle(request: Request): Promise<AppResponse> {
		const files = await readdir('./uploads')
		if (files.length === 0)
			return {
				statusCode: 204,
				response: 'No content',
			}
		return {
			statusCode: 200,
			response: files,
		}
	}
}
