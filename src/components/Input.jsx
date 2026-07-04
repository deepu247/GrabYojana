import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  helperText,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-stone-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -transtone-y-1/2 text-stone-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 rounded-xl border bg-white text-stone-800
            placeholder:text-stone-400
            transition-all duration-200
            focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none
            ${Icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
              : 'border-stone-200 hover:border-stone-300'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-stone-400">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
