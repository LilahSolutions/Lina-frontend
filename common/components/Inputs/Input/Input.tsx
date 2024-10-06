import React, { useEffect, useRef, useState } from 'react';
import styles from './Input.module.css'; // Asumiendo que este módulo contiene todos los estilos necesarios
import iconShown from '@/public/assets/icon-open-eye.svg';
import iconHidden from '@/public/assets/icon-closed-eye.svg';
import cn from '@/common/utils/classNames';
import Img from '@/common/components/Img';

interface InputProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
  className?: string;
  labelClassName?: string;
  imageInput?: string;
  name: string;
  errorMessage?: string;
  value: string;
  type: string;
  isDisabled?: boolean;
  unitPlaceholder?: string;
  imageError?: string;
  imageSuccess?: string;
  morphingLabel?: string;
  label?: string;
  description?: string;
  sizeImage?: string;
  placeholder?: string;
  maxLength?: number;
  required?: any;
  size?: any;
}

const Input: React.FC<InputProps> = ({
  handleChange,
  name,
  value,
  className = '',
  imageInput = '',
  placeholder = '',
  errorMessage = '',
  type = 'text',
  isDisabled = false,
  unitPlaceholder = '',
  imageError = '',
  label = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [floatLabel, setFloatLabel] = useState(false);

  useEffect(() => {
    if (value === '' || value === undefined) {
      setFloatLabel(false);
    } else {
      setFloatLabel(true);
    }
  }, [value]);

  return (
    <div
      className={cn(
        styles.inputContainer,
        isDisabled ? styles.disabled : '',
        errorMessage ? styles.errorBorder : '',
        className
      )}
      onClick={() => {
        inputRef.current?.focus();
        setFloatLabel(true);
      }}
      onBlur={() => {
        if (value === '') {
          setFloatLabel(false);
        }
      }}
    >
      <span
        className={cn(
          styles.label,
          floatLabel ? styles.labelFloat : '',
          'text-n6 px-s'
        )}
      >
        {label}
      </span>
      <input
        className={cn(styles.input)}
        onBlur={() => {
          /* handle blur if needed */
        }}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        type={type === 'password' && showPassword ? 'text' : type}
        ref={inputRef}
        disabled={isDisabled}
        name={name}
        {...(type === 'number'
          ? {
              onWheelCapture: (e) => e.currentTarget.blur(),
            }
          : {})}
        onKeyDown={(e) => {
          if (
            type === 'number' &&
            (e.key === 'ArrowDown' || e.key === 'ArrowUp')
          ) {
            e.preventDefault();
          }
        }}
      />
      {unitPlaceholder && (
        <span className={styles.unit}>{unitPlaceholder}</span>
      )}
      {type === 'password' && (
        <div onClick={() => setShowPassword(!showPassword)}>
          <Img
            src={showPassword ? iconShown : iconHidden}
            className={styles.faEye}
            alt="icon"
          />
        </div>
      )}
      {type !== 'password' && imageInput && errorMessage && (
        <Img src={imageError} width={15} height={15} alt="error" />
      )}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
