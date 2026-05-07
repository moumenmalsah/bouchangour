import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  { name: "Azure: Create a Virtual Machine and Deploy a Web Server", provider: "Coursera Project Network", date: "July 2025" },
  { name: "Introduction to Cyber Attacks", provider: "New York University", date: "February 2024" },
  { name: "Data Science Math Skills", provider: "Duke University", date: "January 2023" },
  { name: "Mathematics for Computer Science", provider: "University of London Goldsmiths", date: "August 2022" },
  { name: "Introduction to Bash Shell Scripting", provider: "Coursera Project Network", date: "August 2022" },
  { name: "Command Line in Linux", provider: "Coursera Project Network", date: "August 2022" },
  { name: "Introduction to Big Data", provider: "University of California San Diego", date: "August 2021" },
];

export default function CertificationsPage() {
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
          <span className="font-script text-4xl text-teal-500">Développement</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Continuing Education</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">
            Professional development courses, certifications, and continuing education across technology, data science, and pedagogy
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <Award className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Certifications & Training</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="reveal-item bg-white rounded-xl border border-teal-100 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-teal-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm font-semibold text-gray-900 leading-snug">{cert.name}</h3>
                    <p className="font-serif text-xs text-teal-600 mt-1">{cert.provider}</p>
                    <span className="text-xs font-serif text-gray-400 mt-2 inline-block">{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal-item bg-teal-700 rounded-2xl p-8 lg:p-10 text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">Commitment to Lifelong Learning</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">
                Continuous professional development in technology, data science, cybersecurity, and pedagogy ensures that teaching methods and course content remain current and relevant.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
