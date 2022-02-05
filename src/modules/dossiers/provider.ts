import Dossier from 'App/database/entities/Dossier';
import { getRepository } from 'typeorm';

const DOSSIERS_PER_PAGE = 5;

export async function getDossiersListPageDataFor(exposing?: string, page?: number): Promise<{ maxPage: number, dossiers: Dossier[] }> {
  const userRepository = await getRepository(Dossier);
  let dossiers: Dossier[];
  let totalDossiersSize: number;
  page ??= 0;

  if (exposing) {
    dossiers = await userRepository.find();
    dossiers = dossiers.filter(dossier => dossier.exposed.indexOf(exposing) !== -1);
    totalDossiersSize = dossiers.length;
    dossiers = dossiers.slice(DOSSIERS_PER_PAGE * page, DOSSIERS_PER_PAGE * page + DOSSIERS_PER_PAGE);
  }
  else {
    dossiers = await userRepository.find({
      take: DOSSIERS_PER_PAGE, skip: DOSSIERS_PER_PAGE * page,
    });
    totalDossiersSize = await userRepository.count();
  }
  return {
    dossiers,
    maxPage: Math.ceil(totalDossiersSize / 5),
  };
}