import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, GraduationCap, Clock, FileText, ExternalLink, FolderOpen } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

gsap.registerPlugin(ScrollTrigger);

interface Chapter {
  name: string;
  pdfLink: string;
}

interface CourseData {
  id: string;
  name: string;
  hours: string;
  chapters: Chapter[];
}

export default function CoursesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data } = useSiteData();

  const courseItems = data.content.courses?.items || [];
  const courses = courseItems as unknown as CourseData[];

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
  }, [courses]);

  const totalChapters = courses.reduce((sum, c) => sum + (c.chapters?.length || 0), 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-12 bg-teal-50/50 academic-pattern">
        <div className="section-padding max-w-6xl mx-auto text-center">
          <span className="font-script text-4xl text-teal-500">Cours</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Courses & Lecture Notes</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">
            {courses.length > 0
              ? `${courses.length} courses — ${totalChapters} chapters available for download`
              : 'Complete course materials, lecture notes, and syllabi for all modules taught across ESTO, FST, ENSA, and FSO'}
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <BookOpen className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Course Materials</h2>
          </div>

          {courses.length === 0 ? (
            <div className="reveal-item text-center py-16">
              <FolderOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="font-serif text-gray-400">No courses available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course, index) => (
                <div
                  key={course.id || index}
                  className="reveal-item group bg-white rounded-xl border border-teal-100 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-200 transition-colors">
                      <BookOpen className="w-6 h-6 text-teal-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                        {course.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.hours}
                      </span>
                    </div>
                  </div>

                  {course.chapters && course.chapters.length > 0 && (
                    <div className="pt-4 border-t border-teal-50 space-y-2">
                      <p className="text-xs font-serif text-gray-500 mb-2 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        Chapters ({course.chapters.length})
                      </p>
                      {course.chapters.map((chapter, chIndex) => (
                        <a
                          key={chIndex}
                          href={chapter.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 bg-teal-50/50 rounded-lg hover:bg-teal-100/50 transition-colors group/chapter"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                            <span className="font-serif text-xs text-gray-700 truncate">
                              {chapter.name || `Chapter ${chIndex + 1}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <span className="text-[10px] font-serif text-teal-600 bg-white px-1.5 py-0.5 rounded">PDF</span>
                            <ExternalLink className="w-3.5 h-3.5 text-teal-500 opacity-0 group-hover/chapter:opacity-100 transition-opacity" />
                          </div>
                        </a>
                      ))}
                    </div>
                  )}

                  {(!course.chapters || course.chapters.length === 0) && (
                    <p className="text-xs text-gray-400 italic pt-2">No chapters available yet.</p>
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
              <h3 className="font-serif text-xl font-bold mb-2">Course Access</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">
                All course materials are available for enrolled students. Click on any chapter to access the PDF via Google Drive.
                Additional resources including exercises, exam archives, video tutorials, and research papers can be found in their respective sections.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
