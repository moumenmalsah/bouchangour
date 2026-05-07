import { Mail, Phone, MapPin, ExternalLink, BookOpen } from 'lucide-react';
import { Link } from 'react-router';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Exams', href: '/exams' },
  { label: 'Exercices', href: '/exercices' },
  { label: 'Tools & Softwares', href: '/tools' },
  { label: 'Research & Publications', href: '/research' },
  { label: 'Video & Tutorials', href: '/videos' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Teaching', href: '/teaching' },
];

export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white">
      <div className="section-padding py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-script text-3xl text-teal-200">Contact</h3>
            <div className="space-y-4">
              <a href="mailto:bouchangour.mohammed@gmail.com" className="flex items-center gap-3 text-teal-100 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-teal-300 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-serif">bouchangour.mohammed@gmail.com</span>
              </a>
              <a href="mailto:m.bouchangour@ump.ac.ma" className="flex items-center gap-3 text-teal-100 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-teal-300 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-serif">m.bouchangour@ump.ac.ma</span>
              </a>
              <div className="flex items-center gap-3 text-teal-100">
                <Phone className="w-4 h-4 text-teal-300" />
                <span className="text-sm font-serif">+212 6 15 23 48 73</span>
              </div>
              <div className="flex items-start gap-3 text-teal-100">
                <MapPin className="w-4 h-4 text-teal-300 mt-0.5" />
                <span className="text-sm font-serif">Oujda, Morocco</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-script text-3xl text-teal-200">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
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
              <div className="flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-teal-300 mt-1" />
                <div>
                  <p className="text-sm font-serif text-white">Laboratoire Ibn Al Banna des Mathématiques (LIABM)</p>
                  <p className="text-xs text-teal-300 mt-1">Faculté des Sciences d&apos;Oujda</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-teal-300 mt-1" />
                <div>
                  <p className="text-sm font-serif text-white">Association Marocaine de Mathématiques et Intelligence Artificielle</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-teal-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-teal-300 font-serif">&copy; {new Date().getFullYear()} Dr. Bouchangour Mohammed. All rights reserved.</p>
            <p className="text-xs text-teal-300 font-serif">Université Mohammed Premier — Oujda, Morocco</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
