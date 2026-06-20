import { useNavigate } from 'react-router';
import { useAuth } from '../lib/auth-context';
import { GraduationCap, LogOut, BookOpen, FileText, Brain, Video, Award, FlaskConical } from 'lucide-react';

const sections = [
  { label: 'Courses', icon: BookOpen, path: '/courses' },
  { label: 'Exams', icon: FileText, path: '/exams' },
  { label: 'Exercices', icon: Brain, path: '/exercices' },
  { label: 'Videos', icon: Video, path: '/videos' },
  { label: 'Certifications', icon: Award, path: '/certifications' },
  { label: 'Research', icon: FlaskConical, path: '/research' },
];

export default function AdminDashboard() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/idaraton', { replace: true });
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/idaraton');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-teal-700" />
            <div>
              <h1 className="text-2xl font-serif font-bold text-teal-800">Dashboard Admin</h1>
              <p className="text-sm text-gray-500 font-serif">Gérez le contenu du site</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-sm font-serif"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <button
              key={section.path}
              onClick={() => navigate(section.path)}
              className="group bg-white rounded-xl border border-teal-100 p-6 text-left hover:shadow-lg hover:border-teal-300 transition-all"
            >
              <section.icon className="w-8 h-8 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif font-semibold text-teal-800">{section.label}</h3>
              <p className="text-sm text-gray-500 font-serif mt-1">Voir / Modifier</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
