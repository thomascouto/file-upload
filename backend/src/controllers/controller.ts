import { Request } from 'express'

export interface Controller {
	handle: (request: Request) => AppResponse | Promise<AppResponse>
}
