import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Button from './Button';

const CATEGORIES = [
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Education', label: 'Education' },
  { value: 'Women', label: 'Women & Girls' },
  { value: 'Housing', label: 'Housing' },
  { value: 'Employment', label: 'Employment' },
  { value: 'General Welfare', label: 'General Welfare' },
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'deadline', label: 'Deadline (Soonest)' },
  { value: 'name', label: 'Name (A-Z)' },
];

const Filters = ({ onFilter, onSort, activeFilters = [], activeSort = 'relevance' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(activeFilters);
  const [sortBy, setSortBy] = useState(activeSort);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const applyFilters = () => {
    onFilter?.(selectedCategories);
    onSort?.(sortBy);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortBy('relevance');
    onFilter?.([]);
    onSort?.('relevance');
  };

  return (
    <div className="relative">
      <div className="flex gap-3 flex-wrap">
        <Button
          variant={selectedCategories.length > 0 ? 'primary' : 'secondary'}
          size="md"
          icon={Filter}
          onClick={() => setIsOpen(!isOpen)}
        >
          Filters {selectedCategories.length > 0 && `(${selectedCategories.length})`}
        </Button>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              onSort?.(e.target.value);
            }}
            className="appearance-none pl-4 pr-9 py-2.5 rounded-xl border-2 border-stone-200 bg-white text-sm font-semibold text-stone-700 cursor-pointer hover:border-stone-300 focus:border-blue-300 outline-none transition-all"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -transtone-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 left-0 z-30 w-80 bg-white rounded-xl shadow-xl border border-stone-200 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-stone-800">Filter by Category</h4>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-stone-100 rounded-lg transition-colors">
                <X className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            <div className="space-y-2 mb-5">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat.value}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    selectedCategories.includes(cat.value) 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'border border-transparent hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.value)}
                    onChange={() => toggleCategory(cat.value)}
                    className="w-4 h-4 rounded border-stone-300 text-blue-500 focus:ring-blue-500/20 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-stone-700">{cat.label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={clearFilters} fullWidth>
                Clear All
              </Button>
              <Button variant="primary" size="sm" onClick={applyFilters} fullWidth>
                Apply Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;
