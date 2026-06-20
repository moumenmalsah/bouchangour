import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Award, GraduationCap, FlaskConical, Presentation, Code, Languages, FileText, Download, Calendar, ExternalLink, ImageIcon } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const education = [
  { year: "2018 — 2023", degree: "Doctorat en Mathématiques", institution: "Faculté des Sciences d'Oujda, Université Mohammed Premier", detail: "Thèse: Préservateurs de certains sous-espaces spectraux locaux — Mention: Très honorable avec les félicitations du jury" },
  { year: "2016 — 2018", degree: "Master en Analyse Fonctionnelle", institution: "Faculté des Sciences, Université Mohammed Premier — Oujda" },
  { year: "2011 — 2016", degree: "Licence d'Études Fondamentales en Sciences Mathématiques", institution: "Faculté des Sciences, Université Mohammed Premier — Oujda" },
  { year: "2011", degree: "Baccalauréat en Sciences Expérimentales", institution: "Option: Sciences Physiques — Lycée qualifiant Laymoune, Berkane" },
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

const skills = {
  computing: [
    "LaTeX & Beamer",
    "Microsoft Office (Word, Excel, PowerPoint)",
    "Web Development (XHTML, PHP, MySQL, JavaScript, CSS)",
    "Programming (C, C++, Python)",
    "Video Editing (Camtasia, FormatFactory)",
    "TIC & E-Learning Platforms",
  ],
  languages: [
    { name: "Arabic", level: "Native", pct: 100 },
    { name: "Amazigh", level: "Spoken", pct: 80 },
    { name: "French", level: "Fluent", pct: 90 },
    { name: "English", level: "Fluent", pct: 90 },
  ],
};

const certifications = [
  { name: "Azure: Create a Virtual Machine and Deploy a Web Server", provider: "Coursera Project Network", date: "July 2025" },
  { name: "Introduction to Cyber Attacks", provider: "New York University", date: "February 2024" },
  { name: "Data Science Math Skills", provider: "Duke University", date: "January 2023" },
  { name: "Mathematics for Computer Science", provider: "University of London Goldsmiths", date: "August 2022" },
  { name: "Introduction to Bash Shell Scripting", provider: "Coursera Project Network", date: "August 2022" },
  { name: "Command Line in Linux", provider: "Coursera Project Network", date: "August 2022" },
  { name: "Introduction to Big Data", provider: "University of California San Diego", date: "August 2021" },
];

const teaching = [
  { institution: "École Supérieure de Technologie d'Oujda", role: "Cours et travaux dirigés", program: "DUT — Génie Mécatronique (GMC)", period: "2024/2025", courses: ["Mathématiques Appliquées Probabilités/Statistiques (S2)", "Mathématiques 1 (S1)"] },
  { institution: "Ministère de l'Éducation Nationale", role: "Professeur de Mathématiques", program: "Collège / Lycée", period: "2021 — Present", courses: ["Lycée collégial de Laatamna, Berkane", "Lycée collégial de Trougout, Driouch"] },
  { institution: "Faculté des Sciences et Techniques Al Hoceima", role: "Cours, TD & TP", program: "Master — Systèmes Embarqués et Robotics (SER)", period: "2023/2024", courses: ["Recherche Opérationnelle (S2)"] },
  { institution: "École Nationale des Sciences Appliquées Al Hoceima", role: "Cours, TD & TP", program: "Cycle d'Ingénieur — GEER", period: "2023/2024", courses: ["Recherche Opérationnelle (S1)"] },
  { institution: "Faculté des Sciences d'Oujda", role: "Travaux dirigés", program: "Licence — SMPC", period: "2020/2021", courses: ["Algèbre 2, Algèbre 1, Analyse 1"] },
  { institution: "Centre d'Études et de Recherche Humaines et Sociales d'Oujda", role: "Enseignant formateur", program: "Formation continue", period: "April 2019", courses: ["Initiation à Matlab"] },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const { data } = useSiteData();
  const eventItems = data.content.events?.items || [];
  const homeEvents = (eventItems as unknown as { id: string; title: string; image: string; imagesLink: string; eventLink: string }[]).slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title-line', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo('.hero-subtitle', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 });
      gsap.fromTo('.hero-wave', { scale: 0.8, opacity: 0, rotateY: 45 }, { scale: 1, opacity: 1, rotateY: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)', delay: 0.8 });

      sectionsRef.current.forEach((section) => {
        if (!section) return;
        const items = section.querySelectorAll('.reveal-item');
        gsap.fromTo(items, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLElement | null, index: number) => { if (el) sectionsRef.current[index] = el; };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center academic-pattern overflow-hidden">
        <div className="section-padding w-full pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-4">
              <div className="overflow-hidden">
                <span className="hero-title-line font-script text-5xl sm:text-6xl lg:text-7xl text-teal-600 block leading-tight">Professor</span>
              </div>
              <div className="overflow-hidden">
                <h1 className="hero-title-line font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">in Applied Mathematics</h1>
              </div>
              <div className="overflow-hidden pt-2">
                <p className="hero-title-line font-serif text-base text-gray-600 max-w-md leading-relaxed">Doctor of Mathematics, Researcher in Functional Analysis, Spectral Theory, and Operator Inequalities</p>
              </div>
            </div>
            <div className="hero-subtitle space-y-6 lg:pl-8">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl lg:text-3xl font-bold text-teal-700">Dr. Bouchangour Mohammed</h2>
                <p className="font-serif text-sm text-gray-500">Né le 29 Janvier 1993 à Berkane, Morocco</p>
              </div>
              <p className="font-serif text-gray-700 leading-relaxed">Curriculum Vitae, Courses, Exams & Academic Resources</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#profile" className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-serif rounded-full hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg">
                  <FileText className="w-4 h-4" />View Profile
                </a>
              </div>
            </div>
          </div>
          <div className="hero-wave absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
            <svg width="300" height="80" viewBox="0 0 300 80" fill="none"><path d="M0 40C50 40 50 10 100 10C150 10 150 70 200 70C250 70 250 40 300 40" stroke="#09584c" strokeWidth="2" strokeLinecap="round" fill="none" /><circle cx="280" cy="40" r="15" stroke="#09584c" strokeWidth="2" fill="none" /></svg>
          </div>
        </div>
      </section>

      {/* Academic Profile */}
      <section id="profile" ref={(el) => addToRefs(el, 0)} className="py-20 lg:py-28 bg-white">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="reveal-item relative">
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-teal-100 rounded-2xl rotate-3" />
                <img src="/professor.jpg" alt="Dr. Bouchangour Mohammed" className="relative w-full h-full object-cover rounded-2xl shadow-xl" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-teal-500 rounded-full animate-pulse-soft" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center"><Award className="w-8 h-8 text-teal-600" /></div>
              </div>
            </div>
            <div className="reveal-item space-y-6">
              <div><span className="font-script text-3xl text-teal-500">Academic Profile</span><h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mt-2">Dr. Bouchangour Mohammed</h2></div>
              <div className="space-y-4 font-serif text-gray-700 leading-relaxed">
                <p>Dr. Bouchangour Mohammed is a Doctor of Mathematics, having earned his PhD from the Faculté des Sciences d'Oujda at Université Mohammed Premier in 2023. His doctoral research, supervised by Professeur Ali Jaatit, focused on "Préservateurs de certains sous-espaces spectraux locaux" — earning the distinction of "Très honorable avec les félicitations du jury."</p>
                <p>His research interests span linear and non-linear preserver problems, operator theory, spectral theory, and the theory of inequalities. He is an active researcher at the Laboratoire Ibn Al Banna des Mathématiques (LIABM) and a member of the Moroccan Association of Mathematics and Artificial Intelligence.</p>
                <p>He serves as a reviewer for prestigious journals including <em>Heliyon</em> and the <em>Italian Journal of Pure and Applied Mathematics</em>, and has authored 9 scientific publications in international peer-reviewed journals.</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-4">
                <a href="mailto:bouchangour.mohammed@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 text-sm font-serif rounded-lg hover:bg-teal-100 transition-colors"><Download className="w-4 h-4" />Download CV</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section ref={(el) => addToRefs(el, 1)} className="py-20 lg:py-28 bg-teal-50/50">
        <div className="section-padding max-w-5xl mx-auto">
          <div className="text-center mb-14 reveal-item"><span className="font-script text-3xl text-teal-500">Parcours</span><h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mt-2">Education</h2></div>
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-teal-200 lg:-translate-x-px" />
            <div className="space-y-10">
              {education.map((edu, index) => (
                <div key={index} className={`reveal-item relative flex flex-col lg:flex-row gap-6 lg:gap-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-teal-100 hover:shadow-md transition-shadow">
                      <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-serif rounded-full mb-3">{edu.year}</span>
                      <h3 className="font-serif text-lg font-bold text-gray-900">{edu.degree}</h3>
                      <p className="font-serif text-sm text-gray-600 mt-1">{edu.institution}</p>
                      {edu.detail && <p className="font-serif text-xs text-teal-600 mt-2 italic">{edu.detail}</p>}
                    </div>
                  </div>
                  <div className="absolute left-4 lg:left-1/2 w-4 h-4 bg-teal-500 rounded-full border-4 border-white shadow-sm lg:-translate-x-2 mt-6" />
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Communications */}
      <section ref={(el) => addToRefs(el, 2)} className="py-20 lg:py-28 bg-teal-50/30">
        <div className="section-padding max-w-5xl mx-auto">
          <div className="text-center mb-14 reveal-item"><span className="font-script text-3xl text-teal-500">Presentations</span><h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mt-2">Communications & Conferences</h2></div>
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
        </div>
      </section>

      {/* Research Themes & Activities */}
      <section ref={(el) => addToRefs(el, 3)} className="py-20 lg:py-28 bg-white">
        <div className="section-padding max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="reveal-item">
              <span className="font-script text-3xl text-teal-500">Focus</span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mt-2 mb-8">Research Themes</h2>
              <div className="space-y-4">
                {["Linear and Non-linear Preserver Problems", "Operator Theory & Spectral Theory", "Theory of Inequalities", "Functional Analysis"].map((theme, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-teal-50/50 rounded-xl border-l-4 border-teal-500 hover:bg-teal-50 transition-colors">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-sm font-serif font-bold text-teal-700">{index + 1}</span></div>
                    <span className="font-serif text-gray-800">{theme}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-item">
              <span className="font-script text-3xl text-teal-500">Engagement</span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mt-2 mb-8">Scientific Activities</h2>
              <div className="space-y-4">
                {[
                  { icon: FlaskConical, text: "Chercheur at Laboratoire Ibn Al Banna des Mathématiques (LIABM), Faculté des Sciences d'Oujda" },
                  { icon: BookOpen, text: "Member of the Moroccan Association of Mathematics and Artificial Intelligence" },
                  { icon: Award, text: "Reviewer for the journal Heliyon" },
                  { icon: Award, text: "Reviewer for the Italian Journal of Pure and Applied Mathematics" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-teal-100 hover:shadow-sm transition-all">
                    <activity.icon className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="font-serif text-sm text-gray-700">{activity.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Languages */}
      <section ref={(el) => addToRefs(el, 4)} className="py-20 lg:py-28 bg-teal-50/30">
        <div className="section-padding max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal-item"><span className="font-script text-3xl text-teal-500">Expertise</span><h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mt-2">Skills & Competencies</h2></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="reveal-item">
              <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center"><Code className="w-5 h-5 text-teal-600" /></div><h3 className="font-serif text-xl font-bold text-gray-900">Computing Skills</h3></div>
              <div className="space-y-3">
                {skills.computing.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-teal-100 hover:border-teal-300 transition-colors">
                    <div className="w-2 h-2 bg-teal-500 rounded-full" /><span className="font-serif text-sm text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-item">
              <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center"><Languages className="w-5 h-5 text-teal-600" /></div><h3 className="font-serif text-xl font-bold text-gray-900">Languages</h3></div>
              <div className="space-y-5">
                {skills.languages.map((lang, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center"><span className="font-serif text-sm font-semibold text-gray-800">{lang.name}</span><span className="font-serif text-xs text-teal-600">{lang.level}</span></div>
                    <div className="w-full h-2 bg-teal-100 rounded-full overflow-hidden"><div className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${lang.pct}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section ref={(el) => addToRefs(el, 5)} className="py-20 lg:py-28 bg-white">
        <div className="section-padding max-w-5xl mx-auto">
          <div className="text-center mb-14 reveal-item"><span className="font-script text-3xl text-teal-500">Development</span><h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mt-2">Continuing Education</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="reveal-item bg-teal-50/50 rounded-xl p-5 border border-teal-100 hover:border-teal-300 hover:shadow-sm transition-all">
                <GraduationCap className="w-6 h-6 text-teal-500 mb-3" />
                <h3 className="font-serif text-sm font-semibold text-gray-900 leading-snug">{cert.name}</h3>
                <p className="font-serif text-xs text-teal-600 mt-1">{cert.provider}</p>
                <p className="font-serif text-xs text-gray-400 mt-2">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Summary */}
      <section ref={(el) => addToRefs(el, 6)} className="py-20 lg:py-28 bg-teal-50/30">
        <div className="section-padding max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal-item"><span className="font-script text-3xl text-teal-500">Experience</span><h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mt-2">Teaching Experience</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teaching.map((item, index) => (
              <div key={index} className="reveal-item bg-white rounded-xl p-6 border border-teal-100 hover:border-teal-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4 mb-3"><h3 className="font-serif text-base font-bold text-gray-900">{item.institution}</h3><span className="text-xs font-serif text-teal-600 bg-teal-50 px-2 py-1 rounded-full whitespace-nowrap">{item.period}</span></div>
                <p className="font-serif text-sm text-teal-700 mb-2">{item.role}</p>
                <p className="font-serif text-xs text-gray-500 mb-3">{item.program}</p>
                <ul className="space-y-1">{item.courses.map((course, i) => (<li key={i} className="flex items-center gap-2 text-sm font-serif text-gray-700"><div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />{course}</li>))}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      {homeEvents.length > 0 && (
        <section ref={(el) => addToRefs(el, 8)} className="py-20 lg:py-28 bg-white">
          <div className="section-padding max-w-6xl mx-auto">
            <div className="text-center mb-14 reveal-item">
              <span className="font-script text-3xl text-teal-500">Activités</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mt-2">Events & Activities</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {homeEvents.map((event, index) => (
                <div key={event.id || index} className="reveal-item group bg-white rounded-xl border border-teal-100 overflow-hidden hover:border-teal-300 hover:shadow-md transition-all duration-300">
                  <div className="aspect-[4/3] bg-teal-50 overflow-hidden">
                    {event.image ? (
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-10 h-10 text-teal-300" /></div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{event.title}</h3>
                    <div className="flex items-center gap-2 mt-3">
                      {event.imagesLink && (
                        <a href={event.imagesLink} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" /> Gallery
                        </a>
                      )}
                      {event.eventLink && (
                        <a href={event.eventLink} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> Link
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10 reveal-item">
              <Link to="/events" className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white text-sm font-serif rounded-full hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg">
                <Calendar className="w-4 h-4" />View All Events
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
