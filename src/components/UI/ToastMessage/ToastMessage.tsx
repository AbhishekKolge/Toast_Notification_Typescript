import { useContext, useState, useEffect } from 'react';

import ToastContext from '../../../store/toast-context';
import TimerContext from '../../../store/timer-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './ToastMessage.module.css';

type ToastMessageProps = { id: number; text: string };

const ToastMessage = ({ id, text }: ToastMessageProps) => {
  const ctx = useContext(ToastContext);
  const ctxSecondary = useContext(TimerContext);
  const [counter, setCounter] = useState<number | null>(0);
  const deleteToastMessage = () => {
    ctx.deleteToastHandler(id);
  };

  useEffect(() => {
    let timer: any;
    if (counter !== null) {
      timer = setTimeout(() => setCounter(counter + 1), 1000);
    }

    if (counter && counter >= ctxSecondary.timer) {
      ctx.deleteToastHandler(id);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  const stopCounterHandler = () => {
    setCounter(null);
  };

  const startCounterHandler = () => {
    setCounter(0);
  };

  return (
    <div
      onMouseEnter={stopCounterHandler}
      onMouseLeave={startCounterHandler}
      className={styles.toast}
    >
      <span className={styles.text}>{text}</span>{' '}
      <button onClick={deleteToastMessage} className={styles.close}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default ToastMessage;
