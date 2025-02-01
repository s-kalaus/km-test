import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    hydrateFallbackElement: <div />,
    children: [
      {
        index: true,
        async lazy() {
          const { Home: Component } = await import('./pages/home');
          return { Component };
        },
      },
      {
        path: '/movie/:id',
        async lazy() {
          const { Movie: Component } = await import('./pages/movie');
          return { Component };
        },
      },
      {
        path: '/favorites',
        async lazy() {
          const { Favorites: Component } = await import('./pages/favorites');
          return { Component };
        },
      },
      {
        path: '*',
        async lazy() {
          const { Error: Component } = await import('./pages/error');
          return { Component };
        },
      },
    ],
  },
]);
