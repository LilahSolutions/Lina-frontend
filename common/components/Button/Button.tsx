import React, {
  ButtonHTMLAttributes,
  FormEvent,
  useEffect,
  useState,
} from 'react';

type Size = 'tiny' | 'small' | 'medium' | 'large' | 'xLarge' | 'icon';

type Loading = 'spinner' | 'text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick?: (_e: FormEvent<HTMLButtonElement>) => any;
  label?: string;
  sizeComponent?: Size;
  isLoading?: boolean;
  disabledLoading?: boolean;
  typeLoading?: Loading;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      handleClick,
      label,
      sizeComponent = 'medium',
      className = '',
      disabled,
      isLoading,
      disabledLoading,
      typeLoading = 'spinner',
      variant = 'primary',
      ...props
    },
    ref
  ) => {
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
      if (isLoading) {
        setShowLoading(true);
      } else {
        const timer = setTimeout(() => {
          setShowLoading(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }, [isLoading]);

    const handleAsyncClick = async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabledLoading) setShowLoading(true);
      if (handleClick) await handleClick(e);
      setShowLoading(false);
    };

    const LoadingButton = () => {
      switch (typeLoading) {
        case 'spinner':
          return <span className="mr-2 animate-spin">&#9696;</span>;
        case 'text':
          return <span className="mr-2">Loading...</span>;
        default:
          return null;
      }
    };

    const sizeClasses = {
      tiny: 'px-2 py-1 text-xs',
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
      xLarge: 'px-8 py-4 text-xl',
      icon: 'p-2',
    };

    const baseClasses = `
      inline-flex items-center justify-center rounded-full font-medium 
      transition-colors focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-blue-500 focus-visible:ring-offset-2 
      disabled:opacity-50 disabled:pointer-events-none
    `;

    const variantClasses = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
      outline:
        'bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 shadow-Elevation3blue',
    };

    return (
      <button
        ref={ref}
        className={`
          ${baseClasses}
          ${sizeClasses[sizeComponent]}
          ${variantClasses[variant]}
          ${className}
        `}
        onClick={handleAsyncClick}
        disabled={showLoading || disabled}
        {...props}
      >
        {showLoading && <LoadingButton />}
        {children || label}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
