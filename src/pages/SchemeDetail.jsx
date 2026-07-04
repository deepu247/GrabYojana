import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ShieldAlert, CheckCircle2, ChevronRight, FileText, Clock, Share2, Bookmark, AlertTriangle } from 'lucide-react';
import API from '../services/api';
import Button from '../components/Button';
import Badge from '../components/Badge';
import PageWrapper from '../components/PageWrapper';

const tagColorMap = {
  'Agriculture': 'success',
  'Education': 'primary',
  'Scholarship': 'info',
  'Women': 'warning',
  'Housing': 'danger',
  'Employment': 'info',
  'Financial Assistance': 'warning',
  'General Welfare': 'default',
  'SC/ST': 'primary',
};

const SchemeDetail = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchScheme = async () => {
      try {
        const response = await API.get(`/api/schemes/${id}`);
        setScheme(response.data.scheme);
      } catch (err) {
        console.error('Failed to fetch scheme:', err);
        setScheme(null);
      } finally {
        setLoading(false);
      }
    };
    fetchScheme();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-stone-400 font-medium text-sm">Loading scheme details...</p>
        </div>
      </div>
    );
  }

  if (!scheme) {
    return (
      <PageWrapper>
        <div className="min-h-screen pt-32 text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-stone-300" />
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Scheme Not Found</h2>
          <p className="text-stone-500 mb-6">The scheme you're looking for doesn't exist or has been removed.</p>
          <Link to="/results">
            <Button variant="primary" icon={ArrowLeft}>Go Back</Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="bg-stone-50 min-h-screen pt-16 pb-20">

        <div className="gradient-dark border-b border-stone-800 pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <Link
                to="/results"
                className="text-stone-400 hover:text-white flex items-center gap-2 font-medium mb-6 transition-colors w-max text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back to matches
              </Link>

              <div className="flex flex-wrap gap-2 mb-5">
                {scheme.tags.map((tag) => (
                  <Badge key={tag} color={tagColorMap[tag] || 'default'} size="md">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
                {scheme.title}
              </h1>

              <p className="text-lg text-stone-300 max-w-3xl leading-relaxed">
                {scheme.description}
              </p>

              <div className="flex items-center gap-3 mt-8">
                <button className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/50 text-stone-400 hover:text-white hover:bg-stone-700 transition-all" aria-label="Share">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/50 text-stone-400 hover:text-orange-400 hover:bg-stone-700 transition-all" aria-label="Bookmark">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-7 rounded-xl shadow-sm border border-stone-100"
              >
                <h2 className="text-xl font-bold text-stone-900 mb-5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="text-emerald-500 w-4 h-4" />
                  </div>
                  Key Benefits
                </h2>
                <ul className="space-y-3.5">
                  {scheme.benefits.map((ben, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-stone-600 leading-relaxed">{ben}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-7 rounded-xl shadow-sm border border-stone-100"
              >
                <h2 className="text-xl font-bold text-stone-900 mb-5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                    <ShieldAlert className="text-orange-500 w-4 h-4" />
                  </div>
                  Eligibility Criteria
                </h2>
                <ul className="space-y-3.5">
                  {scheme.criteria.map((crit, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="flex items-start gap-3 text-stone-600"
                    >
                      <ChevronRight className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                      <span className="leading-relaxed">{crit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-7 rounded-xl shadow-sm border border-stone-100"
              >
                <h2 className="text-xl font-bold text-stone-900 mb-5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FileText className="text-blue-500 w-4 h-4" />
                  </div>
                  How to Apply
                </h2>
                <div className="relative ml-4 space-y-6 pb-2">
                  <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-200 via-blue-100 to-transparent" />

                  {scheme.steps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.08 }}
                      className="relative pl-10"
                    >
                      <div className="absolute left-0 top-0.5 w-6 h-6 bg-blue-50 border-2 border-blue-400 rounded-full flex items-center justify-center text-blue-700 font-bold text-[10px]">
                        {idx + 1}
                      </div>
                      <p className="text-stone-600 font-medium leading-relaxed">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-xl shadow-xl shadow-stone-200/50 border border-stone-100 p-6"
              >
                <div className="pb-5 border-b border-stone-100 mb-5">
                  <div className="flex items-center gap-2 text-stone-400 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> Application Deadline
                  </div>
                  <span className="text-xl font-extrabold text-stone-900">{scheme.deadline}</span>
                </div>

                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg" fullWidth iconRight={ExternalLink}>
                    Apply on Official Portal
                  </Button>
                </a>

                <p className="text-[11px] text-stone-400 text-center mt-3 flex items-center justify-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Redirects to an external government website.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-100 p-5"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm mb-1">Keep Documents Ready</h4>
                    <p className="text-xs text-blue-700/80 leading-relaxed">
                      Have your Aadhaar Card, PAN, Income Certificate, and relevant category certificates handy before starting.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-100 p-5"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-900 text-sm mb-1">Quick Tip</h4>
                    <p className="text-xs text-orange-700/80 leading-relaxed">
                      Apply before the deadline. Late applications are never accepted. Save your reference number for tracking.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SchemeDetail;
