import { render, waitFor, fireEvent } from '@testing-library/react';
import { Home } from './home';
import { movies } from '~/mocks/data/movies';

import { createMockServer } from '~/mocks/server';

import { createApolloClient } from '@/apollo';
import { ApolloProvider } from '@apollo/client';
import { beforeEach } from 'vitest';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom');

createMockServer({
  timing: 0,
  logging: false,
});

const [homeAlone, , , aloneInTheDark] = movies;

describe('Home', () => {
  beforeEach(() => {
    vi.mocked(useNavigate).mockImplementation(vi.fn);
  });

  const renderComponent = () => {
    const client = createApolloClient();

    return render(
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>,
    );
  };

  it('should render first movie', async () => {
    const { getByText } = renderComponent();

    await waitFor(() => expect(getByText(homeAlone.title)).toBeTruthy());
  });

  it('should find by title only 1 movie', async () => {
    const { getByText, getByRole, getAllByRole } = renderComponent();

    const input = getByRole('search').querySelector(
      'input',
    ) as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'dark' },
    });

    await waitFor(() => expect(getAllByRole('movie')).toHaveLength(1));
    await waitFor(() => expect(getByText(aloneInTheDark.title)).toBeTruthy());
  });
});
