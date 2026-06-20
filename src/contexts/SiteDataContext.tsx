import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

interface SiteData {
  navLinks: NavLink[];
  content: Record<string, SectionData>;
  footer: FooterConfig;
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

const defaultData: SiteData = {
  navLinks: defaultNavLinks,
  content: {},
  footer: {
    emails: ['bouchangour.mohammed@gmail.com', 'm.bouchangour@ump.ac.ma'],
    location: 'Oujda, Morocco',
    affiliations: [
      { name: 'Laboratoire Ibn Al Banna des Mathématiques (LIABM)', description: 'Faculté des Sciences d\'Oujda' },
      { name: 'Association Marocaine de Mathématiques et Intelligence Artificielle' },
    ],
    copyright: 'Dr. Bouchangour Mohammed. All rights reserved.',
  },
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
          setData({ ...defaultData, ...remote });
        } else {
          await setDoc(ref, defaultData);
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
      try {
        await setDoc(doc(db, DOC_PATH), saveRef.current);
      } catch {
        console.warn('Failed to save to Firestore');
      }
    }, 300);
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
