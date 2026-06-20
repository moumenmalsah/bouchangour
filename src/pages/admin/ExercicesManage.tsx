import { useState } from 'react';
import { Link } from 'react-router';
import { useSiteData, type ContentItem } from '../../contexts/SiteDataContext';
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Calculator,
  ChevronDown,
  ChevronRight,
  FileText,
  ExternalLink,
  GripVertical,
  Layers,
} from 'lucide-react';

interface Series {
  name: string;
  pdfLink: string;
}

interface ExerciceData extends ContentItem {
  name: string;
  level: string;
  series: Series[];
}

export default function ExercicesManage() {
  const { data, addContentItem, updateContentItem, removeContentItem } = useSiteData();
  const section = 'exercices';
  const sectionData = data.content[section];
  const items = sectionData?.items || [];

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  const [newName, setNewName] = useState('');
  const [newLevel, setNewLevel] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editLevel, setEditLevel] = useState('');

  const toExercice = (item: ContentItem) => item as unknown as ExerciceData;

  const sortedItems = [...items].sort(
    (a, b) => (toExercice(a).name || '').localeCompare(toExercice(b).name || '')
  );

  const filteredItems = search
    ? sortedItems.filter(item =>
        toExercice(item).name?.toLowerCase().includes(search.toLowerCase())
      )
    : sortedItems;

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAdd = () => {
    if (!newName.trim()) return;
    const exercice: ContentItem = {
      id: `exercice-${Date.now()}`,
      name: newName.trim(),
      level: newLevel.trim() || 'N/A',
      series: [],
    };
    addContentItem('exercices', exercice);
    setNewName('');
    setNewLevel('');
    setShowAddForm(false);
    showSaved();
  };

  const startEdit = (item: ContentItem) => {
    const ex = toExercice(item);
    setEditingId(item.id);
    setEditName(ex.name || '');
    setEditLevel(ex.level || '');
  };

  const saveEdit = (id: string) => {
    updateContentItem('exercices', id, {
      name: editName.trim(),
      level: editLevel.trim() || 'N/A',
    } as Partial<ContentItem>);
    setEditingId(null);
    showSaved();
  };

  const findItem = (id: string) => {
    const item = items.find(i => i.id === id);
    return item ? toExercice(item) : undefined;
  };

  const addSeries = (parentId: string) => {
    const item = findItem(parentId);
    if (!item) return;
    const updated = [...item.series, { name: '', pdfLink: '' }];
    updateContentItem('exercices', parentId, { series: updated } as unknown as Partial<ContentItem>);
    showSaved();
  };

  const updateSeries = (parentId: string, index: number, field: keyof Series, value: string) => {
    const item = findItem(parentId);
    if (!item) return;
    const updated = [...item.series];
    updated[index] = { ...updated[index], [field]: value };
    updateContentItem('exercices', parentId, { series: updated } as unknown as Partial<ContentItem>);
  };

  const removeSeries = (parentId: string, index: number) => {
    const item = findItem(parentId);
    if (!item) return;
    const updated = item.series.filter((_, i) => i !== index);
    updateContentItem('exercices', parentId, { series: updated } as unknown as Partial<ContentItem>);
    showSaved();
  };

  const removeItem = (id: string) => {
    if (!confirm('Delete this exercise set?')) return;
    removeContentItem('exercices', id);
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
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Exercices</h1>
          </div>
          <p className="font-serif text-sm text-gray-500 mt-1 ml-10">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-teal-600 font-medium">Saved</span>}
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif"
          >
            <Plus className="w-4 h-4" />
            Add Exercice Set
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full max-w-md px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-serif text-sm font-semibold text-gray-700 mb-4">New Exercice Set</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Course Name</label>
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Mathématiques 1"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Level</label>
              <input
                value={newLevel}
                onChange={e => setNewLevel(e.target.value)}
                placeholder="e.g. DUT — GMC S1"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              disabled={!newName.trim()}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm font-serif"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Calculator className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="font-serif text-sm text-gray-400">
              {search ? 'No items match your search.' : 'No exercice sets yet.'}
            </p>
          </div>
        ) : (
          filteredItems.map(item => {
            const ex = toExercice(item);
            const isExpanded = expandedId === ex.id;
            const seriesCount = ex.series?.length || 0;

            return (
              <div key={ex.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  {editingId === ex.id ? (
                    <div className="flex-1 flex items-center gap-3">
                      <input
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        placeholder="Course name"
                      />
                      <input
                        value={editLevel}
                        onChange={e => setEditLevel(e.target.value)}
                        className="w-48 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        placeholder="Level"
                      />
                      <button
                        onClick={() => saveEdit(ex.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs"
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
                  ) : (
                    <div className="flex-1 flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calculator className="w-5 h-5 text-teal-700" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-base font-semibold text-gray-900 truncate">
                          {ex.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            <Layers className="w-3 h-3" />
                            {ex.level}
                          </span>
                          <span className="text-xs text-gray-400">|</span>
                          <span className="text-xs text-teal-600">
                            {seriesCount} serie{seriesCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => startEdit(ex)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeItem(ex.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-serif text-sm font-semibold text-gray-700">Series</h4>
                      <button
                        onClick={() => addSeries(ex.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-teal-600 transition-colors text-xs font-serif"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Series
                      </button>
                    </div>

                    {seriesCount === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-4">No series yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {ex.series.map((serie, sIndex) => (
                          <div
                            key={sIndex}
                            className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-3"
                          >
                            <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                            <FileText className="w-4 h-4 text-teal-500 flex-shrink-0" />

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                value={serie.name}
                                onChange={e => updateSeries(ex.id, sIndex, 'name', e.target.value)}
                                placeholder="Series name"
                                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  value={serie.pdfLink}
                                  onChange={e => updateSeries(ex.id, sIndex, 'pdfLink', e.target.value)}
                                  placeholder="Google Drive PDF link"
                                  className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
                                />
                                {serie.pdfLink && (
                                  <a
                                    href={serie.pdfLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-teal-600 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => removeSeries(ex.id, sIndex)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                              title="Remove series"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
