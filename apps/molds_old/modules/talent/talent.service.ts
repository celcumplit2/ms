import {Collection} from '@/core/dto/collection';
import {database} from '@/database';
import {Talent, TalentRepository} from '@/modules/talent/talent.repository';

let specialistRepository: TalentRepository | undefined;

function getSpecialistRepository(): TalentRepository {
  if (!specialistRepository) {
    specialistRepository = new TalentRepository(database);
  }

  return specialistRepository;
}

export async function browseSpecialists({offset, limit, search, relations = []}: {
  offset: number,
  limit: number,
  relations?: string[],
  search?: string
}): Promise<Collection<Talent>> {
  const repository = getSpecialistRepository();
  const total = await repository.count();
  const items = await repository.search({offset, limit, search, relations});

  return new Collection({items, total});
}

export async function readSpecialistByAlias({alias}: { alias: string }): Promise<Talent | undefined> {
  return await getSpecialistRepository().oneByAlias({alias});
}
