import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Search, CheckCircle2 } from 'lucide-react';

const loadingMessages = [
  { text: "Analyzing your profile...", icon: Bot },
  { text: "Searching government databases...", icon: Search },
  { text: "Finding the best matches...", icon: Sparkles },
  { text: "Ranking schemes by eligibility...", icon: CheckCircle2 }
];

const AILoader = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingMessages[messageIndex].icon;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[400px]">
      <div className="relative flex items-center justify-center w-32 h-32 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-200"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-cyan-200"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border-t-2 border-blue-500 border-dashed opacity-50"
        />
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20"
        >
          <Bot className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      <div className="h-16 flex flex-col items-center">
        <h3 className="text-xl font-bold text-stone-800 mb-2 flex items-center gap-2">
          AI Matching in Progress
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-blue-500 font-serif tracking-widest">...</span>
          </motion.div>
        </h3>
        
        <div className="relative w-full text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2 text-stone-500 font-medium"
            >
              <CurrentIcon className="w-4 h-4 text-blue-400" />
              {loadingMessages[messageIndex].text}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AILoader;
