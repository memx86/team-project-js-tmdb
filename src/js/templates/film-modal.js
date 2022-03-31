// Функция создающая разметку для одного фильма
import notFoundImg from '../../images/film_card/poster-img.jpg';
import notFoundImgBig from '../../images/film_card/poster-big.jpg';
import notFoundImgRetina from '../../images/film_card/poster-big@2x.jpg';
import notFoundImgBigRetina from '../../images/film_card/poster-img@2x.jpg';

export default function makeOneMovieMarkup(dataMovie) {
  const {
    title,
    poster_path,
    genres,
    vote_average,
    vote_count,
    original_title,
    overview,
    popularity,
    watched,
    queued,
    videos,
  } = dataMovie;
  const genresNames = genres.map(genre => genre.name).join(', ');
  const poster = poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : notFoundImg;
  const poster2x = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : notFoundImgRetina;
  const posterBig = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : notFoundImgBig;
  const posterBig2x = poster_path
    ? `https://image.tmdb.org/t/p/w780${poster_path}`
    : notFoundImgBigRetina;
  let trailer = videos.results.find(
    video => video['iso_639_1'] === 'en' && video.type === 'Trailer',
  );
  trailer = trailer ? trailer : videos.results[0];
  const trailerKey = trailer?.key;
  return `<div class="modal__content">
        <div class="poster__wrapper">
            <picture>
                <source
                  srcset="
                    ${poster} 1x,
                    ${poster2x} 2x
                  "
                  media="(max-width:1023px)"
                />
                <source
                  srcset="
                    ${posterBig} 1x,
                    ${posterBig2x} 2x
                  "
                  media="(min-width:1024px)"
                />
                <img class="poster__img" alt="${title}" src="${poster}" loading="lazy" />
              </picture>
        </div>
        <div class="movie">
            <h2 class="movie__title uppercase">${title}</h2>

            <table class="movie__statistic">
        <tr class="movie__table--row">
          <td class="movie__table--head">Vote &#47 Votes</td>
          <td class="movie__table--data"><span class="movie__average">${vote_average}</span>&nbsp &#47 &nbsp<span class="movie__count">${vote_count}</td>
        </tr>
        <tr class="movie__table--row">
          <td class="movie__table--head">Popularity</th>
          <td class="movie__table--data">${popularity}</td>
        </tr>
        <tr class="movie__table--row">
          <td class="movie__table--head">Original Title</th>
          <td class="movie__table--data">${original_title}</td>
        </tr>
        <tr class="movie__table--row">
          <td class="movie__table--head">Genre</th>
          <td class="movie__table--data">${genresNames}</td>
        </tr>
      </table>

            <div class="movie__description">
                <h3 class="movie__about uppercase">About</h3>
                <p class="movie__text">${overview}</p>
            </div>
            <div class="movie__btn buttons__container">
                    <button type="button" class="btn--modal btn--on" data-btn="watched">${
                      watched ? 'Remove from' : 'Add to'
                    } watched</button>
                    <button type="button" class="btn--modal btn--on" data-btn="queue">${
                      queued ? 'Remove from' : 'Add to'
                    } queue</button>
                    ${
                      trailerKey
                        ? `<button type="button" class="btn--modal btn--on" data-btn="trailer">Show trailer</button>`
                        : ''
                    }
            </div>
        </div>
    </div>
    ${
      trailerKey
        ? `<div class="trailer is-hidden">
      <iframe
      class="trailer__iframe"
      width="240"
      height="135"
      src="https://www.youtube.com/embed/${trailerKey}"
      title="${trailer.type}"
      frameborder="0"
      allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope; picture-in-picture"
      allowfullscreen>
      </iframe>
    </div>`
        : '<div></div>'
    }
    `;
}


// {/* <div class="movie__statistic">
//                 <ul class="movie__list--left">
//                     <li class="movie__item--left">Vote &#47 Votes
//                     </li>
//                     <li class="movie__item--left">Popularity
//                     </li>
//                     <li class="movie__item--left">Original Title
//                     </li>
//                     <li class="movie__item--left">Genre
//                     </li>
//                 </ul>
//                 <ul class="movie__list--right">
//                     <li class="movie__item--right">
//                         <span class="movie__average">${vote_average}</span>
//                         <span>&#47</span>
//                         <span class="movie__count">${vote_count}</span>
//                     </li>
//                     <li class="movie__item--right">${popularity}
//                     </li>
//                     <li class="movie__item--right uppercase">${original_title}
//                     </li>
//                     <li class="movie__item--right">${genresNames}
//                     </li>
//                 </ul>
//             </div> */}
