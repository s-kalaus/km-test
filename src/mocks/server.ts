import { createServer, Server } from 'miragejs';
import { createGraphQLHandler } from '@miragejs/graphql';

import schema from '~/schema.graphql';
import { movies } from '~/mocks/data/movies';
import { genres } from '~/mocks/data/genres';
import { Actor, Genre, Movie, MoviesResult } from '@/graphql/types';
import moment from 'moment';
import { MoviesQueryVariables } from '@/graphql/queries/movies.generated';
import { PER_PAGE } from '@/consts';
import { MovieQueryVariables } from '@/graphql/queries/movie.generated';
import { actors } from '~/mocks/data/actors';

type ContextType = { mirageSchema: Server['schema'] };

const genresMap: Record<string, Genre> = genres.reduce(
  (prev, genre) => ({ ...prev, [genre.id]: genre }),
  {},
);

const actorsMap: Record<string, Actor> = actors.reduce(
  (prev, actor) => ({ ...prev, [actor.id]: actor }),
  {},
);

export type CreateMockServerProps = {
  timing?: number;
  logging?: boolean;
};

export const createMockServer = (props: CreateMockServerProps = {}) => {
  const { timing = 500, logging = true } = props;

  return createServer({
    fixtures: {
      movies: { key: 'all', value: movies },
      genres: { key: 'all', value: genres },
    },
    timing,
    routes() {
      this.logging = logging;

      this.post(
        '/graphql',
        createGraphQLHandler(schema, this.schema, {
          context: undefined,
          root: undefined,
          resolvers: {
            Movie: {
              genres: ({ genres }: { genres: string[] }) => {
                return genres.map((id) => genresMap[id]);
              },
              actors: ({ actors }: { actors: string[] }) => {
                return actors.map((id) => actorsMap[id]);
              },
            },
            MoviesResult: {
              list: ({ list }: MoviesResult) => list,
              pageInfo: ({ pageInfo }: MoviesResult) => pageInfo,
            },
            Query: {
              movie(
                _: never,
                variables: MovieQueryVariables,
                context: ContextType,
              ) {
                const { movies } = context.mirageSchema.db;
                const { id } = variables;

                return movies
                  .findBy({ key: 'all' })
                  .value.find(({ id: theId }: Movie) => theId === id);
              },
              movies(
                _: never,
                variables: MoviesQueryVariables,
                context: ContextType,
              ) {
                const { movies } = context.mirageSchema.db;
                const {
                  title,
                  rating,
                  genre,
                  releaseDateStart,
                  releaseDateEnd,
                  first,
                  after,
                  before,
                  ids,
                } = variables;

                const perPage = first || PER_PAGE;

                const listFiltered = movies
                  .findBy({ key: 'all' })
                  .value.filter((movie: Movie) => {
                    // If IDs provided - we only search by them
                    if (ids?.length) {
                      return ids.includes(movie.id);
                    }

                    if (
                      title &&
                      !movie.title.toLowerCase().includes(title.toLowerCase())
                    ) {
                      return false;
                    }

                    // If rating provided - we only show movies with higher rating than provided
                    if (rating && movie.rating < rating) {
                      return false;
                    }

                    // If genre provided - we show a movie if any of the genres match
                    if (
                      genre?.length &&
                      (movie.genres as unknown as string[]).every(
                        (theGenre) => !genre.includes(theGenre),
                      )
                    ) {
                      return false;
                    }

                    if (
                      releaseDateStart &&
                      moment(movie.releaseDate).isBefore(
                        moment(releaseDateStart),
                      )
                    ) {
                      return false;
                    }

                    if (
                      releaseDateEnd &&
                      moment(movie.releaseDate).isAfter(
                        moment(releaseDateEnd).endOf('day'),
                      )
                    ) {
                      return false;
                    }

                    return true;
                  });

                const index = listFiltered.findIndex(
                  ({ id }: Movie) => id === (before || after),
                );

                let list = listFiltered;

                if (before) {
                  list = list.slice(index - perPage, index);
                } else if (after) {
                  list = list.slice(index + 1, index + 1 + perPage);
                } else {
                  list = list.slice(0, perPage);
                }

                const firstIndex = listFiltered.findIndex(
                  ({ id }: Movie) => id === list[0].id,
                );

                const lastIndex = listFiltered.findIndex(
                  ({ id }: Movie) => id === list[list.length - 1].id,
                );

                return {
                  list,
                  pageInfo: {
                    hasNextPage: lastIndex + 1 < listFiltered.length,
                    hasPreviousPage: firstIndex > 0,
                  },
                };
              },
              genres(_: never, __: never, context: ContextType) {
                const { genres } = context.mirageSchema.db;

                return genres.findBy({ key: 'all' }).value;
              },
            },
          },
        }),
      );
    },
  });
};
