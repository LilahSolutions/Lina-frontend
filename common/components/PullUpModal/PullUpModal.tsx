import React from 'react';
import cn from '@/common/utils/classNames';
import Img from '../Img';
import styles from './PullUpModal.module.css';
import close from '@/public/assets/close.svg';

type Size = 'high' | 'small' | 'medium' | 'fullScreen';

export interface Props {
  children: React.ReactNode;
  hideModal: () => void;
  open?: boolean;
  hideCloseButton?: boolean;
  hideBackButton?: boolean;
  handleBack: () => void;
  size?: Size;
}

const PullUpModal: React.FC<Props> = ({
  children,
  hideModal,
  open = true,

  size = 'small',
}) => {
  return (
    <div
      className={cn(
        styles.container,
        open ? styles.containerShow : styles.containerHide,
        styles[size],
        'animate__animated animate__slideInUp'
      )}
    >
      <div className="flex justify-between p-5" onClick={hideModal}>
        <h6>asdsadsadsa</h6>
        <Img src={close} alt="close" />
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
};

export default PullUpModal;
