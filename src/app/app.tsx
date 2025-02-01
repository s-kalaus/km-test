import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import './styles.scss';

import { createMockServer } from '~/mocks/server';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '@/apollo';
import { FavoritesProvider } from '@/contexts/favorites-context';
import { Toast } from '@/components/toast';
import { ToastsProvider } from '@/contexts/toasts-context';

createMockServer();

const theme = createTheme();
const client = createApolloClient();

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <ToastsProvider>
        <FavoritesProvider>
          <CssBaseline />
          <RouterProvider router={router} />
          <Toast />
        </FavoritesProvider>
      </ToastsProvider>
    </ThemeProvider>
  </ApolloProvider>
);
