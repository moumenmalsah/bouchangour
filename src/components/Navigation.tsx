import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, GraduationCap } from 'lucide-react';

const links = [
  { path: '/', label: 'Home' },
  { path: '/courses', label: 'Courses' },
  { path: '/exams', label: 'Exams' },
  { path: '/exercices', label: 'Exercices' },
  { path: '/tools', label: 'Tools & Softwares' },
  { path: '/research', label: 'Research & Publications' },
  { path: '/videos', label: 'Video & Tutorials' },
  { path: '/certifications', label: 'Certifications' },
  { path: '/teaching', label: 'Teaching' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-teal-100' : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <GraduationCap className="w-7 h-7 text-teal-600 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-serif text-sm lg:text-base font-bold tracking-wide text-teal-700">
              Dr. Bouchangour
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-serif tracking-wide transition-all duration-300 rounded-full ${
                  isActive(link.path)
                    ? 'text-teal-700 bg-teal-50'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50/50'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-teal-100 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="section-padding py-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-3 text-sm font-serif rounded-lg transition-colors ${
                isActive(link.path)
                  ? 'text-teal-700 bg-teal-50 font-semibold'
                  : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
