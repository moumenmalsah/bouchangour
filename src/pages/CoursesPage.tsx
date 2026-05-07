import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Download, GraduationCap, Calculator, BarChart3, Sigma, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    icon: Calculator,
    title: "Mathématiques 1",
    level: "DUT — Génie Mécatronique (GMC)",
    semester: "Semestre 1",
    institution: "École Supérieure de Technologie d'Oujda",
    description: "Fondements mathématiques pour l'ingénierie: algèbre linéaire, analyse, fonctions de plusieurs variables.",
    topics: ["Algèbre linéaire", "Analyse réelle", "Séries numériques", "Équations différentielles"],
    materials: [
      { name: "Cours complet — Chapitres 1-5", type: "PDF", size: "8.5 MB" },
      { name: "Formulaire de révision", type: "PDF", size: "1.2 MB" },
      { name: "Syllabus du module", type: "PDF", size: "450 KB" },
    ],
  },
  {
    icon: BarChart3,
    title: "Probabilités / Statistiques",
    level: "DUT — Génie Mécatronique (GMC)",
    semester: "Semestre 2",
    institution: "École Supérieure de Technologie d'Oujda",
    description: "Théorie des probabilités et méthodes statistiques appliquées aux sciences de l'ingénieur.",
    topics: ["Probabilités discrètes et continues", "Variables aléatoires", "Estimation", "Tests d'hypothèses"],
    materials: [
      { name: "Cours complet — Probabilités", type: "PDF", size: "6.2 MB" },
      { name: "Cours complet — Statistiques", type: "PDF", size: "5.1 MB" },
      { name: "Table statistique de référence", type: "PDF", size: "890 KB" },
    ],
  },
  {
    icon: Sigma,
    title: "Recherche Opérationnelle",
    level: "Master / Cycle Ingénieur",
    semester: "Semestres 1 & 2",
    institution: "FST Al Hoceima / ENSA Al Hoceima",
    description: "Méthodes d'optimisation et aide à la décision pour les systèmes embarqués et énergétiques.",
    topics: ["Programmation linéaire", "Optimisation combinatoire", "Graphes et réseaux", "Métaheuristiques"],
    materials: [
      { name: "Cours RO — Partie 1: Modélisation", type: "PDF", size: "5.8 MB" },
      { name: "Cours RO — Partie 2: Algorithmes", type: "PDF", size: "4.9 MB" },
      { name: "Projet RO — Sujets et Consignes", type: "PDF", size: "1.8 MB" },
    ],
  },
  {
    icon: Layers,
    title: "Algèbre & Analyse",
    level: "Licence — SMPC",
    semester: "Semestres 1 & 2",
    institution: "Faculté des Sciences d'Oujda",
    description: "Cours et travaux dirigés en algèbre et analyse pour les sciences de la matière et sciences physiques.",
    topics: ["Espaces vectoriels", "Réduction des endomorphismes", "Suites et séries", "Intégration"],
    materials: [
      { name: "Algèbre 1 — Cours et TD", type: "PDF", size: "3.4 MB" },
      { name: "Algèbre 2 — Cours et TD", type: "PDF", size: "4.1 MB" },
      { name: "Analyse 1 — Cours et TD", type: "PDF", size: "3.8 MB" },
    ],
  },
  {
    icon: BookOpen,
    title: "Initiation à MATLAB",
    level: "Formation Continue",
    semester: "Avril 2019",
    institution: "CERHSO — Oujda",
    description: "Introduction au calcul scientifique et à la programmation avec MATLAB pour les chercheurs et étudiants.",
    topics: ["Syntaxe MATLAB", "Matrices et opérations", "Graphiques 2D/3D", "Scripts et fonctions"],
    materials: [
      { name: "Support de cours MATLAB", type: "PDF", size: "3.4 MB" },
      { name: "Exercices pratiques — Corrigés", type: "PDF", size: "2.1 MB" },
    ],
  },
  {
    icon: GraduationCap,
    title: "Topologie (SMA S5)",
    level: "Licence — SMA",
    semester: "Semestre 5",
    institution: "Faculté des Sciences d'Oujda",
    description: "Cours de topologie générale pour la licence en sciences mathématiques, co-écrit avec El Hassane El Idrissi.",
    topics: ["Espaces topologiques", "Continuité", "Connexité", "Compacité"],
    materials: [
      { name: "Cours de Topologie complet", type: "PDF", size: "4.1 MB" },
    ],
  },
];

export default function CoursesPage() {
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
          <span className="font-script text-4xl text-teal-500">Cours</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Courses & Lecture Notes</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">Complete course materials, lecture notes, and syllabi for all modules taught across ESTO, FST, ENSA, and FSO</p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <BookOpen className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Course Materials</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <div key={index} className="reveal-item group bg-white rounded-xl border border-teal-100 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-200 transition-colors">
                      <Icon className="w-6 h-6 text-teal-700" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors">{course.title}</h3>
                      <p className="font-serif text-xs text-teal-600 mt-0.5">{course.institution}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-serif text-gray-600 bg-gray-100 px-2 py-1 rounded">{course.level}</span>
                    <span className="text-xs font-serif text-teal-600 bg-teal-50 px-2 py-1 rounded">{course.semester}</span>
                  </div>
                  <p className="font-serif text-sm text-gray-600 leading-relaxed mb-4">{course.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {course.topics.map((topic, i) => (
                      <span key={i} className="text-xs font-serif text-teal-700 bg-teal-50 px-2 py-1 rounded-full">{topic}</span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-teal-50 space-y-2">
                    <p className="text-xs font-serif text-gray-500 mb-2">Available materials:</p>
                    {course.materials.map((mat, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-teal-50/50 rounded-lg hover:bg-teal-100/50 transition-colors">
                        <div className="flex items-center gap-2 min-w-0">
                          <BookOpen className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                          <span className="font-serif text-xs text-gray-700 truncate">{mat.name}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <span className="text-[10px] font-serif text-teal-600 bg-white px-1.5 py-0.5 rounded">{mat.type}</span>
                          <span className="text-[10px] font-serif text-gray-400">{mat.size}</span>
                          <button className="text-teal-600 hover:text-teal-800 transition-colors"><Download className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="reveal-item bg-teal-700 rounded-2xl p-8 lg:p-10 text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><GraduationCap className="w-7 h-7 text-white" /></div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">Course Access</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">All course materials are available for enrolled students. Additional resources including exercises, exam archives, video tutorials, and research papers can be found in their respective sections.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
