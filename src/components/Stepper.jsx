import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Stepper = ({ steps, currentStep }) => {
  const progress = steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;

  return (
    <div className="w-full py-4 mb-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -transtone-y-1/2 w-full h-1 bg-stone-100 rounded-full z-0" />

        <motion.div
          className="absolute left-0 top-1/2 -transtone-y-1/2 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={isActive ? { duration: 0.5, ease: 'easeInOut' } : {}}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-[3px] transition-all duration-300
                  ${isCompleted
                    ? 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/30'
                    : isActive
                    ? 'bg-white border-blue-500 text-blue-600 shadow-lg shadow-blue-500/20'
                    : 'bg-white border-stone-200 text-stone-400'
                  }
                `}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </motion.div>
                ) : (
                  index + 1
                )}
              </motion.div>
              <span
                className={`
                  absolute top-12 text-xs font-semibold whitespace-nowrap hidden sm:block transition-colors
                  ${isCompleted ? 'text-blue-600' : isActive ? 'text-stone-800' : 'text-stone-400'}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
