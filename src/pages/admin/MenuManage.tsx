import { useState } from 'react';
import { useSiteData, type NavLink } from '../../contexts/SiteDataContext';
import { Menu, Plus, Trash2, GripVertical, ArrowUp, ArrowDown, Save } from 'lucide-react';

export default function MenuManage() {
  const { data, updateNavLinks, addNavLink, removeNavLink } = useSiteData();
  const [links, setLinks] = useState<NavLink[]>([...data.navLinks]);
  const [newPath, setNewPath] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editPath, setEditPath] = useState('');
  const [editLabel, setEditLabel] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateNavLinks(links);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newLinks = [...links];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newLinks.length) return;
    [newLinks[index], newLinks[target]] = [newLinks[target], newLinks[index]];
    setLinks(newLinks);
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditPath(links[index].path);
    setEditLabel(links[index].label);
  };

  const saveEdit = (index: number) => {
    const newLinks = [...links];
    newLinks[index] = { path: editPath, label: editLabel };
    setLinks(newLinks);
    setEditingIndex(null);
  };

  const handleAdd = () => {
    if (!newPath || !newLabel) return;
    addNavLink({ path: newPath.startsWith('/') ? newPath : `/${newPath}`, label: newLabel });
    setLinks(prev => [...prev, { path: newPath.startsWith('/') ? newPath : `/${newPath}`, label: newLabel }]);
    setNewPath('');
    setNewLabel('');
  };

  const handleRemove = (index: number) => {
    const path = links[index].path;
    removeNavLink(path);
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Menu Management</h1>
          <p className="font-serif text-sm text-gray-500 mt-1">Add, remove, reorder navigation links</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif"
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-serif text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Menu className="w-4 h-4 text-teal-600" />
            Current Menu Links
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {links.map((link, index) => (
            <div key={link.path} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors group">
              <div className="text-gray-300 cursor-grab">
                <GripVertical className="w-4 h-4" />
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === links.length - 1}
                  className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {editingIndex === index ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    value={editPath}
                    onChange={e => setEditPath(e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono"
                    placeholder="/path"
                  />
                  <input
                    value={editLabel}
                    onChange={e => setEditLabel(e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    placeholder="Label"
                  />
                  <button
                    onClick={() => saveEdit(index)}
                    className="px-3 py-1 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-mono text-teal-600">{link.path}</span>
                    <span className="text-sm text-gray-900 ml-3">{link.label}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEdit(index)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleRemove(index)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-100">
          <h3 className="font-serif text-sm font-semibold text-gray-700 mb-3">Add New Link</h3>
          <div className="flex items-center gap-3">
            <input
              value={newPath}
              onChange={e => setNewPath(e.target.value)}
              placeholder="/path"
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono"
            />
            <input
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              placeholder="Link label"
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
            <button
              onClick={handleAdd}
              disabled={!newPath || !newLabel}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-serif"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
