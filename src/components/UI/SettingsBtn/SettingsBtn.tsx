import { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import ModalContext from '../../../store/modal-context';

import styles from './SettingsBtn.module.css';

const SettingsBtn: React.FunctionComponent = () => {
  const ctx = useContext(ModalContext);

  const toggleModal = () => {
    ctx.setShowModal((prevState) => !prevState);
  };
  return (
    <button onClick={toggleModal} className='btn__setting'>
      <FontAwesomeIcon icon={faCog} />
    </button>
  );
};

export default SettingsBtn;
