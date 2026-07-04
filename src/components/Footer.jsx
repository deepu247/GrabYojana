import { Link } from 'react-router-dom';
import { Landmark, Mail, Phone, MapPin, Heart, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Check Eligibility', path: '/check-eligibility' },
  ];

  return (
    <footer className="relative overflow-hidden">
      <div className="bg-stone-950 pt-16 pb-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-14">
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-5 group">
                <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center">
                  <Landmark className="h-5 w-5 text-white" />
                </div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Grab<span className="text-blue-400">Yojana</span>
                </span>
              </Link>
              <p className="text-sm text-stone-400 leading-relaxed mb-6">
                Empowering Indian citizens to discover government schemes they truly qualify for. Smart matching, verified data, zero hassle.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-stone-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact Us</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-800/80 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-stone-400">support@grabyojana.in</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-800/80 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-stone-400">1800-123-4567 (Toll Free)</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-800/80 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <div>
                    <span className="text-stone-400">KCC Institutes, Greater Noida, UP 201306</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-stone-500">
              © {currentYear} GrabYojana. All rights reserved.
            </p>
            <p className="text-sm text-stone-500 flex items-center gap-1.5">
              Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for Citizens of India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
