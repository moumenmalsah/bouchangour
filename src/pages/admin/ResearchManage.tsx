import { useState } from 'react';
import { Link } from 'react-router';
import { useSiteData, type ContentItem } from '../../contexts/SiteDataContext';
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  FlaskConical,
  ExternalLink,
} from 'lucide-react';

interface ResearchData extends ContentItem {
  title: string;
  link: string;
}

export default function ResearchManage() {
  const { data, addContentItem, updateContentItem, removeContentItem } = useSiteData();
  const sectionData = data.content.research;
  const items = sectionData?.items || [];

  const [saved, setSaved] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newLink, setNewLink] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editLink, setEditLink] = useState('');

  const toResearch = (item: ContentItem) => item as unknown as ResearchData;

  const sortedItems = [...items].sort((a, b) =>
    (toResearch(a).title || '').localeCompare(toResearch(b).title || '')
  );

  const filteredItems = search
    ? sortedItems.filter(item =>
        toResearch(item).title?.toLowerCase().includes(search.toLowerCase())
      )
    : sortedItems;

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetForm = () => { setNewTitle(''); setNewLink(''); };

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addContentItem('research', {
      id: `research-${Date.now()}`,
      title: newTitle.trim(),
      link: newLink.trim(),
    } as ContentItem);
    resetForm();
    setShowAddForm(false);
    showSaved();
  };

  const startEdit = (item: ContentItem) => {
    const r = toResearch(item);
    setEditingId(item.id);
    setEditTitle(r.title || '');
    setEditLink(r.link || '');
  };

  const saveEdit = (id: string) => {
    updateContentItem('research', id, {
      title: editTitle.trim(),
      link: editLink.trim(),
    } as Partial<ContentItem>);
    setEditingId(null);
    showSaved();
  };

  const removeItem = (id: string) => {
    if (!confirm('Delete this publication?')) return;
    removeContentItem('research', id);
    showSaved();
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link to="/admin" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Research & Publications</h1>
          </div>
          <p className="font-serif text-sm text-gray-500 mt-1 ml-10">
            {items.length} publication{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-teal-600 font-medium">Saved</span>}
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif"
          >
            <Plus className="w-4 h-4" />
            Add Publication
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search publications..."
          className="w-full max-w-md px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-serif text-sm font-semibold text-gray-700 mb-4">New Publication</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Title</label>
              <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Publication title..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Link (DOI or URL)</label>
              <input
                value={newLink}
                onChange={e => setNewLink(e.target.value)}
                placeholder="https://doi.org/... or https://..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button onClick={handleAdd} disabled={!newTitle.trim()} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif disabled:opacity-50 disabled:cursor-not-allowed">
              Create
            </button>
            <button onClick={() => { setShowAddForm(false); resetForm(); }} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm font-serif">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <FlaskConical className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="font-serif text-sm text-gray-400">
              {search ? 'No publications match your search.' : 'No publications yet.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredItems.map(item => {
              const pub = toResearch(item);
              return (
                <div key={pub.id} className="px-6 py-4 hover:bg-gray-50 transition-colors group">
                  {editingId === pub.id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-serif text-gray-500 mb-1">Title</label>
                        <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-serif text-gray-500 mb-1">Link</label>
                        <input value={editLink} onChange={e => setEditLink(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs" />
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => saveEdit(pub.id)} className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs">
                          <Save className="w-3.5 h-3.5" /> Save
                        </button>
                        <button onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FlaskConical className="w-5 h-5 text-teal-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{pub.title}</p>
                        {pub.link && (
                          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 transition-colors truncate mt-0.5">
                            <ExternalLink className="w-3 h-3" />
                            <span className="truncate">{pub.link}</span>
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button onClick={() => startEdit(pub)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => removeItem(pub.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
