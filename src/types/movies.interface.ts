export interface IMoviesApp {
    page: number;
    results: IResult[];
    total_pages: number;
    total_results: number;
}

export interface IResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IGenre {
    id: number,
    name: string
}

/* Movie Details Interfaces */

export interface IMovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: IBelongsToCollection;
    budget: number;
    genres: IGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: IProductionCompany[];
    production_countries: IProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: ISpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IBelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export interface IProductionCompany {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
}

export interface IProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface ISpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

/* Movie Credits Interfaces */
export interface IMovieCredits {
    id: number;
    cast: Cast[];
    crew: Cast[];
}

export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: Department;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: null | string;
    cast_id?: number;
    character?: string;
    credit_id: string;
    order?: number;
    department?: Department;
    job?: string;
}

export enum Department {
    Acting = "Acting",
    Art = "Art",
    Camera = "Camera",
    CostumeMakeUp = "Costume & Make-Up",
    Crew = "Crew",
    Directing = "Directing",
    Editing = "Editing",
    Lighting = "Lighting",
    Production = "Production",
    Sound = "Sound",
    Writing = "Writing",
}

/* Movies Images Interfaces */

export interface IMovieImages {
    backdrops: Backdrop[];
    id: number;
    logos: Backdrop[];
    posters: Backdrop[];
}

export interface Backdrop {
    aspect_ratio: number;
    height: number;
    iso_639_1: null | string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

/* Movie Videos Interfaces */

export interface IMovieVideos {
    id: number;
    results: IVideo[];
}

export interface IVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    published_at: Date;
    site: Site;
    size: number;
    type: Type;
    official: boolean;
    id: string;
}

export enum Site {
    YouTube = "YouTube",
}

export enum Type {
    Featurette = "Featurette",
    Teaser = "Teaser",
    Trailer = "Trailer",
}

/* Movies Genres Interfaces */

export interface IGenre {
    genres: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}