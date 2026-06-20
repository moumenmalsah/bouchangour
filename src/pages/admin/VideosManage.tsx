import { useState } from 'react';
import { Link } from 'react-router';
import { useSiteData, type ContentItem } from '../../contexts/SiteDataContext';
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Video,
} from 'lucide-react';

interface VideoData extends ContentItem {
  title: string;
  iframe: string;
}

export default function VideosManage() {
  const { data, addContentItem, updateContentItem, removeContentItem } = useSiteData();
  const sectionData = data.content.videos;
  const items = sectionData?.items || [];

  const [saved, setSaved] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newIframe, setNewIframe] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editIframe, setEditIframe] = useState('');

  const toVideo = (item: ContentItem) => item as unknown as VideoData;

  const sortedItems = [...items].sort((a, b) =>
    (toVideo(a).title || '').localeCompare(toVideo(b).title || '')
  );

  const filteredItems = search
    ? sortedItems.filter(item =>
        toVideo(item).title?.toLowerCase().includes(search.toLowerCase())
      )
    : sortedItems;

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetForm = () => { setNewTitle(''); setNewIframe(''); };

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addContentItem('videos', {
      id: `video-${Date.now()}`,
      title: newTitle.trim(),
      iframe: newIframe.trim(),
    } as ContentItem);
    resetForm();
    setShowAddForm(false);
    showSaved();
  };

  const startEdit = (item: ContentItem) => {
    const v = toVideo(item);
    setEditingId(item.id);
    setEditTitle(v.title || '');
    setEditIframe(v.iframe || '');
  };

  const saveEdit = (id: string) => {
    updateContentItem('videos', id, {
      title: editTitle.trim(),
      iframe: editIframe.trim(),
    } as Partial<ContentItem>);
    setEditingId(null);
    showSaved();
  };

  const removeItem = (id: string) => {
    if (!confirm('Delete this video?')) return;
    removeContentItem('videos', id);
    showSaved();
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link to="/idaraton" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Videos</h1>
          </div>
          <p className="font-serif text-sm text-gray-500 mt-1 ml-10">
            {items.length} video{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-teal-600 font-medium">Saved</span>}
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif"
          >
            <Plus className="w-4 h-4" />
            Add Video
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search videos..."
          className="w-full max-w-md px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-serif text-sm font-semibold text-gray-700 mb-4">New Video</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Title</label>
              <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Video title..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Embed Iframe</label>
              <textarea
                value={newIframe}
                onChange={e => setNewIframe(e.target.value)}
                placeholder='<iframe src="https://..." ...></iframe>'
                rows={4}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
              />
            </div>
            {newIframe && (
              <div>
                <label className="block text-xs font-serif text-gray-500 mb-1">Preview</label>
                <div className="border border-gray-200 rounded-lg overflow-hidden aspect-video">
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: newIframe }}
                  />
                </div>
              </div>
            )}
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
            <Video className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="font-serif text-sm text-gray-400">
              {search ? 'No videos match your search.' : 'No videos yet.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredItems.map(item => {
              const video = toVideo(item);
              return (
                <div key={video.id} className="px-6 py-4 hover:bg-gray-50 transition-colors group">
                  {editingId === video.id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-serif text-gray-500 mb-1">Title</label>
                        <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-serif text-gray-500 mb-1">Embed Iframe</label>
                        <textarea value={editIframe} onChange={e => setEditIframe(e.target.value)} rows={3} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs" />
                      </div>
                      {editIframe && (
                        <div className="border border-gray-200 rounded-lg overflow-hidden aspect-video max-w-md">
                          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: editIframe }} />
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <button onClick={() => saveEdit(video.id)} className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs">
                          <Save className="w-3.5 h-3.5" /> Save
                        </button>
                        <button onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="w-40 flex-shrink-0">
                        {video.iframe ? (
                          <div className="border border-gray-200 rounded-lg overflow-hidden aspect-video">
                            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: video.iframe }} />
                          </div>
                        ) : (
                          <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <Video className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{video.title}</p>
                        {video.iframe && (
                          <p className="text-xs text-gray-400 mt-1 truncate font-mono">{video.iframe.slice(0, 100)}...</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                        <button onClick={() => startEdit(video)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => removeItem(video.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
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
