import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Briefcase, IndianRupee, HelpCircle, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import Stepper from '../components/Stepper';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import PageWrapper from '../components/PageWrapper';
import { STATES, OCCUPATIONS, INCOME_RANGES, GENDERS, CATEGORIES } from '../services/constants';

const CheckEligibility = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    state: '',
    occupation: '',
    income: '',
    category: '',
  });

  const steps = [
    { label: 'Personal' },
    { label: 'Location & Work' },
    { label: 'Financials' },
  ];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      navigate('/results', { state: { formData } });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStepValid = () => {
    if (currentStep === 0) return formData.age && formData.gender;
    if (currentStep === 1) return formData.state && formData.occupation;
    if (currentStep === 2) return formData.income && formData.category;
    return false;
  };

  const progressPercent = Math.round(((currentStep + (isStepValid() ? 1 : 0.5)) / steps.length) * 100);

  const stepVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-stone-50 pt-24 pb-16 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" /> 2-Minute Eligibility Check
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
              Check Your <span className="gradient-text">Eligibility</span>
            </h1>
            <p className="text-stone-500 text-lg">
              Answer a few questions and we'll find schemes tailored to your profile.
            </p>
          </motion.div>

          <div className="mb-8">
            <div className="flex justify-between text-xs font-semibold text-stone-400 mb-2">
              <span>Progress</span>
              <span className="text-blue-600">{progressPercent}% Complete</span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 p-6 md:p-10 border border-stone-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full pointer-events-none" />

            <Stepper steps={steps} currentStep={currentStep} />

            <div className="mt-8 relative z-10">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step-0"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-500" />
                      </div>
                      Basic Details
                    </h2>

                    <Input
                      label="Age"
                      type="number"
                      name="age"
                      min="1"
                      max="120"
                      placeholder="E.g., 25"
                      value={formData.age}
                      onChange={handleChange}
                    />

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-3">Gender</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {GENDERS.map((gender) => (
                          <motion.button
                            key={gender}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setFormData({ ...formData, gender })}
                            className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer ${
                              formData.gender === gender
                                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-500/10'
                                : 'border-stone-200 text-stone-600 hover:border-blue-200 hover:bg-stone-50'
                            }`}
                          >
                            {gender}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-blue-500" />
                      </div>
                      Location & Work
                    </h2>

                    <Select
                      label="State of Residence"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      options={STATES}
                      placeholder="Select your state"
                      icon={MapPin}
                    />

                    <Select
                      label="Current Occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      options={OCCUPATIONS}
                      placeholder="Select occupation type"
                      icon={Briefcase}
                    />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <IndianRupee className="w-4 h-4 text-blue-500" />
                      </div>
                      Financials & Category
                    </h2>

                    <Select
                      label="Annual Household Income"
                      name="income"
                      value={formData.income}
                      onChange={handleChange}
                      options={INCOME_RANGES}
                      placeholder="Select income range"
                      icon={IndianRupee}
                    />

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold text-stone-700">Social Category</label>
                        <HelpCircle className="w-4 h-4 text-stone-400 cursor-help" title="Used strictly to match affirmative action schemes." />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {CATEGORIES.map((cat) => (
                          <motion.button
                            key={cat}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setFormData({ ...formData, category: cat })}
                            className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer ${
                              formData.category === cat
                                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-500/10'
                                : 'border-stone-200 text-stone-600 hover:border-blue-200 hover:bg-stone-50'
                            }`}
                          >
                            {cat}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-10 flex justify-between items-center pt-6 border-t border-stone-100">
              <Button
                variant="ghost"
                size="md"
                icon={ChevronLeft}
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                Back
              </Button>

              <Button
                variant="primary"
                size="lg"
                iconRight={ChevronRight}
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                {currentStep === steps.length - 1 ? 'Find My Schemes' : 'Continue'}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CheckEligibility;
