import { useContext, useRef } from 'react';

import ModalContext from '../../store/modal-context';
import TimerContext from '../../store/timer-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.css';

const Modal: React.FunctionComponent = () => {
  const ctx = useContext(ModalContext);
  const ctxSecondary = useContext(TimerContext);
  const inputRef = useRef<HTMLInputElement>(null!);
  const preventClose = (e: any) => {
    e.stopPropagation();
  };

  const toggleModal = () => {
    ctx.setShowModal((prevState) => !prevState);
  };

  const setTimerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current.value.trim()) {
      alert('Please enter a timeout value');
      return;
    }
    ctxSecondary.setTimerHandler(+inputRef.current.value.trim());
    toggleModal();
  };
  return (
    <>
      {ctx.showModal && (
        <div className={styles.backdrop} onClick={toggleModal}>
          <div className={styles.modal} onClick={preventClose}>
            <button onClick={toggleModal} className={styles.close}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <form onSubmit={setTimerHandler} className={styles.form}>
              <div className={styles.control}>
                <label className={styles.label} htmlFor='timeoutInput'>
                  Set timeout:
                </label>
                <input
                  ref={inputRef}
                  className={styles.input}
                  id='timeoutInput'
                  type='number'
                />
              </div>
              <button className={styles.btn}>Confirm</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
