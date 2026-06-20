import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, ExternalLink, FolderOpen, GraduationCap, Layers, FileText } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

gsap.registerPlugin(ScrollTrigger);

interface Series {
  name: string;
  pdfLink: string;
}

interface ExerciceData {
  id: string;
  name: string;
  level: string;
  series: Series[];
}

export default function ExercicesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data } = useSiteData();

  const exerciceItems = data.content.exercices?.items || [];
  const exerciseSets = exerciceItems as unknown as ExerciceData[];

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
  }, [exerciseSets]);

  const totalSeries = exerciseSets.reduce((sum, s) => sum + (s.series?.length || 0), 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-12 bg-teal-50/50 academic-pattern">
        <div className="section-padding max-w-6xl mx-auto text-center">
          <span className="font-script text-4xl text-teal-500">Exercices</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Problem Sets & Exercises</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">
            {exerciseSets.length > 0
              ? `${exerciseSets.length} courses — ${totalSeries} series available for download`
              : 'Curated exercises with detailed solutions, hints, and step-by-step corrections for each course'}
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <Calculator className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Exercise Collections</h2>
          </div>

          {exerciseSets.length === 0 ? (
            <div className="reveal-item text-center py-16">
              <FolderOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="font-serif text-gray-400">No exercises available yet.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {exerciseSets.map((set, index) => (
                <div key={set.id || index} className="reveal-item bg-white rounded-xl border border-teal-100 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-teal-700" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-gray-900">{set.name}</h3>
                      <span className="inline-flex items-center gap-1 text-xs font-serif text-teal-600">
                        <Layers className="w-3 h-3" />
                        {set.level}
                      </span>
                    </div>
                  </div>

                  {set.series && set.series.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {set.series.map((serie, i) => (
                        <a
                          key={i}
                          href={serie.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col p-4 bg-teal-50/50 rounded-lg hover:bg-teal-100/50 transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-serif text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                              {serie.name || `Series ${i + 1}`}
                            </h4>
                            <span className="text-[10px] font-serif text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded flex items-center gap-1 flex-shrink-0">
                              <FileText className="w-3 h-3" />PDF
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-teal-100/50 mt-auto">
                            <span className="text-[10px] font-serif text-gray-400">Open PDF</span>
                            <ExternalLink className="w-3.5 h-3.5 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">No series available yet.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="reveal-item bg-teal-700 rounded-2xl p-8 lg:p-10 text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
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
