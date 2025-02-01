import {
  Drawer as MuiDrawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { t } from '@/utils/i18n';

export type DrawerProps = {
  opened: boolean;
  onDrawerClose: () => void;
  onNavigate: (href: string) => void;
};

export const MENU = [
  { title: t`Movies search`, href: '/' },
  { title: t`Favorites`, href: '/favorites' },
];

export const Drawer = (props: DrawerProps) => {
  const { opened, onDrawerClose, onNavigate } = props;

  const location = useLocation();

  return (
    <MuiDrawer anchor="left" open={opened} onClose={onDrawerClose}>
      <List sx={sx.frame}>
        {MENU.map(({ title, href }) => (
          <ListItemButton
            key={title}
            selected={location.pathname === href}
            onClick={() => onNavigate(href)}
          >
            <ListItemText primary={title} />
          </ListItemButton>
        ))}
      </List>
    </MuiDrawer>
  );
};

const sx = {
  frame: {
    p: 2,
    minWidth: 250,
  },
};
