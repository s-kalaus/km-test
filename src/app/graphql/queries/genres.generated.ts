import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenresQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GenresQuery = { genres: Array<{ id: string; title: string }> };

export const GenresDocument = gql`
  query genres {
    genres {
      id
      title
    }
  }
`;

/**
 * __useGenresQuery__
 *
 * To run a query within a React component, call `useGenresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenresQuery(
  baseOptions?: Apollo.QueryHookOptions<GenresQuery, GenresQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GenresQuery, GenresQueryVariables>(
    GenresDocument,
    options,
  );
}
export function useGenresLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GenresQuery, GenresQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GenresQuery, GenresQueryVariables>(
    GenresDocument,
    options,
  );
}
export function useGenresSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GenresQuery, GenresQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GenresQuery, GenresQueryVariables>(
    GenresDocument,
    options,
  );
}
export type GenresQueryHookResult = ReturnType<typeof useGenresQuery>;
export type GenresLazyQueryHookResult = ReturnType<typeof useGenresLazyQuery>;
export type GenresSuspenseQueryHookResult = ReturnType<
  typeof useGenresSuspenseQuery
>;
export type GenresQueryResult = Apollo.QueryResult<
  GenresQuery,
  GenresQueryVariables
>;
