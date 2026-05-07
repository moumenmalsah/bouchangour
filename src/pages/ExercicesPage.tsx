import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, Download, Lightbulb, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const exerciseSets = [
  {
    course: "Mathématiques 1",
    level: "DUT — GMC S1",
    series: [
      { title: "Série 1 — Espaces vectoriels", description: "Définitions, sous-espaces, bases, dimension. 12 exercices progressifs.", exercises: 12, hasSolution: true, fileSize: "1.4 MB" },
      { title: "Série 2 — Applications linéaires", description: "Noyau, image, rang, matrices d'application. 10 exercices.", exercises: 10, hasSolution: true, fileSize: "1.2 MB" },
      { title: "Série 3 — Analyse réelle", description: "Limites, continuité, dérivabilité. 15 exercices avec corrigés détaillés.", exercises: 15, hasSolution: true, fileSize: "1.8 MB" },
      { title: "Série 4 — Séries numériques", description: "Convergence, critères de comparaison, séries alternées. 10 exercices.", exercises: 10, hasSolution: true, fileSize: "1.1 MB" },
    ],
  },
  {
    course: "Probabilités / Statistiques",
    level: "DUT — GMC S2",
    series: [
      { title: "Série 1 — Probabilités discrètes", description: "Dénombrement, probabilités conditionnelles, indépendance. 14 exercices.", exercises: 14, hasSolution: true, fileSize: "1.3 MB" },
      { title: "Série 2 — Variables aléatoires discrètes", description: "Lois usuelles, espérance, variance. 12 exercices.", exercises: 12, hasSolution: true, fileSize: "1.2 MB" },
      { title: "Série 3 — Variables aléatoires continues", description: "Densité, loi normale, convergence. 11 exercices.", exercises: 11, hasSolution: true, fileSize: "1.1 MB" },
      { title: "Série 4 — Statistique inférentielle", description: "Estimation, intervalles de confiance, tests d'hypothèses. 10 exercices.", exercises: 10, hasSolution: true, fileSize: "1.4 MB" },
    ],
  },
  {
    course: "Recherche Opérationnelle",
    level: "Master / Ingénieur",
    series: [
      { title: "Série 1 — Programmation linéaire", description: "Modélisation, méthode graphique, simplexe. 8 exercices.", exercises: 8, hasSolution: true, fileSize: "1.5 MB" },
      { title: "Série 2 — Optimisation combinatoire", description: "Problèmes NP-difficiles, heuristiques. 6 exercices.", exercises: 6, hasSolution: true, fileSize: "1.2 MB" },
      { title: "Série 3 — Graphes et réseaux", description: "Plus court chemin, flots maximaux, arbres couvrants. 9 exercices.", exercises: 9, hasSolution: true, fileSize: "1.3 MB" },
    ],
  },
  {
    course: "Algèbre & Analyse",
    level: "Licence SMPC",
    series: [
      { title: "Série 1 — Espaces vectoriels et matrices", description: "Réduction, diagonalisation, formes quadratiques. 16 exercices.", exercises: 16, hasSolution: true, fileSize: "2.1 MB" },
      { title: "Série 2 — Intégration", description: "Intégrales multiples, changement de variables. 12 exercices.", exercises: 12, hasSolution: true, fileSize: "1.6 MB" },
      { title: "Série 3 — Suites et séries", description: "Convergence, critères, sommation. 14 exercices.", exercises: 14, hasSolution: true, fileSize: "1.4 MB" },
    ],
  },
];

export default function ExercicesPage() {
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
          <span className="font-script text-4xl text-teal-500">Exercices</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Problem Sets & Exercises</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">Curated exercises with detailed solutions, hints, and step-by-step corrections for each course</p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <Calculator className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Exercise Collections</h2>
          </div>
          <div className="space-y-8">
            {exerciseSets.map((set, index) => (
              <div key={index} className="reveal-item bg-white rounded-xl border border-teal-100 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center"><Calculator className="w-6 h-6 text-teal-700" /></div>
                  <div><h3 className="font-serif text-lg font-bold text-gray-900">{set.course}</h3><span className="text-xs font-serif text-teal-600">{set.level}</span></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {set.series.map((serie, i) => (
                    <div key={i} className="flex flex-col p-4 bg-teal-50/50 rounded-lg hover:bg-teal-100/50 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-serif text-sm font-semibold text-gray-900">{serie.title}</h4>
                        {serie.hasSolution && (
                          <span className="text-[10px] font-serif text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded flex items-center gap-1 flex-shrink-0">
                            <CheckCircle className="w-3 h-3" />Corrigé
                          </span>
                        )}
                      </div>
                      <p className="font-serif text-xs text-gray-500 mb-3 flex-1">{serie.description}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-teal-100/50">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-serif text-gray-400">{serie.exercises} exercices</span>
                          <span className="text-[10px] font-serif text-gray-400">{serie.fileSize}</span>
                        </div>
                        <button className="text-teal-600 hover:text-teal-800 transition-colors"><Download className="w-4 h-4" /></button>
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
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><Lightbulb className="w-7 h-7 text-white" /></div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">How to Use These Exercises</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">Attempt each exercise independently before consulting the solution. The exercises are ordered by increasing difficulty. Understanding the reasoning behind each step is more important than arriving at the final answer.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
