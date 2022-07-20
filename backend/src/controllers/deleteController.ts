import { Request } from 'express'
import { Controller } from './controller'
import { readdir, unlink } from 'fs/promises'

export class DeleteController implements Controller {
	async handle(request: Request): Promise<AppResponse> {
		const { id } = request.params
		const dir = await readdir('./uploads')
		for (let i = 0; i < dir.length; i++) {
			const e = dir[i]
			if (e.includes(id)) {
				unlink(`./uploads/${e}`)

				return {
					response: 'ok',
					statusCode: 200,
				}
			}
		}
		return {
			statusCode: 404,
			response: 'Resource not found',
		}
	}
}
