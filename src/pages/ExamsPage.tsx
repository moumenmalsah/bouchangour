import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Calendar, GraduationCap, ExternalLink, FolderOpen } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

gsap.registerPlugin(ScrollTrigger);

interface ExamData {
  id: string;
  module: string;
  year: string;
  session: string;
  pdfLink: string;
}

export default function ExamsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data } = useSiteData();

  const examItems = data.content.exams?.items || [];
  const exams = examItems as unknown as ExamData[];

  const grouped = useMemo(() => {
    const map = new Map<string, ExamData[]>();
    for (const exam of exams) {
      const key = exam.module;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(exam);
    }
    return Array.from(map.entries()).map(([module, items]) => ({
      module,
      items: items.sort((a, b) => b.year.localeCompare(a.year)),
    }));
  }, [exams]);

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
  }, [exams]);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-12 bg-teal-50/50 academic-pattern">
        <div className="section-padding max-w-6xl mx-auto text-center">
          <span className="font-script text-4xl text-teal-500">Examens</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Exam Archives</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">
            {exams.length > 0
              ? `${exams.length} exams across ${grouped.length} modules`
              : 'Past examinations, continuous assessments, and corrections for review and preparation'}
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <FileText className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Past Examinations</h2>
          </div>

          {exams.length === 0 ? (
            <div className="reveal-item text-center py-16">
              <FolderOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="font-serif text-gray-400">No exams available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {grouped.map((group, index) => (
                <div key={index} className="reveal-item bg-white rounded-xl border border-teal-100 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-gray-900">{group.module}</h3>
                      <span className="text-xs font-serif text-gray-400">{group.items.length} exam(s)</span>
                    </div>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-teal-50">
                    {group.items.map((exam, i) => (
                      <a
                        key={exam.id || i}
                        href={exam.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-teal-50/50 rounded-lg hover:bg-teal-100/50 transition-colors group/exam"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText className="w-4 h-4 text-teal-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-serif text-sm text-gray-900 truncate">
                              {exam.session || 'Exam'}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-serif text-teal-600 bg-white px-1.5 py-0.5 rounded">PDF</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <span className="text-[10px] font-serif text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />{exam.year}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-teal-500 opacity-0 group-hover/exam:opacity-100 transition-opacity" />
                        </div>
                      </a>
                    ))}
                  </div>
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
              <h3 className="font-serif text-xl font-bold mb-2">Exam Preparation Advice</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">Review past exams to understand the format and difficulty level. Practice under timed conditions. Focus on understanding the methodology rather than memorizing solutions.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
