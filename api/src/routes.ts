import { Router } from 'express';
import { getRepository } from 'typeorm';
import OrphanagesController from './controllers/OrphanagesController';
import Orphanage from './models/Orphanage';

const routes = Router();

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', OrphanagesController.create);


export default routes