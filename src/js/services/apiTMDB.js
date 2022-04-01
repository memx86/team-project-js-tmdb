/**
 * по умолчанию страница 1
 * есть геттер и сеттер для page
 * метод .incrementPage увеличивает страницу на 1
 * метод .resetPage устанавливет страницу в 1
 * запрос трендов - метод .getTrending()
 * поиск фильмов по query(строка) - метод .searchMovies()
 *  перед использовнием метода установить query на своем экземпляре класса
 * поиск фильма по id(число) - метод .getMovie()
 *  перед использовнием метода установить id на своем экземпляре класса
 */
export default class ApiTMDB {
  static #API_KEY = 'fadfbb72581e18342bb7490adda20bdd';
  static #BASE_URL = 'https://api.themoviedb.org/3';
  static ENDPOINTS = {
    TRENDING: '/trending/movie/day',
    NOW_PLAYING: '/movie/now_playing',
    TOP_RATED: '/movie/top_rated',
    UPCOMING: '/movie/upcoming',
    SEARCH_MOVIES: '/search/movie',
    GET_MOVIE: '/movie',
    GENRES: '/genre/movie/list',
  };
  static #COMMON_PARAMS = new URLSearchParams({
    api_key: ApiTMDB.#API_KEY,
    include_adult: false,
  });
  #page = 1;
  #endpoint = ApiTMDB.ENDPOINTS.TRENDING;
  #query;
  #id;

  getData = async (endpoint, params = '') => {
    const url = `${ApiTMDB.#BASE_URL}${endpoint}?${params}&${ApiTMDB.#COMMON_PARAMS}`;
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.statusText);
  };

  getCategory = () => {
    const params = new URLSearchParams({
      page: this.#page,
    });
    return this.getData(this.#endpoint, params);
  };

  searchMovies = () => {
    const params = new URLSearchParams({
      query: this.#query,
      page: this.#page,
    });
    return this.getData(ApiTMDB.ENDPOINTS.SEARCH_MOVIES, params);
  };

  getMovie = () => {
    const params = new URLSearchParams({
      append_to_response: 'videos',
    });
    const endpoint = `${ApiTMDB.ENDPOINTS.GET_MOVIE}/${this.#id}`;
    return this.getData(endpoint, params);
  };

  getGenres = () => {
    const endpoint = `${ApiTMDB.ENDPOINTS.GENRES}`;
    return this.getData(endpoint).then(res => res.genres);
  };

  getGenres = () => {
    const endpoint = `${ApiTMDB.ENDPOINTS.GENRES}`;
    return this.getData(endpoint).then(res => res.genres);
  };

  resetPage = () => {
    this.#page = 1;
  };
  incrementPage = () => {
    this.#page += 1;
  };
  get page() {
    return this.#page;
  }
  set page(newPage) {
    this.#page = newPage;
  }
  get query() {
    return this.#query;
  }
  set query(newQuery) {
    this.#query = newQuery;
  }
  get id() {
    return this.#id;
  }
  set id(newId) {
    this.#id = newId;
  }

  get endpoint() {
    return this.#endpoint;
  }
  set endpoint(newEndpoint) {
    this.#endpoint = newEndpoint;
  }
}
