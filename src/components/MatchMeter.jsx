import { motion } from 'framer-motion';

const MatchMeter = ({ percent = 0, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const getColor = (p) => {
    if (p >= 75) return { stroke: '#46A171', bg: '#E8F1EC', text: '#2F6B4E' };
    if (p >= 50) return { stroke: '#D5803B', bg: '#FBEBDE', text: '#9C5A26' };
    return { stroke: '#E56458', bg: '#FCE9E7', text: '#B23C31' };
  };

  const colors = getColor(percent);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#EDECEA"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="text-2xl font-extrabold"
            style={{ color: colors.text }}
          >
            {percent}%
          </motion.span>
          <span className="text-xs font-medium text-stone-400">Match</span>
        </div>
      </div>
    </div>
  );
};

export default MatchMeter;
