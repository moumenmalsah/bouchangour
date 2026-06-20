import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, GraduationCap, ExternalLink, FolderOpen, ImageIcon } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

gsap.registerPlugin(ScrollTrigger);

interface ToolData {
  id: string;
  name: string;
  link: string;
  image: string;
}

export default function ToolsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data } = useSiteData();

  const toolItems = data.content.tools?.items || [];
  const tools = toolItems as unknown as ToolData[];

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
  }, [tools]);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-12 bg-teal-50/50 academic-pattern">
        <div className="section-padding max-w-6xl mx-auto text-center">
          <span className="font-script text-4xl text-teal-500">Outils</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Tools & Software</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">
            {tools.length > 0
              ? `${tools.length} tools available`
              : 'Guides, tutorials, and resources for scientific computing, document preparation, and educational technology'}
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <Code className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Scientific & Educational Tools</h2>
          </div>

          {tools.length === 0 ? (
            <div className="reveal-item text-center py-16">
              <FolderOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="font-serif text-gray-400">No tools available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <a
                  key={tool.id || index}
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal-item group bg-white rounded-xl border border-teal-100 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300 block"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:bg-teal-100 transition-colors">
                      {tool.image ? (
                        <img
                          src={tool.image}
                          alt={tool.name}
                          className="w-full h-full object-contain p-1.5"
                          onError={e => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = 'none';
                            img.parentElement!.classList.add('bg-teal-100');
                          }}
                        />
                      ) : (
                        <ImageIcon className="w-7 h-7 text-teal-500" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                        {tool.name}
                      </h3>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-teal-50 flex items-center justify-between">
                    <span className="text-xs font-serif text-teal-600 group-hover:text-teal-800 transition-colors inline-flex items-center gap-1">
                      Visit website
                      <ExternalLink className="w-3 h-3" />
                    </span>
                    <span className="text-[10px] text-gray-400">Open</span>
                  </div>
                </a>
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
              <h3 className="font-serif text-xl font-bold mb-2">Getting Started</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">These tools are essential for modern mathematical research and teaching. Installation guides are included in each resource package.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
