import { useSiteData } from '../../contexts/SiteDataContext';
import {
  BookOpen,
  FileText,
  Calculator,
  Code,
  Microscope,
  Video,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router';

const sectionIcons: Record<string, typeof BookOpen> = {
  courses: BookOpen,
  exams: FileText,
  exercices: Calculator,
  tools: Code,
  research: Microscope,
  videos: Video,
  events: Calendar,
};

export default function AdminDashboard() {
  const { data } = useSiteData();

  const sections = Object.entries(data.content).map(([key, section]) => ({
    key,
    title: section.title || key.charAt(0).toUpperCase() + key.slice(1),
    count: section.items.length,
    icon: sectionIcons[key] || BookOpen,
  }));

  const totalItems = sections.reduce((sum, s) => sum + s.count, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="font-serif text-sm text-gray-500 mt-1">
          Manage all site content from one place
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-bold text-gray-900">{data.navLinks.length}</p>
          <p className="text-xs font-serif text-gray-500 mt-1">Menu Links</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-bold text-gray-900">{sections.length}</p>
          <p className="text-xs font-serif text-gray-500 mt-1">Content Sections</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
          <p className="text-xs font-serif text-gray-500 mt-1">Total Items</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-bold text-teal-700">{totalItems}</p>
          <p className="text-xs font-serif text-gray-500 mt-1">Published</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <Link
              key={section.key}
              to={`/idaraton/${section.key}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-teal-200 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                  <Icon className="w-5 h-5 text-teal-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-sm font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{section.count} items</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500 transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
