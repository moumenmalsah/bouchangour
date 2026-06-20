import { useState } from 'react';
import { useSiteData, type HomePageConfig } from '../../contexts/SiteDataContext';
import { Save, ChevronDown, ChevronUp, Plus, Trash2, GripVertical } from 'lucide-react';

const icons = ['FlaskConical', 'BookOpen', 'Award', 'Presentation', 'Code', 'GraduationCap', 'FileText', 'Calendar', 'Languages', 'ImageIcon'];
const iconLabels: Record<string, string> = { FlaskConical: 'Research', BookOpen: 'Book', Award: 'Award', Presentation: 'Presentation', Code: 'Code', GraduationCap: 'Graduation', FileText: 'File', Calendar: 'Calendar', Languages: 'Languages', ImageIcon: 'Image' };

function Section({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left">
        <h2 className="font-serif text-base font-semibold text-gray-900">{title}</h2>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">{children}</div>}
    </div>
  );
}

export default function HomeManage() {
  const { data, updateHomePage } = useSiteData();
  const [config, setConfig] = useState<HomePageConfig>(() => deepClone(data.homePage));
  const [saved, setSaved] = useState(false);
  const [newCourse, setNewCourse] = useState('');

  function set<T>(path: string[], value: T) {
    setConfig(prev => {
      const next = deepClone(prev);
      let obj: Record<string, unknown> = next as unknown as Record<string, unknown>;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]] as Record<string, unknown>;
      obj[path[path.length - 1]] = value as never;
      return next;
    });
  }

  const handleSave = () => {
    updateHomePage(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Home Page Management</h1>
          <p className="font-serif text-sm text-gray-500 mt-1">Customize all homepage content</p>
        </div>
        <button onClick={handleSave} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif">
          <Save className="w-4 h-4" />{saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Hero */}
        <Section title="Hero Section" defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Prefix" value={config.hero.prefix} onChange={v => set(['hero', 'prefix'], v)} />
            <Input label="Title" value={config.hero.title} onChange={v => set(['hero', 'title'], v)} />
            <div className="md:col-span-2"><Input label="Subtitle" value={config.hero.subtitle} onChange={v => set(['hero', 'subtitle'], v)} /></div>
            <Input label="Name" value={config.hero.name} onChange={v => set(['hero', 'name'], v)} />
            <Input label="Birth Text" value={config.hero.birthText} onChange={v => set(['hero', 'birthText'], v)} />
            <div className="md:col-span-2"><Input label="Tagline" value={config.hero.tagline} onChange={v => set(['hero', 'tagline'], v)} /></div>
          </div>
        </Section>

        {/* Profile */}
        <Section title="Academic Profile">
          <Input label="Title" value={config.profile.title} onChange={v => set(['profile', 'title'], v)} />
          <Input label="Name" value={config.profile.name} onChange={v => set(['profile', 'name'], v)} />
          <div className="space-y-3">
            <label className="block text-xs font-serif font-medium text-gray-600">Profile Paragraphs</label>
            {config.profile.paragraphs.map((p, i) => (
              <div key={i} className="flex gap-2">
                <textarea rows={3} value={p} onChange={e => { const ps = [...config.profile.paragraphs]; ps[i] = e.target.value; set(['profile', 'paragraphs'], ps); }} className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                <button onClick={() => set(['profile', 'paragraphs'], config.profile.paragraphs.filter((_, j) => j !== i))} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button onClick={() => set(['profile', 'paragraphs'], [...config.profile.paragraphs, ''])} className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add paragraph</button>
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          {config.education.map((edu, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center"><span className="text-xs font-semibold text-gray-500">Entry {i + 1}</span><button onClick={() => set(['education'], config.education.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Year" value={edu.year} onChange={v => { const e = [...config.education]; e[i] = { ...e[i], year: v }; set(['education'], e); }} />
                <Input label="Degree" value={edu.degree} onChange={v => { const e = [...config.education]; e[i] = { ...e[i], degree: v }; set(['education'], e); }} />
                <Input label="Institution" value={edu.institution} onChange={v => { const e = [...config.education]; e[i] = { ...e[i], institution: v }; set(['education'], e); }} />
                <Input label="Detail (optional)" value={edu.detail || ''} onChange={v => { const e = [...config.education]; e[i] = { ...e[i], detail: v || undefined }; set(['education'], e); }} />
              </div>
            </div>
          ))}
          <button onClick={() => set(['education'], [...config.education, { year: '', degree: '', institution: '', detail: '' }])} className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add education entry</button>
        </Section>

        {/* Communications */}
        <Section title="Communications & Conferences">
          {config.communications.map((comm, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center"><span className="text-xs font-semibold text-gray-500">Entry {i + 1}</span><button onClick={() => set(['communications'], config.communications.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2"><Input label="Title" value={comm.title} onChange={v => { const c = [...config.communications]; c[i] = { ...c[i], title: v }; set(['communications'], c); }} /></div>
                <Input label="Event" value={comm.event} onChange={v => { const c = [...config.communications]; c[i] = { ...c[i], event: v }; set(['communications'], c); }} />
                <Input label="Location" value={comm.location} onChange={v => { const c = [...config.communications]; c[i] = { ...c[i], location: v }; set(['communications'], c); }} />
                <Input label="Date" value={comm.date} onChange={v => { const c = [...config.communications]; c[i] = { ...c[i], date: v }; set(['communications'], c); }} />
              </div>
            </div>
          ))}
          <button onClick={() => set(['communications'], [...config.communications, { title: '', event: '', location: '', date: '' }])} className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add communication</button>
        </Section>

        {/* Research Themes */}
        <Section title="Research Themes">
          <div className="space-y-2">
            {config.researchThemes.map((theme, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={theme} onChange={e => { const t = [...config.researchThemes]; t[i] = e.target.value; set(['researchThemes'], t); }} className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                <button onClick={() => set(['researchThemes'], config.researchThemes.filter((_, j) => j !== i))} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button onClick={() => set(['researchThemes'], [...config.researchThemes, ''])} className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add theme</button>
          </div>
        </Section>

        {/* Scientific Activities */}
        <Section title="Scientific Activities">
          {config.scientificActivities.map((act, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
              <select value={act.icon} onChange={e => { const a = [...config.scientificActivities]; a[i] = { ...a[i], icon: e.target.value }; set(['scientificActivities'], a); }} className="px-2 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500">
                {icons.map(ic => <option key={ic} value={ic}>{iconLabels[ic]}</option>)}
              </select>
              <input value={act.text} onChange={e => { const a = [...config.scientificActivities]; a[i] = { ...a[i], text: e.target.value }; set(['scientificActivities'], a); }} className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
              <button onClick={() => set(['scientificActivities'], config.scientificActivities.filter((_, j) => j !== i))} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <button onClick={() => set(['scientificActivities'], [...config.scientificActivities, { icon: 'FlaskConical', text: '' }])} className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add activity</button>
        </Section>

        {/* Skills */}
        <Section title="Skills & Languages">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-serif font-medium text-gray-600 mb-2">Computing Skills</label>
              <div className="space-y-2">
                {config.skills.computing.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input value={s} onChange={e => { const sk = [...config.skills.computing]; sk[i] = e.target.value; set(['skills', 'computing'], sk); }} className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                    <button onClick={() => set(['skills', 'computing'], config.skills.computing.filter((_, j) => j !== i))} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => set(['skills', 'computing'], [...config.skills.computing, ''])} className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add skill</button>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <label className="block text-xs font-serif font-medium text-gray-600 mb-2">Languages</label>
              {config.skills.languages.map((lang, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <input value={lang.name} onChange={e => { const l = [...config.skills.languages]; l[i] = { ...l[i], name: e.target.value }; set(['skills', 'languages'], l); }} placeholder="Name" className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                  <input value={lang.level} onChange={e => { const l = [...config.skills.languages]; l[i] = { ...l[i], level: e.target.value }; set(['skills', 'languages'], l); }} placeholder="Level" className="w-24 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                  <input type="number" value={lang.pct} onChange={e => { const l = [...config.skills.languages]; l[i] = { ...l[i], pct: Number(e.target.value) }; set(['skills', 'languages'], l); }} placeholder="%" className="w-16 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                  <button onClick={() => set(['skills', 'languages'], config.skills.languages.filter((_, j) => j !== i))} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={() => set(['skills', 'languages'], [...config.skills.languages, { name: '', level: '', pct: 0 }])} className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add language</button>
            </div>
          </div>
        </Section>

        {/* Certifications */}
        <Section title="Continuing Education / Certifications">
          {config.certifications.map((cert, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center"><span className="text-xs font-semibold text-gray-500">Certification {i + 1}</span><button onClick={() => set(['certifications'], config.certifications.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-3"><Input label="Name" value={cert.name} onChange={v => { const c = [...config.certifications]; c[i] = { ...c[i], name: v }; set(['certifications'], c); }} /></div>
                <Input label="Provider" value={cert.provider} onChange={v => { const c = [...config.certifications]; c[i] = { ...c[i], provider: v }; set(['certifications'], c); }} />
                <Input label="Date" value={cert.date} onChange={v => { const c = [...config.certifications]; c[i] = { ...c[i], date: v }; set(['certifications'], c); }} />
              </div>
            </div>
          ))}
          <button onClick={() => set(['certifications'], [...config.certifications, { name: '', provider: '', date: '' }])} className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add certification</button>
        </Section>

        {/* Teaching */}
        <Section title="Teaching Experience">
          {config.teaching.map((t, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center"><span className="text-xs font-semibold text-gray-500">Entry {i + 1}</span><button onClick={() => set(['teaching'], config.teaching.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Institution" value={t.institution} onChange={v => { const tc = [...config.teaching]; tc[i] = { ...tc[i], institution: v }; set(['teaching'], tc); }} />
                <Input label="Role" value={t.role} onChange={v => { const tc = [...config.teaching]; tc[i] = { ...tc[i], role: v }; set(['teaching'], tc); }} />
                <Input label="Program" value={t.program} onChange={v => { const tc = [...config.teaching]; tc[i] = { ...tc[i], program: v }; set(['teaching'], tc); }} />
                <Input label="Period" value={t.period} onChange={v => { const tc = [...config.teaching]; tc[i] = { ...tc[i], period: v }; set(['teaching'], tc); }} />
              </div>
              <div>
                <label className="block text-xs font-serif font-medium text-gray-500 mb-1">Courses</label>
                {t.courses.map((c, j) => (
                  <div key={j} className="flex items-center gap-2 mb-1">
                    <input value={c} onChange={e => { const tc = [...config.teaching]; tc[i] = { ...tc[i], courses: [...tc[i].courses] }; tc[i].courses[j] = e.target.value; set(['teaching'], tc); }} className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                    <button onClick={() => { const tc = [...config.teaching]; tc[i] = { ...tc[i], courses: tc[i].courses.filter((_, k) => k !== j) }; set(['teaching'], tc); }} className="text-gray-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
                <button onClick={() => { const tc = [...config.teaching]; tc[i] = { ...tc[i], courses: [...tc[i].courses, ''] }; set(['teaching'], tc); }} className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1 mt-1"><Plus className="w-3 h-3" /> Add course</button>
              </div>
            </div>
          ))}
          <button onClick={() => set(['teaching'], [...config.teaching, { institution: '', role: '', program: '', period: '', courses: [''] }])} className="text-xs text-teal-600 hover:text-teal-800 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add teaching entry</button>
        </Section>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-serif font-medium text-gray-500 mb-1">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
    </div>
  );
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
