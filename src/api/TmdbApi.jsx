import AxiosClient from "./AxiosClient";

export const category = {
    movie: 'movie',
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

const TmdbApi = {
  getMoviesList: (type, params) => {
    const url = 'movie/' + movieType[type];
    return AxiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + '/' + id + '/videos';
    return AxiosClient.get(url, {params: {}});
  },
  search: (cate, params) => {
    const url = 'search/' + category[cate];
    return AxiosClient.get(url, params);
  },
}

export default TmdbApi;