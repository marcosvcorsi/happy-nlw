import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default class ShowOrphanageService {
  async execute(id: number): Promise<Orphanage> {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail({
      where: {
        id,
      },
    });

    return orphanage;
  }
}
