import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MovieQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type MovieQuery = {
  movie?: {
    id: string;
    title: string;
    plot: string;
    director: string;
    releaseDate: string;
    poster: string;
    rating: number;
    genres: Array<{ id: string; title: string }>;
    actors: Array<{ id: string; name: string }>;
  } | null;
};

export const MovieDocument = gql`
  query movie($id: ID!) {
    movie(id: $id) {
      id
      title
      plot
      director
      releaseDate
      poster
      genres {
        id
        title
      }
      actors {
        id
        name
      }
      rating
    }
  }
`;

/**
 * __useMovieQuery__
 *
 * To run a query within a React component, call `useMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovieQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMovieQuery(
  baseOptions: Apollo.QueryHookOptions<MovieQuery, MovieQueryVariables> &
    ({ variables: MovieQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MovieQuery, MovieQueryVariables>(
    MovieDocument,
    options,
  );
}
export function useMovieLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MovieQuery, MovieQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MovieQuery, MovieQueryVariables>(
    MovieDocument,
    options,
  );
}
export function useMovieSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<MovieQuery, MovieQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MovieQuery, MovieQueryVariables>(
    MovieDocument,
    options,
  );
}
export type MovieQueryHookResult = ReturnType<typeof useMovieQuery>;
export type MovieLazyQueryHookResult = ReturnType<typeof useMovieLazyQuery>;
export type MovieSuspenseQueryHookResult = ReturnType<
  typeof useMovieSuspenseQuery
>;
export type MovieQueryResult = Apollo.QueryResult<
  MovieQuery,
  MovieQueryVariables
>;
