import { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Layers, RefreshCw, Bot, Zap } from 'lucide-react';
import SchemeCard from '../components/SchemeCard';
import Skeleton from '../components/Skeleton';
import AILoader from '../components/AILoader';
import Filters from '../components/Filters';
import EmptyPage from '../components/EmptyPage';
import MatchMeter from '../components/MatchMeter';
import PageWrapper from '../components/PageWrapper';
import API from '../services/api';

const makeCacheKey = (data) =>
  'ss_cache_' + btoa(JSON.stringify(Object.fromEntries(Object.entries(data).sort())));

const readCache = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const writeCache = (key, value) => {
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch { }
};

const clearCache = (key) => {
  try { sessionStorage.removeItem(key); } catch { }
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  const [loading, setLoading] = useState(true);
  const [schemes, setSchemes] = useState([]);
  const [aiPowered, setAiPowered] = useState(false);
  const [fromCache, setFromCache] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');

  const cacheKey = formData ? makeCacheKey(formData) : null;

  const fetchMatches = useCallback(async (forceRefresh = false) => {
    if (!formData) {
      navigate('/check-eligibility');
      return;
    }

    if (!forceRefresh) {
      const cached = readCache(cacheKey);
      if (cached) {
        setSchemes(cached.schemes);
        setAiPowered(cached.aiPowered);
        setFromCache(true);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setFromCache(false);
    try {
      const response = await API.post('/api/match', formData);
      const data = { schemes: response.data.schemes || [], aiPowered: response.data.aiPowered || false };
      writeCache(cacheKey, data);
      setSchemes(data.schemes);
      setAiPowered(data.aiPowered);
    } catch (err) {
      console.error('Failed to fetch matches:', err);
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  }, [formData, cacheKey, navigate]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const handleRefresh = () => {
    clearCache(cacheKey);
    fetchMatches(true);
  };

  const displaySchemes = useMemo(() => {
    let result = [...schemes];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
    }

    if (activeFilters.length > 0) {
      result = result.filter(s =>
        s.tags.some(tag => activeFilters.includes(tag))
      );
    }

    if (sortBy === 'deadline') {
      result.sort((a, b) => {
        if (a.deadline === 'Ongoing') return 1;
        if (b.deadline === 'Ongoing') return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [schemes, searchQuery, activeFilters, sortBy]);

  const avgMatch = useMemo(() => {
    if (schemes.length === 0) return 0;
    return Math.round(schemes.reduce((sum, s) => sum + (s.matchPercent || 0), 0) / schemes.length);
  }, [schemes]);

  return (
    <PageWrapper>
      <div className="bg-stone-50 min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-6 border-b border-stone-200">
            <div className="flex-1">
              <Link
                to="/check-eligibility"
                className="text-stone-400 hover:text-blue-600 flex items-center gap-2 font-medium mb-4 transition-colors w-max text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Edit My Profile
              </Link>
              <h1 className="text-3xl font-extrabold text-stone-900 mb-2">
                Your Eligible <span className="gradient-text">Schemes</span>
              </h1>
              {!loading && (
                <div className="flex flex-wrap items-center gap-2 mt-1 mb-1">
                  {aiPowered && (
                    <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wide shadow-md shadow-blue-400/30">
                      <Bot className="w-3.5 h-3.5" />
                      AI Matched
                    </div>
                  )}
                  {fromCache && (
                    <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                      <Zap className="w-3.5 h-3.5" />
                      Cached
                    </div>
                  )}
                  {fromCache && (
                    <button
                      onClick={handleRefresh}
                      className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-stone-100 text-stone-500 text-xs font-semibold hover:bg-stone-200 transition-colors border border-stone-200"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Refresh
                    </button>
                  )}
                </div>
              )}
              {!loading && (
                <p className="text-stone-500 mt-1">
                  We found <span className="font-bold text-stone-800">{displaySchemes.length}</span> schemes matching your criteria.
                </p>
              )}
            </div>

            {!loading && schemes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 lg:mt-0"
              >
                <MatchMeter percent={avgMatch} size={100} strokeWidth={8} />
              </motion.div>
            )}
          </div>

          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -transtone-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search schemes..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-stone-200 bg-white text-sm font-medium outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-stone-400"
                />
              </div>
              <Filters
                onFilter={setActiveFilters}
                onSort={setSortBy}
                activeFilters={activeFilters}
                activeSort={sortBy}
              />
            </motion.div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <AILoader />
            </div>
          ) : displaySchemes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displaySchemes.map((scheme, i) => (
                <SchemeCard
                  key={scheme._id}
                  scheme={scheme}
                  index={i}
                  matchPercent={scheme.matchPercent}
                  matchReason={scheme.matchReason}
                />
              ))}
            </div>
          ) : (
            <EmptyPage
              icon={Layers}
              title="No schemes found"
              description="We couldn't find schemes matching your current filters. Try adjusting your search or filters."
              actionLabel="Retry with different details"
              actionIcon={RefreshCw}
              onAction={() => navigate('/check-eligibility')}
            />
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Results;
