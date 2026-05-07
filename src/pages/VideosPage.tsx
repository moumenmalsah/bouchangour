import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Video, Play, Clock, GraduationCap, BookOpen, Monitor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const videoCategories = [
  {
    category: "Mathématiques 1",
    icon: BookOpen,
    videos: [
      { title: "Introduction aux espaces vectoriels", duration: "18 min", level: "Débutant" },
      { title: "Bases et dimension — Exemples détaillés", duration: "24 min", level: "Débutant" },
      { title: "Applications linéaires — Noyau et Image", duration: "22 min", level: "Intermédiaire" },
      { title: "Matrices et changement de base", duration: "20 min", level: "Intermédiaire" },
      { title: "Séries numériques — Critères de convergence", duration: "28 min", level: "Intermédiaire" },
      { title: "Équations différentielles linéaires", duration: "26 min", level: "Avancé" },
    ],
  },
  {
    category: "Probabilités / Statistiques",
    icon: BookOpen,
    videos: [
      { title: "Introduction aux probabilités", duration: "16 min", level: "Débutant" },
      { title: "Variables aléatoires discrètes — Lois usuelles", duration: "25 min", level: "Intermédiaire" },
      { title: "Variables aléatoires continues — Loi normale", duration: "23 min", level: "Intermédiaire" },
      { title: "Estimation ponctuelle et par intervalle", duration: "30 min", level: "Avancé" },
      { title: "Tests d'hypothèses — Méthodologie", duration: "27 min", level: "Avancé" },
    ],
  },
  {
    category: "Recherche Opérationnelle",
    icon: BookOpen,
    videos: [
      { title: "Introduction à la RO — Modélisation", duration: "20 min", level: "Débutant" },
      { title: "Programmation linéaire — Méthode graphique", duration: "22 min", level: "Débutant" },
      { title: "L'algorithme du Simplexe", duration: "35 min", level: "Intermédiaire" },
      { title: "Problèmes de transport et d'affectation", duration: "28 min", level: "Intermédiaire" },
      { title: "Graphes — Plus court chemin (Dijkstra)", duration: "24 min", level: "Intermédiaire" },
      { title: "Flot maximal et coupe minimale", duration: "26 min", level: "Avancé" },
    ],
  },
  {
    category: "MATLAB & Computing",
    icon: Monitor,
    videos: [
      { title: "MATLAB — Interface et premiers pas", duration: "15 min", level: "Débutant" },
      { title: "Manipulation des matrices et vecteurs", duration: "18 min", level: "Débutant" },
      { title: "Graphiques 2D et 3D avec MATLAB", duration: "20 min", level: "Intermédiaire" },
      { title: "Scripts et fonctions MATLAB", duration: "22 min", level: "Intermédiaire" },
      { title: "Résolution numérique d'équations", duration: "25 min", level: "Avancé" },
    ],
  },
];

export default function VideosPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.reveal-item');
      if (items) {
        gsap.fromTo(items, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out',
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
          <span className="font-script text-4xl text-teal-500">Vidéos</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Video & Tutorials</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">Recorded lectures, step-by-step tutorials, and video guides for all courses and software tools</p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <Video className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Video Library</h2>
          </div>
          <div className="space-y-8">
            {videoCategories.map((cat, index) => (
              <div key={index} className="reveal-item bg-white rounded-xl border border-teal-100 overflow-hidden">
                <div className="p-5 bg-teal-50/50 border-b border-teal-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <cat.icon className="w-5 h-5 text-teal-700" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-gray-900">{cat.category}</h3>
                      <span className="text-xs font-serif text-teal-600">{cat.videos.length} videos</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cat.videos.map((video, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-teal-50/30 rounded-lg hover:bg-teal-100/40 transition-colors group cursor-pointer">
                      <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-700 transition-colors">
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-semibold text-gray-900 truncate group-hover:text-teal-700 transition-colors">{video.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-serif text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{video.duration}</span>
                          <span className={`text-[10px] font-serif px-1.5 py-0.5 rounded ${video.level === 'Débutant' ? 'text-green-700 bg-green-50' : video.level === 'Intermédiaire' ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50'}`}>{video.level}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal-item bg-teal-700 rounded-2xl p-8 lg:p-10 text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><GraduationCap className="w-7 h-7 text-white" /></div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">Video Learning Tips</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">Watch videos in order of increasing difficulty. Pause and work through examples alongside the video. Take notes and revisit complex sections. Combine video learning with exercises and course notes for maximum comprehension.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
