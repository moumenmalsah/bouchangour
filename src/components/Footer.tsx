import { Mail, MapPin, ExternalLink, BookOpen } from 'lucide-react';
import { Link } from 'react-router';
import { useSiteData } from '../contexts/SiteDataContext';

export default function Footer() {
  const { data } = useSiteData();
  const { footer } = data;
  const quickLinks = data.navLinks.filter(l => l.path !== '/idaraton');
  return (
    <footer className="bg-teal-700 text-white">
      <div className="section-padding py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-script text-3xl text-teal-200">Contact</h3>
            <div className="space-y-4">
              {footer.emails.map((email, i) => (
                <a key={i} href={`mailto:${email}`} className="flex items-center gap-3 text-teal-100 hover:text-white transition-colors group">
                  <Mail className="w-4 h-4 text-teal-300 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-serif">{email}</span>
                </a>
              ))}
              <div className="flex items-start gap-3 text-teal-100">
                <MapPin className="w-4 h-4 text-teal-300 mt-0.5" />
                <span className="text-sm font-serif">{footer.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-script text-3xl text-teal-200">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-2 text-sm font-serif text-teal-100 hover:text-white transition-colors group"
                >
                  <ExternalLink className="w-3 h-3 text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Affiliations */}
          <div className="space-y-6">
            <h3 className="font-script text-3xl text-teal-200">Affiliations</h3>
            <div className="space-y-4">
              {footer.affiliations.map((aff, i) => (
                <div key={i} className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-teal-300 mt-1" />
                  <div>
                    <p className="text-sm font-serif text-white">{aff.name}</p>
                    {aff.description && (
                      <p className="text-xs text-teal-300 mt-1">{aff.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-teal-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-teal-300 font-serif">&copy; {new Date().getFullYear()} {footer.copyright} Designé et développé avec ❤️ par <a href="https://www.facebook.com/ProfMalsahMoumen">ProfMoumenMalsah</a>
</p>
            <p className="text-xs text-teal-300 font-serif">{footer.location}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
