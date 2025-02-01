import {
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  Card,
  LinearProgress,
  CardContent,
  Alert,
  ListItemButton,
  ListItem,
} from '@mui/material';
import { t } from '@/utils/i18n';
import { MoviesQuery } from '@/graphql/queries/movies.generated';
import { ApolloError } from '@apollo/client';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FavoritesToggle } from '@/components/favorites-toggle';

export type MoviesListProps = {
  list: MoviesQuery['movies']['list'];
  loading?: boolean;
  error?: ApolloError;
};

export const MoviesList = (props: MoviesListProps) => {
  const navigate = useNavigate();
  const { list, loading, error } = props;

  const loadingFragment = useMemo(() => {
    if (!loading) {
      return null;
    }

    return (
      <CardContent sx={sx.contentPadding}>
        <LinearProgress />
      </CardContent>
    );
  }, [loading]);

  const errorFragment = useMemo(() => {
    if (!error) {
      return null;
    }

    return (
      <CardContent>
        <Alert severity="error">{t`API error. Try again later`}</Alert>
      </CardContent>
    );
  }, [error]);

  const listFragment = useMemo(() => {
    if (error || loading || !list.length) {
      return null;
    }

    return (
      <List>
        {list.map(({ id, title, director, releaseDate, poster }) => (
          <ListItem key={id} secondaryAction={<FavoritesToggle id={id} />}>
            <ListItemButton
              // eslint-disable-next-line jsx-a11y/aria-role
              role="movie"
              onClick={() => navigate(`/movie/${id}`)}
            >
              <ListItemAvatar>
                <Avatar src={poster} />
              </ListItemAvatar>
              <ListItemText
                primary={title}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={sx.director}
                    >
                      {director}
                    </Typography>
                    , {moment(releaseDate).format('YYYY')}
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }, [navigate, error, loading, list]);

  const notFoundFragment = useMemo(() => {
    if (error || loading || list.length) {
      return null;
    }

    return (
      <CardContent sx={sx.contentPadding}>
        <Typography variant="body1">{t`No movies found`}</Typography>
      </CardContent>
    );
  }, [error, loading, list]);

  return (
    <Card>
      {loadingFragment}
      {listFragment}
      {notFoundFragment}
      {errorFragment}
    </Card>
  );
};

const sx = {
  contentPadding: { pt: 3 },
  director: { color: 'text.primary', display: 'inline' },
};
