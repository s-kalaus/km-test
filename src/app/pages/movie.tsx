import {
  Alert,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Link,
  Typography,
} from '@mui/material';
import { t } from '@/utils/i18n';
import { useMovieQuery } from '@/graphql/queries/movie.generated';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import moment from 'moment';
import { FavoritesToggle } from '@/components/favorites-toggle';

export const Movie = () => {
  const { id } = useParams();

  const { data, loading, error } = useMovieQuery({
    variables: {
      id: `${id}`,
    },
    skip: !id,
  });

  const breadcrumbsFragment = useMemo(
    () => (
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          {t`Movie search`}
        </Link>
        <Typography sx={sx.breadcrumbCurrent}>{t`Details`}</Typography>
      </Breadcrumbs>
    ),
    [],
  );

  const notFoundFragment = useMemo(() => {
    if (data?.movie || error || loading) {
      return null;
    }

    return (
      <Card>
        <CardContent sx={sx.contentPadding}>
          <Typography variant="body1">{t`Movie not found`}</Typography>
        </CardContent>
      </Card>
    );
  }, [data, error, loading]);

  const loadingFragment = useMemo(() => {
    if (!loading || error) {
      return null;
    }

    return (
      <Card>
        <CardContent sx={sx.contentPadding}>
          <LinearProgress />
        </CardContent>
      </Card>
    );
  }, [loading, error]);

  const errorFragment = useMemo(() => {
    if (!error) {
      return null;
    }

    return (
      <Card>
        <CardContent sx={sx.contentPadding}>
          <Alert severity="error">{t`API error. Try again later`}</Alert>
        </CardContent>
      </Card>
    );
  }, [error]);

  const movieFragment = useMemo(() => {
    if (loading || !data?.movie || error) {
      return null;
    }

    return (
      <Card>
        <CardMedia sx={sx.media} image={data?.movie.poster} />
        <CardContent sx={sx.flexVertical}>
          <Box sx={sx.title}>
            <Typography gutterBottom variant="h5" component="div" role="main">
              {data.movie.title}
              <span>, </span>
              {moment(data.movie.releaseDate).format('YYYY')}
            </Typography>
            <FavoritesToggle id={data.movie.id} />
          </Box>
          <Typography variant="body2">
            {t`Cast`}: {data.movie.actors.map(({ name }) => name).join(', ')}
          </Typography>
          <Typography variant="body2">
            {t`Director`}: {data.movie.director}
          </Typography>
          <Typography variant="body2">
            {t`Genres`}:{' '}
            {data.movie.genres.map(({ title }) => title).join(', ')}
          </Typography>
          <Typography variant="body2" sx={sx.plot}>
            {data.movie.plot}
          </Typography>
        </CardContent>
      </Card>
    );
  }, [error, loading, data]);

  return (
    <Box sx={sx.flexVertical}>
      {breadcrumbsFragment}
      {loadingFragment}
      {errorFragment}
      {notFoundFragment}
      {movieFragment}
    </Box>
  );
};

const sx = {
  media: {
    height: 200,
  },
  flexVertical: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  title: {
    display: 'flex',
    gap: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plot: { color: 'text.secondary' },
  contentPadding: { pt: 3 },
  breadcrumbCurrent: { color: 'text.primary' },
};
