const colorMap = {
  default: 'bg-stone-100 text-stone-600 border-stone-200',
  primary: 'bg-blue-50 text-blue-700 border-blue-200',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-orange-50 text-orange-700 border-orange-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-sky-50 text-sky-700 border-sky-200',
};

const sizeMap = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
};

const Badge = ({ 
  children, 
  color = 'default', 
  size = 'md',
  icon: Icon,
  dot = false,
  className = '' 
}) => {
  return (
    <span className={`
      inline-flex items-center gap-1.5 font-semibold rounded-full border
      ${colorMap[color]}
      ${sizeMap[size]}
      ${className}
    `}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          color === 'success' ? 'bg-emerald-500' :
          color === 'warning' ? 'bg-orange-500' :
          color === 'danger' ? 'bg-red-500' :
          color === 'primary' ? 'bg-blue-500' :
          color === 'info' ? 'bg-sky-500' :
          'bg-stone-400'
        }`} />
      )}
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};

export default Badge;
