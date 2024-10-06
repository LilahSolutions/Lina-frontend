import styles from './BottomSheet.module.css';
import Img from '../Img';
import close from '@/public/assets/chevron-left.svg';
import { useEffect, useRef } from 'react';

interface BottomSheet {
  openHalf?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  open?: boolean;
}

const BottomSheet = ({
  openHalf,
  onClose = () => {},
  children,
  open,
}: BottomSheet) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current?.contains(event.target)) {
        onClose();
      }
    };
    //A wait of 500ms is set because if set immediately, the function is executed
    setTimeout(() => {
      if (open) {
        document.addEventListener('click', handleClickOutside);
      }
    }, 500);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={openHalf ? styles.bottomSheetHalf : styles.bottomSheet}
    >
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          <Img width={35} height={35} src={close} alt="Volver" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
