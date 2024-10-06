import { ChangeEvent, InputHTMLAttributes } from 'react';
import styles from './InputCheck.module.css';
import cn from '@/common/utils/classNames';

type Position = 'right' | 'left';
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (_e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  labelPosition?: Position;
}

const InputCheckBox = ({
  checked,
  name,
  handleChange,
  className = '',
  label,
  labelPosition = 'right',
  ...props
}: Props) => {
  return (
    <main className={cn(styles.container, styles[labelPosition])}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        type="checkbox"
        checked={checked}
        name={name}
        onChange={handleChange}
        className={cn(styles.input, className)}
        {...props}
      />
    </main>
  );
};

export default InputCheckBox;
