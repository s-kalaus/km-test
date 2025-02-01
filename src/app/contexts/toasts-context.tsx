import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';
import { noop } from 'lodash';

export enum ToastsActions {
  SHOW = 'SHOW',
}

export type ToastsState = { message: string; duration?: number } | null;

export type ToastsAction = {
  type: ToastsActions;
  payload: ToastsState;
};

const ToastsContext = createContext<{
  dispatch: (action: ToastsAction) => void;
  toast: ToastsState;
}>({ dispatch: noop, toast: null });

export const ToastsProvider = ({ children }: PropsWithChildren) => {
  const [toast, dispatch] = useReducer(toastsReducer, null);

  return (
    <ToastsContext.Provider value={{ toast, dispatch }}>
      {children}
    </ToastsContext.Provider>
  );
};

export const useToasts = () => useContext(ToastsContext);

export const toastsReducer = (toast: ToastsState, action: ToastsAction) => {
  switch (action.type) {
    case ToastsActions.SHOW: {
      return action.payload ? { duration: 2000, ...action.payload } : null;
    }
    default: {
      return toast;
    }
  }
};
