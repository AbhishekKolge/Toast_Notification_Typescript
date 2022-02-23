import { createContext, useState } from 'react';

type ModalContextProviderProps = {
  children: React.ReactNode;
};

type ModalContextType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = createContext({} as ModalContextType);

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
