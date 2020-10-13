import {Request, Response} from 'express';
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import Orphanage from "../models/Orphanage";
import orphanageView from '../views/orphanages_views'


export default {
   async index(req: Request, res: Response) {
      const orphanageRepository = getRepository(Orphanage);
      
      const orphanages = await orphanageRepository.find({
         relations:['images']
      });
      
      return res.json(orphanageView.renderMany(orphanages));
   },
   
   async show(req: Request, res: Response) {
      const {id} = req.params
      
      const orphanageRepository = getRepository(Orphanage);
      
      const orphanage = await orphanageRepository.findOneOrFail(id, {
         relations:['images']
      });
      
      return res.json(orphanageView.render(orphanage));
   },
   
   async create(req: Request, res: Response) {
      const {
         name,
         latitude,
         longitude,
         about,
         instructions,
         opening_hours,
         open_on_weekends
      } = req.body;
      
      const orphanageRepository = getRepository(Orphanage);
      
      const requestedImages = req.files as Express.Multer.File[];
      const images = requestedImages.map(image => {
         return {path: image.filename}
      })
      
      const data = {
         name,
         latitude,
         longitude,
         about,
         instructions,
         opening_hours,
         open_on_weekends
      }
      
      const schema = Yup.object().shape({
         name: Yup.string().required(),
         latitude: Yup.number().required(),
         longitude: Yup.number().required(),
         about: Yup.string().required().max(300),
         instructions: Yup.string().required(),
         opening_hours: Yup.string().required(),
         opening_weekends: Yup.boolean().required(),
         images: Yup.array(Yup.object().shape({path: Yup.string().required()}))
      })

      await schema.validate(data, {
         abortEarly: false,
      })

      const orphanage = orphanageRepository.create(data);
      
      await orphanageRepository.save(orphanage);
      
      return res.status(201).json(orphanageView.render(orphanage))
   }
}