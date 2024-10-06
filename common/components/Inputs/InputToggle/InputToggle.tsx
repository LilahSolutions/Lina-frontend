import React, { useEffect, useState } from 'react';
import icon_toggle_arrow_white from '@/public/assets/icon_toggle_arrow_white.svg';
import icon_toggle_arrow from '@/public/assets/icon_toggle_arrow.svg';
import Img from '../../Img';

interface ToggleOption {
  label: string;
  value: string | number | boolean;
}

interface ToggleProps {
  toggleOptions: ToggleOption[];
  name: string;
  value: string | number | boolean;
  label?: string;
  className?: string;
  isDisabled?: boolean;
  color?: 'black' | 'white';
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputToggle: React.FC<ToggleProps> = ({
  toggleOptions,
  name,
  value,
  label,
  className,
  isDisabled,
  color = 'black',
  handleChange,
}) => {
  const [currentValue, setCurrentValue] = useState<string | number | boolean>(
    toggleOptions[0].value
  );

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setCurrentValue(value);
    } else {
      setCurrentValue(toggleOptions[0].value);
    }
  }, [value]);

  const handleToggle = () => {
    const currentIndex = toggleOptions.findIndex(
      (option) => option.value.toString() === currentValue.toString()
    );
    const nextIndex = (currentIndex + 1) % toggleOptions.length;
    const newValue = toggleOptions[nextIndex].value;
    setCurrentValue(newValue);
    handleChange({
      target: { name, value: newValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center text-${color} cursor-pointer focus:outline-none ${className} justify-center`}
      disabled={isDisabled}
    >
      {label && <span className="mr-1">{label}</span>}
      <span className="mr-1" style={{ color }}>
        {
          toggleOptions.find(
            (option) => option.value.toString() === currentValue.toString()
          )?.label
        }
      </span>
      {
        <Img
          src={color === 'white' ? icon_toggle_arrow_white : icon_toggle_arrow}
          alt="icono de flecha"
        />
      }
    </button>
  );
};

export default InputToggle;
