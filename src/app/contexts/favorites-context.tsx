import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';
import { noop } from 'lodash';
import { FAVORITES_STORAGE_KEY } from '@/consts';

export enum FavoritesActions {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export type FavoritesAction = {
  type: FavoritesActions;
  payload: string;
};

export type FavoritesState = string[];

export const getInitialState = (): FavoritesState => {
  let state = [];

  try {
    state = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? '') ?? [];
  } catch {
    //
  }

  return state;
};

export const syncInitialState = (state: FavoritesState) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state));
  } catch {
    //
  }
};

const FavoritesContext = createContext<{
  dispatch: (action: FavoritesAction) => void;
  favorites: string[];
}>({ dispatch: noop, favorites: getInitialState() });

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, getInitialState());

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

export const favoritesReducer = (
  favorites: FavoritesState,
  action: FavoritesAction,
) => {
  let state = [...favorites];

  switch (action.type) {
    case FavoritesActions.ADD:
      state = [...state, action.payload];
      break;

    case FavoritesActions.REMOVE:
      state = state.filter((id) => id !== action.payload);
      break;
  }

  syncInitialState(state);

  return state;
};
