import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { t } from '@/utils/i18n';

export type HeaderProps = {
  onDrawerOpen: () => void;
};

export const Header = (props: HeaderProps) => {
  const { onDrawerOpen } = props;

  return (
    <AppBar position="static" color="primary" sx={sx.bar}>
      <Toolbar>
        <Container maxWidth="sm">
          <Box sx={sx.toolbarContent}>
            <Link color="inherit" underline="none" href="/">
              <Typography variant="h6" noWrap component="div">
                {t`Movies`}
              </Typography>
            </Link>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={onDrawerOpen}
            >
              <Menu />
            </IconButton>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

const sx = {
  bar: {
    mb: 3,
  },
  toolbarContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};
