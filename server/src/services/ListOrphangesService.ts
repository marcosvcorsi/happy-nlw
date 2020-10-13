import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default class ListOrphanagesService {
  async execute(): Promise<Orphanage[]> {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find();

    return orphanages;
  }
}
