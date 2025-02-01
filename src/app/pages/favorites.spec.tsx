import { fireEvent, render, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import { Favorites } from './favorites';
import { movies } from '~/mocks/data/movies';

import { createMockServer } from '~/mocks/server';

import { createApolloClient } from '@/apollo';
import { ApolloProvider } from '@apollo/client';
import { afterEach, beforeEach, Mock } from 'vitest';
import { FAVORITES_STORAGE_KEY } from '@/consts';
import { FavoritesProvider } from '@/contexts/favorites-context';

vi.mock('react-router-dom');

createMockServer({
  timing: 0,
  logging: false,
});

const [movie] = movies;

describe('Favorites', () => {
  let navigate: Mock;

  const renderComponent = () => {
    const client = createApolloClient();

    return render(
      <ApolloProvider client={client}>
        <FavoritesProvider>
          <Favorites />
        </FavoritesProvider>
      </ApolloProvider>,
    );
  };

  beforeEach(() => {
    navigate = vi.fn();
    vi.mocked(useNavigate).mockImplementation(() => navigate);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should navigate to homepage if no favorites', async () => {
    renderComponent();
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should open favorites', async () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([movie.id]));

    const { getByText, getAllByRole } = renderComponent();

    await waitFor(() => expect(getAllByRole('movie')).toHaveLength(1));
    await waitFor(() => expect(getByText(movie.title)).toBeTruthy());
  });

  it('should redirect to home when last favorite removed', async () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([movie.id]));

    const { getAllByRole, getByTitle } = renderComponent();

    await waitFor(() => expect(getAllByRole('movie')).toHaveLength(1));

    fireEvent.click(getByTitle('Remove from Favorites'));

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
