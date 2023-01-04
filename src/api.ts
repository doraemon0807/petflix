import axios from "axios";

const API_KEY = "3aa30d95afc8ae6f47f61c77f67449d7";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date: Date;
  name: string;
  origin_country: string[];
  original_name: string;
  gender: number;
  known_for_department: string;
  profile_path: null;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  original_language: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  production_companies: ProductionCompany[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface IGetMovieResult {
  dates: {
    maximum: Date;
    minimum: Date;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies(category: string) {
  return axios
    .get(`${BASE_PATH}/movie/${category}?api_key=${API_KEY}`)
    .then((res) => res.data);
}
