import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import Orphanage from './models/Orphanage';


const routes = Router();

const upload = multer(uploadConfig)

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages',upload.array('images'), OrphanagesController.create);


export default routes;