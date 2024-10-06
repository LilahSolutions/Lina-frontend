import styles from './InputRadioGroup.module.css';
import { Form } from '@/common/hooks/useForm/useRichieForm';
import cn from '@/common/utils/classNames';

export interface RadioOption {
  value: string | number | boolean;
  internalLabel?: string;
  internalDescription?: string;
  isDisabled?: boolean;
}

export interface InputRadioGroupProps {
  className?: string;
  name: string;
  label?: string;
  radios: RadioOption[] | undefined;
  isDisabled?: boolean;
  value?: any;
  handleChange: (_name: string, _value: any) => void;
  form: Form;
}

const InputRadioGroup: React.FC<InputRadioGroupProps> = ({
  className = '',
  name,
  label,
  radios,
  isDisabled = false,
  handleChange,
  form,
}) => {
  return (
    <div className={styles.radioGroupContainer}>
      {label && <h3 className={styles.label}>{label}</h3>}
      <div className="flex flex-col gap-s">
        {radios?.map((radio, i) => {
          return (
            <label key={i} className={cn('text-n6 n6 gap-s flex', className)}>
              <input
                type="radio"
                value={`${radio.value}`}
                checked={radio.value === form[name]}
                name={name}
                disabled={isDisabled || radio.isDisabled}
                className={className}
                onChange={() => {
                  handleChange(name, radio.value);
                }}
              />
              <span className={styles.internalLabel}>
                {radio.internalLabel}
              </span>
              {radio.internalDescription && (
                <p className="s">{radio.internalDescription}</p>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default InputRadioGroup;
