import { api, genresStorage } from './services';
async function genres() {
  try {
    const genres = await api.getGenres();
    const normalizedGenres = normalize(genres);
    genresStorage.save(normalizedGenres);
  } catch (error) {
    console.error(error);
  }
}
function normalize(arr) {
  const result = {};
  arr.forEach(({ id, name }) => {
    result[id] = name;
  });
  return result;
}
export default genres;
