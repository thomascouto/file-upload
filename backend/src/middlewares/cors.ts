import cors from 'cors'

export const appCors = cors({
	origin: ['http://localhost:3001'],
	credentials: true,
})
