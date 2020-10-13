import { Router } from 'express';
import multer from 'multer';
import OrphanagesController from '../controllers/OrphanagesController';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

const orphanagesRouter = Router();

const orphanagesController = new OrphanagesController();

orphanagesRouter.get('/', orphanagesController.list);
orphanagesRouter.get('/:id', orphanagesController.show);
orphanagesRouter.post('/', upload.array('images'), orphanagesController.create);

export default orphanagesRouter;
