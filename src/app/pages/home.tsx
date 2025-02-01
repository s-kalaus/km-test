import { useCallback, useState } from 'react';
import {
  SearchForm,
  SearchModel,
  initialValues,
} from '@/components/search-form';
import { useMoviesQuery } from '@/graphql/queries/movies.generated';
import { Box } from '@mui/material';
import { MoviesList } from '@/components/movies-list';
import { DATE_FORMAT, PER_PAGE } from '@/consts';
import { Pagination } from '@/components/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { useListData } from '@/hooks/use-list-data';

export const Home = () => {
  const [searchModel, setSearchModel] = useState<SearchModel>(initialValues);
  const { pagination, paginateNext, paginateBack, resetPagination } =
    usePagination();

  const { data, loading, error } = useMoviesQuery({
    variables: {
      ...searchModel,
      releaseDateStart: searchModel.releaseDateStart.format(DATE_FORMAT),
      releaseDateEnd: searchModel.releaseDateEnd.format(DATE_FORMAT),
      first: PER_PAGE,
      ...(pagination.back
        ? { before: pagination.cursor }
        : { after: pagination.cursor }),
    },
  });

  const { firstId, lastId, list } = useListData({
    data,
  });

  const onSearch = useCallback(
    (values: SearchModel) => {
      setSearchModel(values);
      resetPagination();
    },
    [resetPagination],
  );

  return (
    <Box sx={sx.frame}>
      <SearchForm onChanged={onSearch} loading={loading} />
      <MoviesList list={list} loading={loading} error={error} />
      <Pagination
        {...data?.movies.pageInfo}
        onBack={() => paginateBack(firstId)}
        onNext={() => paginateNext(lastId)}
      />
    </Box>
  );
};

const sx = {
  frame: { display: 'flex', flexDirection: 'column', gap: 2 },
};
