import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Video, GraduationCap, FolderOpen, Play } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

gsap.registerPlugin(ScrollTrigger);

interface VideoData {
  id: string;
  title: string;
  iframe: string;
}

export default function VideosPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data } = useSiteData();

  const videoItems = data.content.videos?.items || [];
  const videos = videoItems as unknown as VideoData[];

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
  }, [videos]);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-12 bg-teal-50/50 academic-pattern">
        <div className="section-padding max-w-6xl mx-auto text-center">
          <span className="font-script text-4xl text-teal-500">Vidéos</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Video & Tutorials</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">
            {videos.length > 0
              ? `${videos.length} video${videos.length !== 1 ? 's' : ''} available`
              : 'Recorded lectures, step-by-step tutorials, and video guides for all courses and software tools'}
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <Video className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Video Library</h2>
          </div>

          {videos.length === 0 ? (
            <div className="reveal-item text-center py-16">
              <FolderOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="font-serif text-gray-400">No videos available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video, index) => (
                <div key={video.id || index} className="reveal-item bg-white rounded-xl border border-teal-100 overflow-hidden hover:border-teal-300 hover:shadow-md transition-all duration-300">
                  <div className="aspect-video bg-gray-900 relative group">
                    {video.iframe ? (
                      <div
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: video.iframe }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-teal-800">
                        <Play className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-sm font-semibold text-gray-900">{video.title}</h3>
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
              <h3 className="font-serif text-xl font-bold mb-2">Video Learning Tips</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">Watch videos in order of increasing difficulty. Pause and work through examples alongside the video. Take notes and revisit complex sections. Combine video learning with exercises and course notes for maximum comprehension.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
