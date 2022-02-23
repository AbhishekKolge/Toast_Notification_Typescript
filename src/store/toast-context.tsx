import { createContext, useReducer, useEffect, useState } from 'react';

type ToastContextProviderProps = {
  children: React.ReactNode;
};

type Toasts = {
  text: string;
  id: number;
}[];

type ToastContextType = {
  toasts: Toasts;
  topToasts: Toasts;
  idVariant: number;
  addToastHandler: (text: string) => void;
  deleteToastHandler: (id: number) => void;
  deleteToastListHandler: (id: number) => void;
  changeToastTextHandler: (text: string) => void;
  clearNotificationHandler: () => void;
};

type CartState = {
  toastList: Toasts;
  idVariant: number;
};

type AddAction = { type: 'ADD_TOAST'; text: string };

type DeleteAction = {
  type: 'DELETE_TOAST';
  id: number;
};

type ChangeAction = {
  type: 'CHANGE_TEXT';
  text: string;
};

type ClearAction = {
  type: 'CLEAR_NOTIFICATIONS';
};

type ToastActions = AddAction | DeleteAction | ChangeAction | ClearAction;
const ToastContext = createContext({} as ToastContextType);

const defaultCartState = {
  toastList: [],
  idVariant: 1,
};

const toastReducer = (state: CartState, action: ToastActions) => {
  if (action.type === 'ADD_TOAST') {
    let toastText = '';
    action.text ? (toastText = action.text) : (toastText = 'Testing');
    const toastId = state.idVariant;
    const item = {
      text: toastText,
      id: toastId,
    };
    return {
      toastList: [item, ...state.toastList],
      idVariant: state.idVariant + 1,
    };
  }

  if (action.type === 'DELETE_TOAST') {
    const updatedList = state.toastList.filter((toast) => {
      return toast.id !== action.id;
    });
    return {
      toastList: updatedList,
      idVariant: state.idVariant,
    };
  }

  if (action.type === 'CHANGE_TEXT') {
    let updatedList = state.toastList;
    const item = state.toastList[0];
    if (item) {
      item.text = action.text;
      updatedList = [item];
    }
    return {
      toastList: updatedList,
      idVariant: state.idVariant,
    };
  }

  if (action.type === 'CLEAR_NOTIFICATIONS') {
    return defaultCartState;
  }
  return state;
};

export const ToastContextProvider = ({
  children,
}: ToastContextProviderProps) => {
  const [toastState, dispatchToastAction] = useReducer(
    toastReducer,
    defaultCartState
  );
  const [topToasts, setTopToasts] = useState<Toasts>([]);
  const addToastHandler = (text: string) => {
    dispatchToastAction({ type: 'ADD_TOAST', text });
  };

  const deleteToastHandler = (id: number) => {
    dispatchToastAction({ type: 'DELETE_TOAST', id });
  };

  const changeToastTextHandler = (text: string) => {
    dispatchToastAction({ type: 'CHANGE_TEXT', text });
  };

  const clearNotificationHandler = () => {
    dispatchToastAction({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const deleteToastListHandler = (id: number) => {
    const updatedList = topToasts.filter((toast) => {
      return toast.id !== id;
    });
    setTopToasts(updatedList);
  };

  useEffect(() => {
    const el = toastState.toastList.slice(
      Math.max(toastState.toastList.length - 3, 0)
    );
    setTopToasts(el);
  }, [toastState.toastList]);
  return (
    <ToastContext.Provider
      value={{
        toasts: toastState.toastList,
        idVariant: toastState.idVariant,
        topToasts,
        addToastHandler,
        deleteToastHandler,
        deleteToastListHandler,
        changeToastTextHandler,
        clearNotificationHandler,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
