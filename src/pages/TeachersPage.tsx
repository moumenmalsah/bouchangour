import { useSiteData, type ContentItem } from '../contexts/SiteDataContext';
import { Mail, BookOpen } from 'lucide-react';
import { Link } from 'react-router';

interface TeacherData extends ContentItem {
  name: string;
  title: string;
  email: string;
  photo: string;
  specialization: string;
}

export default function TeachersPage() {
  const { data } = useSiteData();
  const sectionData = data.content.teachers;
  const teachers = (sectionData?.items || []) as TeacherData[];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 lg:py-28 academic-pattern">
        <div className="section-padding max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-script text-3xl text-teal-500">Équipe</span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mt-2">Liste des Enseignants</h1>
          </div>

          {teachers.length === 0 ? (
            <p className="text-center font-serif text-gray-500">Aucun enseignant pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-xl border border-teal-100 overflow-hidden hover:border-teal-300 hover:shadow-md transition-all duration-300 group">
                  <div className="aspect-square bg-teal-50 overflow-hidden">
                    {teacher.photo ? (
                      <img src={teacher.photo} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-teal-100">
                        <BookOpen className="w-16 h-16 text-teal-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-serif text-lg font-bold text-gray-900">{teacher.name}</h3>
                    <p className="font-serif text-sm text-teal-700">{teacher.title}</p>
                    {teacher.specialization && (
                      <p className="font-serif text-xs text-gray-500">{teacher.specialization}</p>
                    )}
                    {teacher.email && (
                      <a href={`mailto:${teacher.email}`} className="inline-flex items-center gap-1.5 text-xs text-teal-600 hover:text-teal-800 transition-colors">
                        <Mail className="w-3 h-3" />{teacher.email}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
