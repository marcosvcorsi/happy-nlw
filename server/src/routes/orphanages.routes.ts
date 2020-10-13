import { Router } from 'express';
import OrphanagesController from '../controllers/OrphanagesController';

const orphanagesRouter = Router();

const orphanagesController = new OrphanagesController();

orphanagesRouter.get('/', orphanagesController.list);
orphanagesRouter.get('/:id', orphanagesController.show);
orphanagesRouter.post('/', orphanagesController.create);

export default orphanagesRouter;
