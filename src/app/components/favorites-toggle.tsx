import { IconButton } from '@mui/material';
import { Star } from '@mui/icons-material';
import { t } from '@/utils/i18n';
import { useMemo } from 'react';
import { FavoritesActions, useFavorites } from '@/contexts/favorites-context';

export type FavoritesToggleProps = {
  id: string;
};

export const FavoritesToggle = (props: FavoritesToggleProps) => {
  const { id } = props;
  const { favorites, dispatch } = useFavorites();

  const inFavorites = useMemo(() => favorites.includes(id), [favorites, id]);

  return (
    <IconButton
      title={inFavorites ? t`Remove from Favorites` : t`Add to Favorites`}
      edge="end"
      aria-label="favorite"
      onClick={() =>
        dispatch({
          type: inFavorites ? FavoritesActions.REMOVE : FavoritesActions.ADD,
          payload: id,
        })
      }
    >
      <Star color={inFavorites ? 'error' : 'action'} />
    </IconButton>
  );
};
