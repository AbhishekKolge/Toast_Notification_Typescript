import { useContext } from 'react';

import ToastContext from '../../store/toast-context';

import ToastMessage from '../UI/ToastMessage/ToastMessage';

import styles from './Notification.module.css';

const Notification: React.FunctionComponent = () => {
  const ctx = useContext(ToastContext);
  return (
    <>
      {ctx.toasts.length > 0 && (
        <ul className={styles.list}>
          {ctx.topToasts.map((toast) => {
            return (
              <ToastMessage
                key={toast.id}
                id={toast.id}
                text={`${toast.text}: ${toast.id}`}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Notification;
