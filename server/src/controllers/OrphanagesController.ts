import { Request, Response } from 'express';
import CreateOrphanageService from '../services/CreateOrphanageService';

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
}
