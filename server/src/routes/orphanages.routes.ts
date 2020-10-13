import { Router } from 'express';
import OrphanagesController from '../controllers/OrphanagesController';

const orphanagesRouter = Router();

const orphanagesController = new OrphanagesController();

orphanagesRouter.post('/', orphanagesController.create);

export default orphanagesRouter;
