import { Router } from 'express'
import { routeAdapter } from '../adapter/routeAdapter'
import { ListController } from '../controllers/listController'
import { UploadController } from '../controllers/uploadController'
import multer from 'multer'
import { DeleteController } from '../controllers/deleteController'

const storage = multer.diskStorage({
	destination: './uploads',
	filename: (req, file, cb) => {
		cb(null, Date.now().toString().concat('_').concat(file.originalname))
	},
})

const upload = multer({ storage })

export default (router: Router): void => {
	router.get('/list', routeAdapter(new ListController()))
	router.post(
		'/upload',
		upload.single('file'),
		routeAdapter(new UploadController())
	)
	router.delete('/delete/:id', routeAdapter(new DeleteController()))
}
