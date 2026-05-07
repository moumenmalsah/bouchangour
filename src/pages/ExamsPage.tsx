import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Download, Calendar, GraduationCap, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const examArchives = [
  {
    courseTitle: "Mathématiques 1",
    level: "DUT — GMC S1",
    institution: "ESTO",
    year: "2024/2025",
    exams: [
      { examType: "Examen Final — Session Normale", fileType: "PDF", fileSize: "2.4 MB", date: "Jan 2025" },
      { examType: "Examen Final — Session Rattrapage", fileType: "PDF", fileSize: "2.1 MB", date: "Feb 2025" },
      { examType: "Contrôle Continu 1", fileType: "PDF", fileSize: "1.2 MB", date: "Nov 2024" },
      { examType: "Contrôle Continu 2", fileType: "PDF", fileSize: "1.3 MB", date: "Jan 2025" },
    ],
  },
  {
    courseTitle: "Probabilités / Statistiques",
    level: "DUT — GMC S2",
    institution: "ESTO",
    year: "2024/2025",
    exams: [
      { examType: "Examen Final — Session Normale", fileType: "PDF", fileSize: "1.8 MB", date: "Jun 2025" },
      { examType: "Contrôle Continu", fileType: "PDF", fileSize: "1.1 MB", date: "Apr 2025" },
    ],
  },
  {
    courseTitle: "Recherche Opérationnelle",
    level: "Master SER — S2",
    institution: "FST Al Hoceima",
    year: "2023/2024",
    exams: [
      { examType: "Examen Final", fileType: "PDF", fileSize: "3.1 MB", date: "Jun 2024" },
      { examType: "Projet — Sujet et Grille d'évaluation", fileType: "PDF", fileSize: "1.5 MB", date: "Mar 2024" },
    ],
  },
  {
    courseTitle: "Recherche Opérationnelle",
    level: "Ingénieur GEER — S1",
    institution: "ENSA Al Hoceima",
    year: "2023/2024",
    exams: [
      { examType: "Examen Final", fileType: "PDF", fileSize: "2.8 MB", date: "Jan 2024" },
      { examType: "Contrôle Continu", fileType: "PDF", fileSize: "1.4 MB", date: "Nov 2023" },
    ],
  },
  {
    courseTitle: "Algèbre 2",
    level: "Licence SMPC — S2",
    institution: "FSO",
    year: "2020/2021",
    exams: [
      { examType: "Examen Final", fileType: "PDF", fileSize: "1.9 MB", date: "Jun 2021" },
      { examType: "Contrôle Continu", fileType: "PDF", fileSize: "1.1 MB", date: "Apr 2021" },
    ],
  },
  {
    courseTitle: "Analyse 1",
    level: "Licence SMPC — S1",
    institution: "FSO",
    year: "2020/2021",
    exams: [
      { examType: "Examen Final", fileType: "PDF", fileSize: "2.2 MB", date: "Jan 2021" },
      { examType: "Contrôle Continu", fileType: "PDF", fileSize: "1.0 MB", date: "Nov 2020" },
    ],
  },
];

export default function ExamsPage() {
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
          <span className="font-script text-4xl text-teal-500">Examens</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Exam Archives</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">Past examinations, continuous assessments, and corrections for review and preparation</p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <FileText className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Past Examinations</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {examArchives.map((archive, index) => (
              <div key={index} className="reveal-item bg-white rounded-xl border border-teal-100 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900">{archive.courseTitle}</h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                      <span className="text-xs font-serif text-teal-600">{archive.level}</span>
                      <span className="text-xs font-serif text-gray-400">{archive.institution}</span>
                    </div>
                  </div>
                  <span className="text-xs font-serif text-teal-700 bg-teal-50 px-2 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{archive.year}
                  </span>
                </div>
                <div className="space-y-2 pt-4 border-t border-teal-50">
                  {archive.exams.map((exam, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-teal-50/50 rounded-lg hover:bg-teal-100/50 transition-colors group">
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-serif text-sm text-gray-900 truncate">{exam.examType}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-serif text-teal-600 bg-white px-1.5 py-0.5 rounded">{exam.fileType}</span>
                            <span className="text-[10px] font-serif text-gray-400">{exam.fileSize}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className="text-[10px] font-serif text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />{exam.date}
                        </span>
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
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><GraduationCap className="w-7 h-7 text-white" /></div>
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
