import { render, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';

import { Movie } from './movie';
import { movies } from '~/mocks/data/movies';

import { createMockServer } from '~/mocks/server';

import { createApolloClient } from '@/apollo';
import { ApolloProvider } from '@apollo/client';
import { beforeEach } from 'vitest';

vi.mock('react-router-dom');

createMockServer({
  timing: 0,
  logging: false,
});

const [movie] = movies;

describe('Movie', () => {
  const renderComponent = () => {
    const client = createApolloClient();

    return render(
      <ApolloProvider client={client}>
        <Movie />
      </ApolloProvider>,
    );
  };

  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: movie.id });
  });

  it('should render movie plot', async () => {
    const { getByText } = renderComponent();

    await waitFor(() => expect(getByText(movie.plot)).toBeTruthy());
  });

  it('should render not found text', async () => {
    vi.mocked(useParams).mockReturnValue({ id: 'x' });

    const { getByText } = renderComponent();

    await waitFor(() => expect(getByText('Movie not found')).toBeTruthy());
  });

  it('should render loading', async () => {
    const { getByRole } = renderComponent();

    await waitFor(() => expect(getByRole('progressbar')).toBeTruthy());
  });
});
