import { useMoviesQuery } from '@/graphql/queries/movies.generated';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { MoviesList } from '@/components/movies-list';
import { PER_PAGE } from '@/consts';
import { Pagination } from '@/components/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { useListData } from '@/hooks/use-list-data';
import { useFavorites } from '@/contexts/favorites-context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastsActions, useToasts } from '@/contexts/toasts-context';
import { t } from '@/utils/i18n';

export const Favorites = () => {
  const navigate = useNavigate();

  const { dispatch } = useToasts();
  const { pagination, paginateBack, paginateNext } = usePagination();
  const { favorites } = useFavorites();

  const { data, loading, error } = useMoviesQuery({
    variables: {
      ids: favorites,
      first: PER_PAGE,
      ...(pagination.back
        ? { before: pagination.cursor }
        : { after: pagination.cursor }),
    },
    skip: !favorites.length,
  });

  const { firstId, lastId, list } = useListData({
    data,
  });

  useEffect(() => {
    if (favorites.length) {
      return;
    }

    dispatch({
      type: ToastsActions.SHOW,
      payload: { message: t`No favorites. Add something` },
    });

    navigate('/');
  }, [dispatch, navigate, favorites]);

  return (
    <Box sx={sx.frame}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          {t`Movie search`}
        </Link>
        <Typography sx={sx.breadcrumbCurrent}>{t`Favorites`}</Typography>
      </Breadcrumbs>
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
  breadcrumbCurrent: { color: 'text.primary' },
};
