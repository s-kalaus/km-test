export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Actor = {
  __typename?: 'Actor';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Movie = {
  __typename?: 'Movie';
  actors: Array<Actor>;
  director: Scalars['String']['output'];
  genres: Array<Genre>;
  id: Scalars['ID']['output'];
  plot: Scalars['String']['output'];
  poster: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  releaseDate: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type MoviesResult = {
  __typename?: 'MoviesResult';
  list: Array<Movie>;
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  genres: Array<Genre>;
  movie?: Maybe<Movie>;
  movies: MoviesResult;
};

export type QueryMovieArgs = {
  id: Scalars['ID']['input'];
};

export type QueryMoviesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  genre?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  releaseDateEnd?: InputMaybe<Scalars['String']['input']>;
  releaseDateStart?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};
