import { useMemo } from 'react';
import { MoviesQuery } from '@/graphql/queries/movies.generated';

export type UsePaginationProps = {
  data?: MoviesQuery;
};

export const useListData = (props: UsePaginationProps) => {
  const { data } = props;

  return useMemo(() => {
    const list = data?.movies.list ?? [];

    return {
      list,
      firstId: list[0]?.id ?? null,
      lastId: list[list.length - 1]?.id ?? null,
    };
  }, [data]);
};
