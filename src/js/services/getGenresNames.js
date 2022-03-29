import { genresStorage } from '../services';

function getGenresNames(genresIds) {
  const genres = genresStorage.get();
  const genresNames = genresIds.map(id => {
    const { name } = genres.find(item => item.id === id);
    return name;
  });
  return genresNames;
}
export { getGenresNames };
