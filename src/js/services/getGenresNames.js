import { genresStorage } from '../services';

function getGenresNames(genresIds) {
  const genres = genresStorage.get();
  const genresNames = genresIds.map(id => genres[id]);
  return genresNames;
}
export { getGenresNames };
