import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import PageWrapper from '../components/PageWrapper';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email Us',
      subtitle: 'For general inquiries',
      value: 'support@grabyojana.in',
      href: 'mailto:support@grabyojana.in',
      color: 'bg-blue-50 text-blue-600',
      hoverColor: 'hover:border-blue-200',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Call Us',
      subtitle: 'Mon-Fri, 9am to 6pm',
      value: '1800-123-4567',
      href: 'tel:18001234567',
      color: 'bg-emerald-50 text-emerald-600',
      hoverColor: 'hover:border-emerald-200',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Visit Us',
      subtitle: 'Our office location',
      value: 'KCC Institutes, Greater Noida, UP 201306',
      color: 'bg-orange-50 text-orange-600',
      hoverColor: 'hover:border-orange-200',
    },
  ];

  return (
    <PageWrapper>
      <div className="pt-24 pb-20 bg-stone-50 min-h-screen relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" /> We're Here to Help
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              Have questions about a scheme? Need help with your application? Our team is ready to assist you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {info.href ? (
                    <a href={info.href} className="block">
                      <div className={`bg-white p-6 rounded-xl border border-stone-100 ${info.hoverColor} hover:shadow-md transition-all duration-200 flex items-start gap-4`}>
                        <div className={`w-11 h-11 rounded-xl ${info.color} flex items-center justify-center flex-shrink-0`}>
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-stone-800 text-sm mb-0.5">{info.title}</h3>
                          <p className="text-xs text-stone-400 mb-1.5">{info.subtitle}</p>
                          <span className="text-sm font-semibold text-stone-700">{info.value}</span>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className={`bg-white p-6 rounded-xl border border-stone-100 ${info.hoverColor} flex items-start gap-4`}>
                      <div className={`w-11 h-11 rounded-xl ${info.color} flex items-center justify-center flex-shrink-0`}>
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-800 text-sm mb-0.5">{info.title}</h3>
                        <p className="text-xs text-stone-400 mb-1.5">{info.subtitle}</p>
                        <span className="text-sm font-medium text-stone-600">{info.value}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-stone-200 overflow-hidden h-56"
              >
                <iframe
                  title="GrabYojana Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.9953253052157!2d77.48651831548476!3d28.45070098249895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1e1b8a1c30d%3A0x3c6c8e3f5e7b3a0!2sKCC%20Institute%20of%20Technology%20%26%20Management!5e0!3m2!1sen!2sin!4v1712677200000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full pointer-events-none" />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 text-center relative z-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="w-16 h-16 mx-auto mb-6 rounded-xl bg-emerald-50 flex items-center justify-center"
                      >
                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-stone-800 mb-2">Message Sent!</h3>
                      <p className="text-stone-500">We'll get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" exit={{ opacity: 0 }} className="relative z-10">
                      <div className="grid md:grid-cols-2 gap-5 mb-5">
                        <Input
                          label="Full Name"
                          type="text"
                          placeholder="John Doe"
                          required
                        />
                        <Input
                          label="Email Address"
                          type="email"
                          placeholder="john@example.com"
                          required
                          icon={Mail}
                        />
                      </div>

                      <div className="mb-5">
                        <Select
                          label="Subject"
                          options={[
                            { value: 'general', label: 'General Inquiry' },
                            { value: 'support', label: 'Technical Support' },
                            { value: 'bug', label: 'Bug Report' },
                            { value: 'partnership', label: 'Partnership' },
                          ]}
                          placeholder="Select a topic"
                        />
                      </div>

                      <div className="mb-8">
                        <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                          Message
                        </label>
                        <textarea
                          rows="5"
                          placeholder="How can we help you?"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 hover:border-stone-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-stone-800 placeholder:text-stone-400 resize-none"
                        />
                      </div>

                      <Button type="submit" variant="primary" size="lg" iconRight={Send}>
                        Send Message
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;
