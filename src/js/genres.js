import { api, genresStorage } from './services';
async function genres() {
  try {
    const genres = await api.getGenres();
    genresStorage.save(genres);
  } catch (error) {
    console.error(error);
  }
}
export default genres;
