import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

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

interface SiteData {
  navLinks: NavLink[];
  content: Record<string, SectionData>;
}

interface SiteDataContextType {
  data: SiteData;
  updateNavLinks: (links: NavLink[]) => void;
  addNavLink: (link: NavLink) => void;
  removeNavLink: (path: string) => void;
  updateContent: (section: string, items: ContentItem[]) => void;
  addContentItem: (section: string, item: ContentItem) => void;
  updateContentItem: (section: string, id: string, updates: Partial<ContentItem>) => void;
  removeContentItem: (section: string, id: string) => void;
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
};

const STORAGE_KEY = 'bouchangour-site-data';

function loadData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultData, ...parsed };
    }
  } catch {
  }
  return defaultData;
}

function saveData(data: SiteData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
  }
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(loadData);

  useEffect(() => {
    saveData(data);
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

  const resetToDefaults = () => {
    setData(defaultData);
  };

  return (
    <SiteDataContext.Provider
      value={{
        data,
        updateNavLinks,
        addNavLink,
        removeNavLink,
        updateContent,
        addContentItem,
        updateContentItem,
        removeContentItem,
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
