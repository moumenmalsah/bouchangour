import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FlaskConical, BookOpen, ExternalLink, Presentation, Award, GraduationCap, Users, FolderOpen } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

gsap.registerPlugin(ScrollTrigger);

interface ResearchData {
  id: string;
  title: string;
  link: string;
}

const researchThemes = [
  "Linear and Non-linear Preserver Problems",
  "Operator Theory & Spectral Theory",
  "Theory of Inequalities",
  "Functional Analysis",
];

const communications = [
  { title: "Some refinements of real power inequalities for (p,h)-convex functions via weak sub-majorization", event: "3rd edition JIAMA'25", location: "ENSA, El Hoceima", date: "20-21 May 2025" },
  { title: "Improved Jensen's Type Inequality For (p,h)-Convex Functions Via Weak Sub-Majorization", event: "IC3M-25, Second Edition", location: "FP, Nador", date: "15-17 May 2025" },
  { title: "Sur la théory des inégalités", event: "Séminaire LIABM", location: "Oujda", date: "16 May 2025" },
  { title: "Pairs of maps preserving ascent or descent of product of operators", event: "17th Journées Préservateurs Linéaires", location: "FS, Oujda", date: "6-7 Dec 2024" },
  { title: "Maps preserving multiplicatively ascent or descent of product of operators", event: "17th Meeting NOTA", location: "FS, Meknès", date: "27-28 Sep 2024" },
  { title: "Further refinements of real power form inequalities for convex functions via Weak sub-majorization", event: "2nd Hybrid Conference AI & Applied Math", location: "FST, Al-Hoceima", date: "11 May 2024" },
  { title: "Some refinements of real power form inequalities for convex functions via weak sub-majorization", event: "Pi-Day'2024", location: "ENSA, Al Hoceima", date: "5 Mar 2024" },
  { title: "New inequalities for (p,h)-convex functions for τ-measurable operators", event: "1st Hybrid Scientific Day AI & Applied Math", location: "ENSA, Al Hoceima", date: "4 May 2023" },
  { title: "Non-linear maps preserving multiplicatively the local spectral subspace", event: "16th National Meeting Spectral Theory", location: "FS, El Jadida", date: "24-26 Nov 2022" },
  { title: "Maps preserving the local spectral subspace of product or Jordan triple product of operators", event: "4th National Meeting IC3M", location: "FP, Nador", date: "20-22 May 2021" },
];

export default function ResearchPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data } = useSiteData();

  const pubItems = data.content.research?.items || [];
  const publications = pubItems as unknown as ResearchData[];

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
  }, [publications]);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-12 bg-teal-50/50 academic-pattern">
        <div className="section-padding max-w-6xl mx-auto text-center">
          <span className="font-script text-4xl text-teal-500">Recherche</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Research & Publications</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">Research in Functional Analysis, Spectral Theory, Operator Preservers, and Mathematical Inequalities</p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-8 reveal-item">
            <FlaskConical className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Research Themes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {researchThemes.map((theme, index) => (
              <div key={index} className="reveal-item bg-white rounded-xl border border-teal-100 p-5 hover:border-teal-300 hover:shadow-md transition-all text-center">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3"><Award className="w-5 h-5 text-teal-700" /></div>
                <p className="font-serif text-sm font-semibold text-gray-900">{theme}</p>
              </div>
            ))}
          </div>
          <div className="reveal-item mt-8 bg-teal-50/50 rounded-xl p-6 border border-teal-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-serif text-base font-bold text-gray-900 mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-teal-600" />Affiliations</h3>
                <ul className="space-y-2">
                  <li className="font-serif text-sm text-gray-700">Laboratoire Ibn Al Banna des Mathématiques (LIABM), FSO</li>
                  <li className="font-serif text-sm text-gray-700">Association Marocaine de Mathématiques et IA</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-gray-900 mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-teal-600" />Reviewer Roles</h3>
                <ul className="space-y-2">
                  <li className="font-serif text-sm text-gray-700">Reviewer — <em>Heliyon</em></li>
                  <li className="font-serif text-sm text-gray-700">Reviewer — <em>Italian Journal of Pure and Applied Mathematics</em></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8 reveal-item">
            <BookOpen className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Publications</h2>
            <span className="text-xs font-serif text-teal-600 bg-teal-50 px-2 py-1 rounded-full">{publications.length} papers</span>
          </div>

          {publications.length === 0 ? (
            <div className="reveal-item text-center py-16">
              <FolderOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="font-serif text-gray-400">No publications available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {publications.map((pub, index) => (
                <div key={pub.id || index} className="reveal-item group bg-white rounded-xl border border-teal-100 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <FlaskConical className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <h3 className="font-serif text-sm font-semibold text-gray-900 leading-snug group-hover:text-teal-700 transition-colors">{pub.title}</h3>
                  </div>
                  {pub.link && (
                    <div className="ml-8 pt-3 border-t border-teal-50">
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-serif text-teal-500 hover:text-teal-700 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                        <span className="truncate">{pub.link}</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8 reveal-item">
            <Presentation className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Communications & Conferences</h2>
          </div>
          <div className="space-y-4">
            {communications.map((comm, index) => (
              <div key={index} className="reveal-item flex flex-col sm:flex-row gap-4 bg-white rounded-xl p-5 border border-teal-100 hover:border-teal-300 hover:shadow-sm transition-all duration-300">
                <div className="flex-shrink-0"><div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center"><Presentation className="w-5 h-5 text-teal-600" /></div></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-sm font-semibold text-gray-900 leading-snug">{comm.title}</h3>
                  <p className="font-serif text-xs text-teal-600 mt-1">{comm.event}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2"><span className="text-xs text-gray-500 font-serif">{comm.location}</span><span className="text-xs text-gray-400 font-serif">{comm.date}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal-item bg-teal-700 rounded-2xl p-8 lg:p-10 text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><GraduationCap className="w-7 h-7 text-white" /></div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">Research Collaboration</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">Open to research collaborations in functional analysis, operator theory, and mathematical inequalities. Doctoral students and researchers interested in preserver problems or spectral theory are welcome to reach out for joint projects and scientific discussions.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
