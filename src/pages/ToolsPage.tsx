import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Download, FileCode, GraduationCap, ExternalLink, Terminal, Monitor, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  {
    icon: Terminal,
    name: "MATLAB",
    category: "Scientific Computing",
    description: "Numerical computation, visualization, and programming environment widely used in engineering and research.",
    resources: [
      { name: "MATLAB Tutorial — Beginner to Advanced", type: "PDF", size: "4.2 MB" },
      { name: "Exercices pratiques MATLAB", type: "PDF", size: "2.1 MB" },
      { name: "Scripts exemples (.m)", type: "ZIP", size: "1.5 MB" },
    ],
    links: [{ name: "MathWorks Official", url: "https://www.mathworks.com" }],
  },
  {
    icon: FileCode,
    name: "LaTeX",
    category: "Document Preparation",
    description: "Professional typesetting system for mathematical documents, theses, and presentations.",
    resources: [
      { name: "LaTeX Template — Mathematical Documents", type: "ZIP", size: "2.1 MB" },
      { name: "Beamer Template — Presentations", type: "ZIP", size: "1.5 MB" },
      { name: "Guide rapide LaTeX", type: "PDF", size: "890 KB" },
    ],
    links: [{ name: "Overleaf", url: "https://www.overleaf.com" }, { name: "CTeX", url: "https://ctan.org" }],
  },
  {
    icon: Code,
    name: "Python",
    category: "Programming",
    description: "Versatile programming language with powerful libraries for scientific computing, data analysis, and visualization.",
    resources: [
      { name: "Python for Scientific Computing (Jupyter)", type: "ZIP", size: "8.3 MB" },
      { name: "NumPy & SciPy Tutorial", type: "PDF", size: "3.1 MB" },
      { name: "Matplotlib Guide", type: "PDF", size: "2.4 MB" },
    ],
    links: [{ name: "Python.org", url: "https://www.python.org" }, { name: "Anaconda", url: "https://www.anaconda.com" }],
  },
  {
    icon: Monitor,
    name: "Office Suite",
    category: "Productivity",
    description: "Word, Excel, and PowerPoint for administrative tasks, grade sheets, and course presentations.",
    resources: [
      { name: "Template — Fiche de notes", type: "XLSX", size: "120 KB" },
      { name: "Template — Présentation cours", type: "PPTX", size: "850 KB" },
    ],
    links: [{ name: "Microsoft Office", url: "https://www.office.com" }],
  },
  {
    icon: Zap,
    name: "Video Production",
    category: "Content Creation",
    description: "Tools for recording and editing educational video content, screencasts, and online course materials.",
    resources: [
      { name: "Guide Camtasia — Enregistrement de cours", type: "PDF", size: "1.8 MB" },
      { name: "Guide FormatFactory — Conversion vidéo", type: "PDF", size: "950 KB" },
    ],
    links: [{ name: "Camtasia", url: "https://www.techsmith.com/video-editor.html" }],
  },
];

export default function ToolsPage() {
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
          <span className="font-script text-4xl text-teal-500">Outils</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Tools & Software</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">Guides, tutorials, and resources for scientific computing, document preparation, and educational technology</p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <Code className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Scientific & Educational Tools</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="reveal-item bg-white rounded-xl border border-teal-100 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <tool.icon className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900">{tool.name}</h3>
                    <span className="text-xs font-serif text-teal-600">{tool.category}</span>
                  </div>
                </div>
                <p className="font-serif text-sm text-gray-600 leading-relaxed mb-5">{tool.description}</p>
                <div className="space-y-2 mb-5">
                  <p className="text-xs font-serif text-gray-500">Resources:</p>
                  {tool.resources.map((res, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-teal-50/50 rounded-lg hover:bg-teal-100/50 transition-colors">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileCode className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                        <span className="font-serif text-xs text-gray-700 truncate">{res.name}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className="text-[10px] font-serif text-teal-600 bg-white px-1.5 py-0.5 rounded">{res.type}</span>
                        <span className="text-[10px] font-serif text-gray-400">{res.size}</span>
                        <button className="text-teal-600 hover:text-teal-800 transition-colors"><Download className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-teal-50 flex flex-wrap gap-2">
                  {tool.links.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-serif text-teal-600 hover:text-teal-800 transition-colors">
                      <ExternalLink className="w-3 h-3" />{link.name}
                    </a>
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
              <h3 className="font-serif text-xl font-bold mb-2">Getting Started</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">These tools are essential for modern mathematical research and teaching. Installation guides are included in each resource package.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
