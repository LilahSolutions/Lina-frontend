import Img from '../Img';
import close from '@/public/assets/chevron-left.svg';
import styles from './Modal.module.css';

export interface ModalProp {
  children: React.ReactNode | React.JSX.Element[];
  handleCancel: () => any;
  hideCloseButton?: boolean;
}

const Modal = ({ children, handleCancel, hideCloseButton }: ModalProp) => {
  return (
    <div className={styles.container}>
      <div className={styles.children}>
        <div className={styles.headerClose}>
          {!hideCloseButton && (
            <Img
              src={close}
              width={30}
              height={30}
              alt="Cerrar"
              onClick={handleCancel}
            />
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
