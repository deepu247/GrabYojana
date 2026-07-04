import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Search, Zap, FileText, Shield, Users, TrendingUp, GraduationCap, Sprout, Heart, Home as HomeIcon, Briefcase, Stethoscope } from 'lucide-react';
import Button from '../components/Button';
import PageWrapper from '../components/PageWrapper';

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Matching",
      description: "AI-powered algorithm matches your profile with hundreds of active central and state government schemes.",
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Verified & Current",
      description: "Only official, currently active government schemes make it to our platform. Updated regularly.",
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Guided Application",
      description: "Step-by-step instructions, document checklists, and direct links to official portals.",
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  const categories = [
    { icon: <GraduationCap className="w-7 h-7" />, label: 'Education', count: '50+', color: 'from-blue-500 to-blue-600' },
    { icon: <Sprout className="w-7 h-7" />, label: 'Agriculture', count: '30+', color: 'from-emerald-500 to-green-600' },
    { icon: <Heart className="w-7 h-7" />, label: 'Women & Girls', count: '40+', color: 'from-pink-500 to-red-600' },
    { icon: <HomeIcon className="w-7 h-7" />, label: 'Housing', count: '20+', color: 'from-orange-500 to-orange-600' },
    { icon: <Briefcase className="w-7 h-7" />, label: 'Employment', count: '35+', color: 'from-teal-500 to-cyan-600' },
    { icon: <Stethoscope className="w-7 h-7" />, label: 'Healthcare', count: '25+', color: 'from-teal-500 to-cyan-600' },
  ];

  const steps = [
    { step: '01', title: 'Share Your Details', desc: 'Fill in a simple 2-minute eligibility questionnaire about your background.' },
    { step: '02', title: 'Discover Schemes', desc: 'Instantly see schemes you uniquely qualify for, ranked by relevance.' },
    { step: '03', title: 'Apply Securely', desc: 'Follow guided steps to apply directly on official government portals.' },
  ];

  const stats = [
    { value: '500+', label: 'Active Schemes' },
    { value: '28+', label: 'States Covered' },
    { value: '50K+', label: 'Citizens Helped' },
    { value: '98%', label: 'Match Accuracy' },
  ];

  return (
    <PageWrapper>
      <div className="pt-16">
        <section className="relative overflow-hidden py-24 lg:py-36">
          <div className="absolute inset-0 gradient-hero" />
          
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-blue-300/20 blur-3xl pointer-events-none animate-float" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-orange-300/20 blur-3xl pointer-events-none animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -transtone-x-1/2 -transtone-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(39, 131, 222) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} custom={0}>
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/80 backdrop-blur-sm text-blue-700 text-sm font-semibold mb-8 border border-blue-100 shadow-sm">
                  <Shield className="w-3.5 h-3.5" />
                  Trusted by 50,000+ Citizens
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                custom={1}
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.1] mb-7"
              >
                Find Government Schemes{' '}
                <span className="gradient-text">You Actually Qualify For</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                custom={2}
                className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed text-balance"
              >
                Stop guessing. Start benefiting. Tell us about yourself and we'll match you with financial, educational, and welfare schemes built for you.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                custom={3}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/check-eligibility">
                  <Button variant="primary" size="xl" iconRight={ArrowRight}>
                    Check Eligibility Free
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="secondary" size="xl">
                    How It Works
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-20 -mt-8">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-xl shadow-stone-200/50 border border-stone-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-stone-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-16"
            >
              <motion.p variants={fadeInUp} custom={0} className="text-blue-600 font-semibold text-sm mb-3 uppercase tracking-wider">
                Explore by Category
              </motion.p>
              <motion.h2 variants={fadeInUp} custom={1} className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4">
                Schemes Across Every Sector
              </motion.h2>
              <motion.div variants={fadeInUp} custom={2} className="w-16 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-xl border border-stone-100 p-6 text-center hover:border-blue-100 hover:shadow-lg transition-all duration-300 hover-lift">
                    <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {cat.icon}
                    </div>
                    <h3 className="font-bold text-stone-800 text-sm mb-1">{cat.label}</h3>
                    <span className="text-xs text-stone-400 font-medium">{cat.count} schemes</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-16"
            >
              <motion.p variants={fadeInUp} custom={0} className="text-blue-600 font-semibold text-sm mb-3 uppercase tracking-wider">
                Why GrabYojana?
              </motion.p>
              <motion.h2 variants={fadeInUp} custom={1} className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4">
                Built for Citizens, Not Bureaucrats
              </motion.h2>
              <motion.div variants={fadeInUp} custom={2} className="w-16 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-xl border border-stone-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 hover-lift"
                >
                  <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{feature.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-24 gradient-dark text-white relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.p variants={fadeInUp} custom={0} className="text-blue-400 font-semibold text-sm mb-3 uppercase tracking-wider">
                Simple Process
              </motion.p>
              <motion.h2 variants={fadeInUp} custom={1} className="text-3xl md:text-4xl font-extrabold mb-4">
                3 Steps to Your Benefits
              </motion.h2>
              <motion.div variants={fadeInUp} custom={2} className="w-16 h-1 bg-gradient-to-r from-blue-400 to-orange-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative text-center flex flex-col items-center"
                >
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[1px] bg-gradient-to-r from-stone-700 to-stone-800" />
                  )}

                  <div className="w-24 h-24 rounded-2xl bg-stone-800/80 border border-stone-700/50 flex items-center justify-center mb-6 relative">
                    <span className="text-3xl font-black text-blue-400/50">{step.step}</span>
                    <div className="absolute inset-0 rounded-2xl bg-blue-500/5 border border-blue-500/20" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-stone-400 max-w-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <Link to="/check-eligibility">
                <Button variant="accent" size="xl" icon={FileText}>
                  Start Your Search
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl border border-blue-100/50 p-12 md:p-16 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4">
                  Trusted by Citizens Across India
                </h2>
                <p className="text-stone-500 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                  Join thousands of Indians who have discovered welfare schemes they didn't know they qualified for. Your data stays private — we never share or store personal information.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <TrendingUp key={i} className="w-3.5 h-3.5 text-orange-400" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-500 font-medium">50,000+ happy users</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 gradient-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to Discover Your Benefits?
              </h2>
              <p className="text-stone-400 mb-8 text-lg">
                It takes just 2 minutes. No sign-up required.
              </p>
              <Link to="/check-eligibility">
                <Button variant="accent" size="xl" iconRight={ArrowRight}>
                  Check Eligibility Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Home;
