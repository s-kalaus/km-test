import { Box, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { Header } from '@/components/header';
import { Drawer } from '@/components/drawer';

export const Layout = () => {
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);

  const openPage = useCallback(
    (href: string) => {
      navigate(href);
      setMenuOpened(false);
    },
    [navigate],
  );

  return (
    <Box sx={sx.frame}>
      <Header onDrawerOpen={() => setMenuOpened(true)} />
      <Drawer
        opened={menuOpened}
        onDrawerClose={() => setMenuOpened(false)}
        onNavigate={openPage}
      />
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </Box>
  );
};

const sx = {
  frame: {
    backgroundColor: '#f1f1f1',
    pb: 4,
  },
};
