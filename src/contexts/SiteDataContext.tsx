import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAdminPassword } from './AuthContext';

export interface NavLink {
  path: string;
  label: string;
}

export interface ContentItem {
  id: string;
  [key: string]: unknown;
}

export interface SectionData {
  title: string;
  icon: string;
  items: ContentItem[];
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterConfig {
  emails: string[];
  location: string;
  affiliations: { name: string; description?: string }[];
  copyright: string;
}

export interface HomeEducation {
  year: string; degree: string; institution: string; detail?: string;
}
export interface HomeCommunication {
  title: string; event: string; location: string; date: string;
}
export interface HomeLanguage {
  name: string; level: string; pct: number;
}
export interface HomeCertification {
  name: string; provider: string; date: string;
}
export interface HomeTeaching {
  institution: string; role: string; program: string; period: string; courses: string[];
}
export interface HomeHero {
  prefix: string; title: string; subtitle: string; name: string; birthText: string; tagline: string;
}
export interface HomeProfile {
  title: string; name: string; paragraphs: string[];
}
export interface HomePageConfig {
  hero: HomeHero;
  profile: HomeProfile;
  education: HomeEducation[];
  communications: HomeCommunication[];
  researchThemes: string[];
  scientificActivities: { icon: string; text: string }[];
  skills: { computing: string[]; languages: HomeLanguage[] };
  certifications: HomeCertification[];
  teaching: HomeTeaching[];
}

interface SiteData {
  navLinks: NavLink[];
  content: Record<string, SectionData>;
  footer: FooterConfig;
  homePage: HomePageConfig;
}

interface SiteDataContextType {
  data: SiteData;
  loading: boolean;
  updateNavLinks: (links: NavLink[]) => void;
  addNavLink: (link: NavLink) => void;
  removeNavLink: (path: string) => void;
  updateContent: (section: string, items: ContentItem[]) => void;
  addContentItem: (section: string, item: ContentItem) => void;
  updateContentItem: (section: string, id: string, updates: Partial<ContentItem>) => void;
  removeContentItem: (section: string, id: string) => void;
  updateFooter: (footer: FooterConfig) => void;
  updateHomePage: (homePage: HomePageConfig) => void;
  resetToDefaults: () => void;
}

const defaultNavLinks: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/courses', label: 'Courses' },
  { path: '/exams', label: 'Exams' },
  { path: '/exercices', label: 'Exercices' },
  { path: '/tools', label: 'Tools & Softwares' },
  { path: '/research', label: 'Research & Publications' },
  { path: '/videos', label: 'Video & Tutorials' },
  { path: '/events', label: 'Events' },
];

const defaultFooter: FooterConfig = {
  emails: ['bouchangour.mohammed@gmail.com', 'm.bouchangour@ump.ac.ma'],
  location: 'Oujda, Morocco',
  affiliations: [
    { name: 'Laboratoire Ibn Al Banna des Mathématiques (LIABM)', description: 'Faculté des Sciences d\'Oujda' },
    { name: 'Association Marocaine de Mathématiques et Intelligence Artificielle' },
  ],
  copyright: 'Dr. Bouchangour Mohammed. All rights reserved.',
};

const defaultHomePage: HomePageConfig = {
  hero: { prefix: 'Professor', title: 'in Applied Mathematics', subtitle: 'Doctor of Mathematics, Researcher in Functional Analysis, Spectral Theory, and Operator Inequalities', name: 'Dr. Bouchangour Mohammed', birthText: 'Né le 29 Janvier 1993 à Berkane, Morocco', tagline: 'Curriculum Vitae, Courses, Exams & Academic Resources' },
  profile: { title: 'Academic Profile', name: 'Dr. Bouchangour Mohammed', paragraphs: [
    'Dr. Bouchangour Mohammed is a Doctor of Mathematics, having earned his PhD from the Faculté des Sciences d\'Oujda at Université Mohammed Premier in 2023. His doctoral research, supervised by Professeur Ali Jaatit, focused on "Préservateurs de certains sous-espaces spectraux locaux" — earning the distinction of "Très honorable avec les félicitations du jury."',
    'His research interests span linear and non-linear preserver problems, operator theory, spectral theory, and the theory of inequalities. He is an active researcher at the Laboratoire Ibn Al Banna des Mathématiques (LIABM) and a member of the Moroccan Association of Mathematics and Artificial Intelligence.',
    'He serves as a reviewer for prestigious journals including Heliyon and the Italian Journal of Pure and Applied Mathematics, and has authored 9 scientific publications in international peer-reviewed journals.',
  ] },
  education: [
    { year: '2018 — 2023', degree: 'Doctorat en Mathématiques', institution: 'Faculté des Sciences d\'Oujda, Université Mohammed Premier', detail: 'Thèse: Préservateurs de certains sous-espaces spectraux locaux — Mention: Très honorable avec les félicitations du jury' },
    { year: '2016 — 2018', degree: 'Master en Analyse Fonctionnelle', institution: 'Faculté des Sciences, Université Mohammed Premier — Oujda' },
    { year: '2011 — 2016', degree: 'Licence d\'Études Fondamentales en Sciences Mathématiques', institution: 'Faculté des Sciences, Université Mohammed Premier — Oujda' },
    { year: '2011', degree: 'Baccalauréat en Sciences Expérimentales', institution: 'Option: Sciences Physiques — Lycée qualifiant Laymoune, Berkane' },
  ],
  communications: [
    { title: 'Some refinements of real power inequalities for (p,h)-convex functions via weak sub-majorization', event: "3rd edition JIAMA'25", location: 'ENSA, El Hoceima', date: '20-21 May 2025' },
    { title: "Improved Jensen's Type Inequality For (p,h)-Convex Functions Via Weak Sub-Majorization", event: 'IC3M-25, Second Edition', location: 'FP, Nador', date: '15-17 May 2025' },
    { title: 'Sur la théory des inégalités', event: 'Séminaire LIABM', location: 'Oujda', date: '16 May 2025' },
    { title: 'Pairs of maps preserving ascent or descent of product of operators', event: '17th Journées Préservateurs Linéaires', location: 'FS, Oujda', date: '6-7 Dec 2024' },
    { title: 'Maps preserving multiplicatively ascent or descent of product of operators', event: '17th Meeting NOTA', location: 'FS, Meknès', date: '27-28 Sep 2024' },
    { title: 'Further refinements of real power form inequalities for convex functions via Weak sub-majorization', event: '2nd Hybrid Conference AI & Applied Math', location: 'FST, Al-Hoceima', date: '11 May 2024' },
    { title: 'Some refinements of real power form inequalities for convex functions via weak sub-majorization', event: "Pi-Day'2024", location: 'ENSA, Al Hoceima', date: '5 Mar 2024' },
    { title: 'New inequalities for (p,h)-convex functions for τ-measurable operators', event: '1st Hybrid Scientific Day AI & Applied Math', location: 'ENSA, Al Hoceima', date: '4 May 2023' },
    { title: 'Non-linear maps preserving multiplicatively the local spectral subspace', event: '16th National Meeting Spectral Theory', location: 'FS, El Jadida', date: '24-26 Nov 2022' },
    { title: 'Maps preserving the local spectral subspace of product or Jordan triple product of operators', event: '4th National Meeting IC3M', location: 'FP, Nador', date: '20-22 May 2021' },
  ],
  researchThemes: ['Linear and Non-linear Preserver Problems', 'Operator Theory & Spectral Theory', 'Theory of Inequalities', 'Functional Analysis'],
  scientificActivities: [
    { icon: 'FlaskConical', text: 'Chercheur at Laboratoire Ibn Al Banna des Mathématiques (LIABM), Faculté des Sciences d\'Oujda' },
    { icon: 'BookOpen', text: 'Member of the Moroccan Association of Mathematics and Artificial Intelligence' },
    { icon: 'Award', text: 'Reviewer for the journal Heliyon' },
    { icon: 'Award', text: 'Reviewer for the Italian Journal of Pure and Applied Mathematics' },
  ],
  skills: {
    computing: ['LaTeX & Beamer', 'Microsoft Office (Word, Excel, PowerPoint)', 'Web Development (XHTML, PHP, MySQL, JavaScript, CSS)', 'Programming (C, C++, Python)', 'Video Editing (Camtasia, FormatFactory)', 'TIC & E-Learning Platforms'],
    languages: [{ name: 'Arabic', level: 'Native', pct: 100 }, { name: 'Amazigh', level: 'Spoken', pct: 80 }, { name: 'French', level: 'Fluent', pct: 90 }, { name: 'English', level: 'Fluent', pct: 90 }],
  },
  certifications: [
    { name: 'Azure: Create a Virtual Machine and Deploy a Web Server', provider: 'Coursera Project Network', date: 'July 2025' },
    { name: 'Introduction to Cyber Attacks', provider: 'New York University', date: 'February 2024' },
    { name: 'Data Science Math Skills', provider: 'Duke University', date: 'January 2023' },
    { name: 'Mathematics for Computer Science', provider: 'University of London Goldsmiths', date: 'August 2022' },
    { name: 'Introduction to Bash Shell Scripting', provider: 'Coursera Project Network', date: 'August 2022' },
    { name: 'Command Line in Linux', provider: 'Coursera Project Network', date: 'August 2022' },
    { name: 'Introduction to Big Data', provider: 'University of California San Diego', date: 'August 2021' },
  ],
  teaching: [
    { institution: "École Supérieure de Technologie d'Oujda", role: 'Cours et travaux dirigés', program: 'DUT — Génie Mécatronique (GMC)', period: '2024/2025', courses: ['Mathématiques Appliquées Probabilités/Statistiques (S2)', 'Mathématiques 1 (S1)'] },
    { institution: "Ministère de l'Éducation Nationale", role: 'Professeur de Mathématiques', program: 'Collège / Lycée', period: '2021 — Present', courses: ['Lycée collégial de Laatamna, Berkane', 'Lycée collégial de Trougout, Driouch'] },
    { institution: 'Faculté des Sciences et Techniques Al Hoceima', role: 'Cours, TD & TP', program: 'Master — Systèmes Embarqués et Robotics (SER)', period: '2023/2024', courses: ['Recherche Opérationnelle (S2)'] },
    { institution: 'École Nationale des Sciences Appliquées Al Hoceima', role: 'Cours, TD & TP', program: "Cycle d'Ingénieur — GEER", period: '2023/2024', courses: ['Recherche Opérationnelle (S1)'] },
    { institution: 'Faculté des Sciences d\'Oujda', role: 'Travaux dirigés', program: 'Licence — SMPC', period: '2020/2021', courses: ['Algèbre 2, Algèbre 1, Analyse 1'] },
    { institution: "Centre d'Études et de Recherche Humaines et Sociales d'Oujda", role: 'Enseignant formateur', program: 'Formation continue', period: 'April 2019', courses: ['Initiation à Matlab'] },
  ],
};

const defaultData: SiteData = {
  navLinks: defaultNavLinks,
  content: {},
  footer: defaultFooter,
  homePage: defaultHomePage,
};

const DOC_PATH = 'siteData/main';

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    async function load() {
      try {
        const ref = doc(db, DOC_PATH);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const remote = snap.data() as SiteData;
          setData(prev => ({
            ...prev,
            ...remote,
            footer: { ...defaultFooter, ...remote.footer },
            homePage: { ...defaultHomePage, ...remote.homePage },
          }));
        }
      } catch {
        console.warn('Firestore unavailable, using defaults');
      }
      setLoading(false);
      initialized.current = true;
    }
    load();
  }, []);

  const saveRef = useRef(data);
  saveRef.current = data;

  useEffect(() => {
    if (!initialized.current) return;
    const timer = setTimeout(async () => {
      const password = getAdminPassword();
      if (!password) return;
      try {
        await fetch('/api/save-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, data: saveRef.current }),
        });
      } catch {
        console.warn('Failed to save via API');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const updateNavLinks = (links: NavLink[]) => {
    setData(prev => ({ ...prev, navLinks: links }));
  };

  const addNavLink = (link: NavLink) => {
    setData(prev => ({ ...prev, navLinks: [...prev.navLinks, link] }));
  };

  const removeNavLink = (path: string) => {
    setData(prev => ({
      ...prev,
      navLinks: prev.navLinks.filter(l => l.path !== path),
    }));
  };

  const updateContent = (section: string, items: ContentItem[]) => {
    setData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: { ...prev.content[section], items },
      },
    }));
  };

  const addContentItem = (section: string, item: ContentItem) => {
    setData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: {
          ...prev.content[section],
          items: [...(prev.content[section]?.items || []), item],
        },
      },
    }));
  };

  const updateContentItem = (section: string, id: string, updates: Partial<ContentItem>) => {
    setData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: {
          ...prev.content[section],
          items: prev.content[section].items.map(item =>
            item.id === id ? { ...item, ...updates } : item
          ),
        },
      },
    }));
  };

  const removeContentItem = (section: string, id: string) => {
    setData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: {
          ...prev.content[section],
          items: prev.content[section].items.filter(item => item.id !== id),
        },
      },
    }));
  };

  const updateFooter = (footer: FooterConfig) => {
    setData(prev => ({ ...prev, footer }));
  };

  const updateHomePage = (homePage: HomePageConfig) => {
    setData(prev => ({ ...prev, homePage }));
  };

  const resetToDefaults = () => {
    setData(defaultData);
  };

  return (
    <SiteDataContext.Provider
      value={{
        data,
        loading,
        updateNavLinks,
        addNavLink,
        removeNavLink,
        updateContent,
        addContentItem,
        updateContentItem,
        removeContentItem,
        updateFooter,
        updateHomePage,
        resetToDefaults,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider');
  return ctx;
}
