import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MoviesQueryVariables = Types.Exact<{
  title?: Types.InputMaybe<Types.Scalars['String']['input']>;
  genre?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars['ID']['input']>>
    | Types.InputMaybe<Types.Scalars['ID']['input']>
  >;
  releaseDateStart?: Types.InputMaybe<Types.Scalars['String']['input']>;
  releaseDateEnd?: Types.InputMaybe<Types.Scalars['String']['input']>;
  rating?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  ids?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars['ID']['input']>>
    | Types.InputMaybe<Types.Scalars['ID']['input']>
  >;
}>;

export type MoviesQuery = {
  movies: {
    list: Array<{
      id: string;
      title: string;
      director: string;
      releaseDate: string;
      poster: string;
      rating: number;
    }>;
    pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean };
  };
};

export const MoviesDocument = gql`
  query movies(
    $title: String
    $genre: [ID]
    $releaseDateStart: String
    $releaseDateEnd: String
    $rating: Int
    $before: String
    $after: String
    $first: Int
    $ids: [ID]
  ) {
    movies(
      title: $title
      genre: $genre
      releaseDateStart: $releaseDateStart
      releaseDateEnd: $releaseDateEnd
      rating: $rating
      before: $before
      after: $after
      first: $first
      ids: $ids
    ) {
      list {
        id
        title
        director
        releaseDate
        poster
        rating
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

/**
 * __useMoviesQuery__
 *
 * To run a query within a React component, call `useMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoviesQuery({
 *   variables: {
 *      title: // value for 'title'
 *      genre: // value for 'genre'
 *      releaseDateStart: // value for 'releaseDateStart'
 *      releaseDateEnd: // value for 'releaseDateEnd'
 *      rating: // value for 'rating'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useMoviesQuery(
  baseOptions?: Apollo.QueryHookOptions<MoviesQuery, MoviesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MoviesQuery, MoviesQueryVariables>(
    MoviesDocument,
    options,
  );
}
export function useMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MoviesQuery, MoviesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MoviesQuery, MoviesQueryVariables>(
    MoviesDocument,
    options,
  );
}
export function useMoviesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<MoviesQuery, MoviesQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MoviesQuery, MoviesQueryVariables>(
    MoviesDocument,
    options,
  );
}
export type MoviesQueryHookResult = ReturnType<typeof useMoviesQuery>;
export type MoviesLazyQueryHookResult = ReturnType<typeof useMoviesLazyQuery>;
export type MoviesSuspenseQueryHookResult = ReturnType<
  typeof useMoviesSuspenseQuery
>;
export type MoviesQueryResult = Apollo.QueryResult<
  MoviesQuery,
  MoviesQueryVariables
>;
