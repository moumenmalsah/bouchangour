import { useState } from 'react';
import { Link } from 'react-router';
import { useSiteData, type ContentItem } from '../../contexts/SiteDataContext';
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Code,
  ExternalLink,
  ImageIcon,
} from 'lucide-react';

interface ToolData extends ContentItem {
  name: string;
  link: string;
  image: string;
}

export default function ToolsManage() {
  const { data, addContentItem, updateContentItem, removeContentItem } = useSiteData();
  const sectionData = data.content.tools;
  const items = sectionData?.items || [];

  const [saved, setSaved] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  const [newName, setNewName] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newImage, setNewImage] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editLink, setEditLink] = useState('');
  const [editImage, setEditImage] = useState('');

  const toTool = (item: ContentItem) => item as unknown as ToolData;

  const sortedItems = [...items].sort(
    (a, b) => (toTool(a).name || '').localeCompare(toTool(b).name || '')
  );

  const filteredItems = search
    ? sortedItems.filter(item =>
        toTool(item).name?.toLowerCase().includes(search.toLowerCase())
      )
    : sortedItems;

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetForm = () => {
    setNewName('');
    setNewLink('');
    setNewImage('');
  };

  const handleAdd = () => {
    if (!newName.trim()) return;
    const tool: ContentItem = {
      id: `tool-${Date.now()}`,
      name: newName.trim(),
      link: newLink.trim(),
      image: newImage.trim(),
    };
    addContentItem('tools', tool);
    resetForm();
    setShowAddForm(false);
    showSaved();
  };

  const startEdit = (item: ContentItem) => {
    const t = toTool(item);
    setEditingId(item.id);
    setEditName(t.name || '');
    setEditLink(t.link || '');
    setEditImage(t.image || '');
  };

  const saveEdit = (id: string) => {
    updateContentItem('tools', id, {
      name: editName.trim(),
      link: editLink.trim(),
      image: editImage.trim(),
    } as Partial<ContentItem>);
    setEditingId(null);
    showSaved();
  };

  const removeTool = (id: string) => {
    if (!confirm('Delete this tool?')) return;
    removeContentItem('tools', id);
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
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Tools & Softwares</h1>
          </div>
          <p className="font-serif text-sm text-gray-500 mt-1 ml-10">
            {items.length} tool{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-teal-600 font-medium">Saved</span>}
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif"
          >
            <Plus className="w-4 h-4" />
            Add Tool
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tools..."
          className="w-full max-w-md px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-serif text-sm font-semibold text-gray-700 mb-4">New Tool</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Tool Name</label>
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. MATLAB"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Tool Link (URL)</label>
              <input
                value={newLink}
                onChange={e => setNewLink(e.target.value)}
                placeholder="https://www.mathworks.com"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Image URL</label>
              <input
                value={newImage}
                onChange={e => setNewImage(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
              />
              {newImage && (
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={newImage}
                    alt="preview"
                    className="w-10 h-10 object-contain rounded-lg border border-gray-200"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <span className="text-xs text-gray-400">Preview</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleAdd}
              disabled={!newName.trim()}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Tool
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
            <Code className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="font-serif text-sm text-gray-400">
              {search ? 'No tools match your search.' : 'No tools yet.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredItems.map(item => {
              const tool = toTool(item);
              return (
                <div key={tool.id} className="px-6 py-4 hover:bg-gray-50 transition-colors group">
                  {editingId === tool.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-serif text-gray-500 mb-1">Name</label>
                          <input
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-serif text-gray-500 mb-1">Link</label>
                          <input
                            value={editLink}
                            onChange={e => setEditLink(e.target.value)}
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-serif text-gray-500 mb-1">Image URL</label>
                          <input
                            value={editImage}
                            onChange={e => setEditImage(e.target.value)}
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
                          />
                        </div>
                      </div>
                      {editImage && (
                        <img
                          src={editImage}
                          alt="preview"
                          className="h-10 object-contain rounded border border-gray-200"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => saveEdit(tool.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs"
                        >
                          <Save className="w-3.5 h-3.5" />
                          Save
                        </button>
                        <button onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {tool.image ? (
                          <img
                            src={tool.image}
                            alt={tool.name}
                            className="w-full h-full object-contain p-1"
                            onError={e => {
                              const img = e.target as HTMLImageElement;
                              img.style.display = 'none';
                              img.parentElement!.classList.add('bg-teal-100');
                              const icon = document.createElement('div');
                              icon.innerHTML = '<svg class="w-6 h-6 text-teal-700" ...>';
                            }}
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-teal-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{tool.name}</p>
                        {tool.link && (
                          <a
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 transition-colors truncate mt-0.5"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span className="truncate">{tool.link}</span>
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEdit(tool)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => removeTool(tool.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
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
