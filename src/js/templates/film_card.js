import { getGenresNames } from '../services';
import notFoundImg from '../../images/film_card/poster-img.jpg';
import notFoundImgRetina from '../../images/film_card/poster-img@2x.jpg';
const movieListRef = document.querySelector('.gallery');

const makeMoviesMarkup = movies =>
  movies
    .map(
      ({
        title,
        release_date,
        first_air_date,
        poster_path,
        id,
        genre_ids: genresIds,
        genres,
        vote_average,
      }) => {
        const genresNames = genresIds ? getGenresNames(genresIds) : genres.map(({ name }) => name);
        const year = new Date(release_date || first_air_date).getFullYear() || '';
        const poster2x = poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : notFoundImgRetina;
        const poster = poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : notFoundImg;
        let rating = 'N/A';
        if (vote_average) {
          rating = vote_average === 10 ? '10.0' : String(vote_average).padEnd(3, '.0');
        }
        return `
      <li class="card-item" data-id="${id}">
        <picture>
          <source
          srcset="
          ${poster} 1x,
          ${poster2x} 2x,
          " 
        />
        <img class="movie-img"
        src="${poster}"
        alt="${title}"
        width="280"
        height="398"
        />
        </picture>
        <div class = "movie-card">
        <h5 class="movie-title">${title}</h5>
        <div class="container_movie-info">
        <p class="movie-info">${genresNames.join(', ') || 'No genres found'} | ${year}</p>
        <p class="movie-rating">${rating}</p>
        </div>
        </div>
        </li>
        `;
      },
    )
    .join('');

const renderMarkup = movies => {
  const markup = makeMoviesMarkup(movies);
  movieListRef.insertAdjacentHTML('beforeend', markup);
};

export { renderMarkup };
