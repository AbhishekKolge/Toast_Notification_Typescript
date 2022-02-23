import { createContext, useState } from 'react';

type TimerContextProviderProps = {
  children: React.ReactNode;
};

type TimerContextType = {
  timer: number;
  setTimerHandler: (value: number) => void;
};

const TimerContext = createContext({} as TimerContextType);

export const TimerContextProvider = ({
  children,
}: TimerContextProviderProps) => {
  const [timer, setTimer] = useState<number>(7);
  const setTimerHandler = (value: number) => {
    setTimer(value);
  };
  return (
    <TimerContext.Provider value={{ timer, setTimerHandler }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
