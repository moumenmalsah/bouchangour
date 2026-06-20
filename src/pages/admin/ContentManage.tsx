import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { useSiteData, type ContentItem } from '../../contexts/SiteDataContext';
import { Plus, Trash2, Save, ArrowLeft, BookOpen } from 'lucide-react';

const sectionDisplayNames: Record<string, string> = {
  courses: 'Courses',
  exams: 'Exams',
  exercices: 'Exercices',
  tools: 'Tools & Softwares',
  research: 'Research & Publications',
  videos: 'Video & Tutorials',
  events: 'Events',
};

export default function ContentManage() {
  const { section } = useParams<{ section: string }>();
  const { data, addContentItem, updateContentItem, removeContentItem } = useSiteData();

  const sectionData = section ? data.content[section] : undefined;
  const items = sectionData?.items || [];
  const displayName = section ? sectionDisplayNames[section] || section.charAt(0).toUpperCase() + section.slice(1) : '';

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Record<string, string>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(q)
      )
    );
  }, [items, search]);

  if (!section) {
    return <div className="text-gray-500 text-sm">Section not specified.</div>;
  }

  const getFields = (): string[] => {
    if (items.length > 0) {
      return Object.keys(items[0]).filter(k => k !== 'id');
    }
    return ['title', 'description'];
  };

  const fields = getFields();

  const renderField = (item: ContentItem, field: string) => {
    const value = item[field];
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value).slice(0, 80) + '...';
    }
    return String(value ?? '');
  };

  const startEdit = (item: ContentItem) => {
    setEditingId(item.id);
    const flat: Record<string, string> = {};
    for (const field of fields) {
      const val = item[field];
      flat[field] = Array.isArray(val) ? val.join(', ') : String(val ?? '');
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        flat[field] = JSON.stringify(val);
      }
    }
    setEditData(flat);
  };

  const saveEdit = (id: string) => {
    const updates: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(editData)) {
      const original = items.find(i => i.id === id)?.[key];
      if (Array.isArray(original)) {
        updates[key] = val.split(',').map(s => s.trim()).filter(Boolean);
      } else {
        try {
          const parsed = JSON.parse(val);
          if (typeof parsed === 'object') updates[key] = parsed;
          else updates[key] = val;
        } catch {
          updates[key] = val;
        }
      }
    }
    updateContentItem(section, id, updates);
    setEditingId(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAdd = () => {
    const item: ContentItem = { id: `item-${Date.now()}` };
    for (const [key, val] of Object.entries(newItem)) {
      item[key] = val;
    }
    addContentItem(section, item);
    setNewItem({});
    setShowAdd(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRemove = (id: string) => {
    removeContentItem(section, id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link
              to="/admin"
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">{displayName}</h1>
          </div>
          <p className="font-serif text-sm text-gray-500 mt-1 ml-10">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs text-teal-600 font-medium">Changes saved</span>
          )}
          <button
            onClick={() => {
              setShowAdd(true);
              const blank: Record<string, string> = {};
              for (const f of fields) blank[f] = '';
              setNewItem(blank);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif"
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search items..."
          className="w-full max-w-md px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-serif text-sm font-semibold text-gray-700 mb-4">New Item</h3>
          <div className="space-y-3">
            {fields.map(field => (
              <div key={field}>
                <label className="block text-xs font-serif text-gray-500 mb-1 capitalize">{field}</label>
                <input
                  value={newItem[field] || ''}
                  onChange={e => setNewItem(prev => ({ ...prev, [field]: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif"
            >
              Add Item
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm font-serif"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="font-serif text-sm text-gray-400">
              {search ? 'No items match your search.' : 'No items yet. Click "Add New" to create one.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredItems.map(item => (
              <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors group">
                {editingId === item.id ? (
                  <div className="space-y-3">
                    {fields.map(field => (
                      <div key={field}>
                        <label className="block text-xs font-serif text-gray-500 mb-1 capitalize">{field}</label>
                        <input
                          value={editData[field] || ''}
                          onChange={e => setEditData(prev => ({ ...prev, [field]: e.target.value }))}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        />
                      </div>
                    ))}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => saveEdit(item.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      {fields.slice(0, 3).map(field => (
                        <p key={field} className="text-sm text-gray-900 truncate">
                          {field === fields[0] ? (
                            <span className="font-semibold">{renderField(item, field)}</span>
                          ) : (
                            <span className="text-gray-500">{field}: {renderField(item, field)}</span>
                          )}
                        </p>
                      ))}
                      {fields.length > 3 && (
                        <p className="text-xs text-gray-400 mt-1">+{fields.length - 3} more fields</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button
                        onClick={() => startEdit(item)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
