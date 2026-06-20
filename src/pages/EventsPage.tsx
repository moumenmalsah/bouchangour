import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ExternalLink, FolderOpen, ImageIcon, GraduationCap } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

gsap.registerPlugin(ScrollTrigger);

interface EventData {
  id: string;
  title: string;
  image: string;
  imagesLink: string;
  eventLink: string;
}

export default function EventsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data } = useSiteData();

  const eventItems = data.content.events?.items || [];
  const events = eventItems as unknown as EventData[];

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
  }, [events]);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-12 bg-teal-50/50 academic-pattern">
        <div className="section-padding max-w-6xl mx-auto text-center">
          <span className="font-script text-4xl text-teal-500">Événements</span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mt-3">Events & Activities</h1>
          <p className="font-serif text-gray-600 mt-4 max-w-2xl mx-auto">
            {events.length > 0
              ? `${events.length} event${events.length !== 1 ? 's' : ''}`
              : 'Conferences, workshops, seminars, and academic activities'}
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="section-padding max-w-6xl mx-auto py-16 lg:py-24 space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-10 reveal-item">
            <Calendar className="w-6 h-6 text-teal-600" />
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Events Gallery</h2>
          </div>

          {events.length === 0 ? (
            <div className="reveal-item text-center py-16">
              <FolderOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="font-serif text-gray-400">No events available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <div key={event.id || index} className="reveal-item group bg-white rounded-xl border border-teal-100 overflow-hidden hover:border-teal-300 hover:shadow-md transition-all duration-300">
                  <div className="aspect-[4/3] bg-teal-50 overflow-hidden">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                          img.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                          const icon = document.createElement('div');
                          icon.innerHTML = '<svg class="w-12 h-12 text-teal-300" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>';
                          img.parentElement!.appendChild(icon);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-teal-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-base font-bold text-gray-900 group-hover:text-teal-700 transition-colors mb-3">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {event.imagesLink && (
                        <a
                          href={event.imagesLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-serif text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full hover:bg-teal-100 transition-colors"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          Gallery
                        </a>
                      )}
                      {event.eventLink && (
                        <a
                          href={event.eventLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-serif text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full hover:bg-teal-100 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Event link
                        </a>
                      )}
                    </div>
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
              <h3 className="font-serif text-xl font-bold mb-2">Stay Connected</h3>
              <p className="font-serif text-sm text-teal-100 leading-relaxed">Follow our events and activities to stay updated with the latest academic and research developments. All events are open to students and researchers.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
