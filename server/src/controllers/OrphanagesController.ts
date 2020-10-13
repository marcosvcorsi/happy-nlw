import { Request, Response } from 'express';
import CreateOrphanageService from '../services/CreateOrphanageService';
import ListOrphanagesService from '../services/ListOrphangesService';
import ShowOrphanageService from '../services/ShowOrphanageService';

export default class OrphanagesController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const createOrphanageService = new CreateOrphanageService();
    const orphanage = await createOrphanageService.execute({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    });

    return response.status(201).json(orphanage);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listOrphanagesService = new ListOrphanagesService();

    const orphanages = await listOrphanagesService.execute();

    return response.json(orphanages);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrphanageService = new ShowOrphanageService();
    const orphanage = await showOrphanageService.execute(Number(id));

    return response.json(orphanage);
  }
}
