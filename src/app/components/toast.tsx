import { Snackbar } from '@mui/material';
import { ToastsActions, useToasts } from '@/contexts/toasts-context';

export const Toast = () => {
  const { toast, dispatch } = useToasts();

  return (
    <Snackbar
      open={!!toast}
      autoHideDuration={toast?.duration}
      onClose={() => {
        dispatch({ type: ToastsActions.SHOW, payload: null });
      }}
      message={toast?.message}
    />
  );
};
