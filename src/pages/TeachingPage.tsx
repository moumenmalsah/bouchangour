import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, GraduationCap, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teaching = [
  { institution: "École Supérieure de Technologie d'Oujda", role: "Cours et travaux dirigés", program: "DUT — Génie Mécatronique (GMC)", period: "2024/2025", courses: ["Mathématiques Appliquées Probabilités/Statistiques (S2)", "Mathématiques 1 (S1)"] },
  { institution: "Ministère de l'Éducation Nationale", role: "Professeur de Mathématiques", program: "Collège / Lycée", period: "2021 — Present", courses: ["Lycée collégial de Laatamna, Berkane", "Lycée collégial de Trougout, Driouch"] },
  { institution: "Faculté des Sciences et Techniques Al Hoceima", role: "Cours, TD & TP", program: "Master — Systèmes Embarqués et Robotics (SER)", period: "2023/2024", courses: ["Recherche Opérationnelle (S2)"] },
  { institution: "École Nationale des Sciences Appliquées Al Hoceima", role: "Cours, TD & TP", program: "Cycle d'Ingénieur — GEER", period: "2023/2024", courses: ["Recherche Opérationnelle (S1)"] },
  { institution: "Faculté des Sciences d'Oujda", role: "Travaux dirigés", program: "Licence — SMPC", period: "2020/2021", courses: ["Algèbre 2, Algèbre 1, Analyse 1"] },
  { institution: "Centre d'Études et de Recherche Humaines et Sociales d'Oujda", role: "Enseignant formateur", program: "Formation continue", period: "April 2019", courses: ["Initiation à Matlab"] },
];

export default function TeachingPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.reveal-item');
      if (items) {
        gsap.fromTo(items, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-12 bg-teal-50/50 academic-pattern">
        <div className="section-padding max-w-6xl mx-auto text-center">
          <span className="font-script text-4xl text-teal-500">Expérience</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Teaching Experience</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">
            Teaching positions across universities, engineering schools, technology institutes, and the Ministry of National Education
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <BookOpen className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Teaching Positions</h2>
          </div>
          <div className="space-y-6">
            {teaching.map((item, index) => (
              <div key={index} className="reveal-item bg-white rounded-xl border border-teal-100 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-7 h-7 text-teal-700" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-lg font-bold text-gray-900">{item.institution}</h3>
                      <span className="text-xs font-serif text-teal-700 bg-teal-50 px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{item.period}
                      </span>
                    </div>
                    <p className="font-serif text-sm text-teal-700 mb-1">{item.role}</p>
                    <p className="font-serif text-xs text-gray-500 mb-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{item.program}
                    </p>
                    <div className="mt-3 pt-3 border-t border-teal-50">
                      <p className="text-xs font-serif text-gray-500 mb-2">Courses taught:</p>
                      <ul className="space-y-1">
                        {item.courses.map((course, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm font-serif text-gray-700">
                            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />{course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal-item bg-teal-700 rounded-2xl p-8 lg:p-10 text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">Teaching Philosophy</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">
                Mathematics is not about memorization — it is about understanding patterns and building intuition.
                Through courses delivered at ESTO, FST Al Hoceima, ENSA Al Hoceima, FSO, CERHSO, and the Ministry of Education,
                the goal is to bridge theory with application, preparing students for both academic research and engineering practice.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
