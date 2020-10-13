import { getRepository } from 'typeorm';
import { CreateOrphanageDTO } from '../dtos/CreateOphanageDTO';
import Orphanage from '../models/Orphanage';

export default class CreateOrphanageService {
  async execute(data: CreateOrphanageDTO): Promise<Orphanage> {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return orphanage;
  }
}
