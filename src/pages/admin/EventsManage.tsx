import { useState } from 'react';
import { Link } from 'react-router';
import { useSiteData, type ContentItem } from '../../contexts/SiteDataContext';
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Calendar,
  ExternalLink,
  ImageIcon,
} from 'lucide-react';

interface EventData extends ContentItem {
  title: string;
  image: string;
  imagesLink: string;
  eventLink: string;
}

export default function EventsManage() {
  const { data, addContentItem, updateContentItem, removeContentItem } = useSiteData();
  const sectionData = data.content.events;
  const items = sectionData?.items || [];

  const [saved, setSaved] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newImagesLink, setNewImagesLink] = useState('');
  const [newEventLink, setNewEventLink] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editImagesLink, setEditImagesLink] = useState('');
  const [editEventLink, setEditEventLink] = useState('');

  const toEvent = (item: ContentItem) => item as unknown as EventData;

  const sortedItems = [...items].sort((a, b) =>
    (toEvent(a).title || '').localeCompare(toEvent(b).title || '')
  );

  const filteredItems = search
    ? sortedItems.filter(item =>
        toEvent(item).title?.toLowerCase().includes(search.toLowerCase())
      )
    : sortedItems;

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetForm = () => {
    setNewTitle('');
    setNewImage('');
    setNewImagesLink('');
    setNewEventLink('');
  };

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addContentItem('events', {
      id: `event-${Date.now()}`,
      title: newTitle.trim(),
      image: newImage.trim(),
      imagesLink: newImagesLink.trim(),
      eventLink: newEventLink.trim(),
    } as ContentItem);
    resetForm();
    setShowAddForm(false);
    showSaved();
  };

  const startEdit = (item: ContentItem) => {
    const e = toEvent(item);
    setEditingId(item.id);
    setEditTitle(e.title || '');
    setEditImage(e.image || '');
    setEditImagesLink(e.imagesLink || '');
    setEditEventLink(e.eventLink || '');
  };

  const saveEdit = (id: string) => {
    updateContentItem('events', id, {
      title: editTitle.trim(),
      image: editImage.trim(),
      imagesLink: editImagesLink.trim(),
      eventLink: editEventLink.trim(),
    } as Partial<ContentItem>);
    setEditingId(null);
    showSaved();
  };

  const removeItem = (id: string) => {
    if (!confirm('Delete this event?')) return;
    removeContentItem('events', id);
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
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Events</h1>
          </div>
          <p className="font-serif text-sm text-gray-500 mt-1 ml-10">
            {items.length} event{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-teal-600 font-medium">Saved</span>}
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search events..."
          className="w-full max-w-md px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-serif text-sm font-semibold text-gray-700 mb-4">New Event</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Title</label>
              <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Event title..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Main Image URL</label>
              <input
                value={newImage}
                onChange={e => setNewImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
              />
              {newImage && (
                <img src={newImage} alt="preview" className="mt-2 h-20 object-contain rounded-lg border border-gray-200"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
            </div>
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Images Gallery Link</label>
              <input
                value={newImagesLink}
                onChange={e => setNewImagesLink(e.target.value)}
                placeholder="https://example.com/gallery"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Event Link (optional)</label>
              <input
                value={newEventLink}
                onChange={e => setNewEventLink(e.target.value)}
                placeholder="https://example.com/event"
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
            <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="font-serif text-sm text-gray-400">
              {search ? 'No events match your search.' : 'No events yet.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredItems.map(item => {
              const ev = toEvent(item);
              return (
                <div key={ev.id} className="px-6 py-4 hover:bg-gray-50 transition-colors group">
                  {editingId === ev.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-serif text-gray-500 mb-1">Title</label>
                          <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                        </div>
                        <div>
                          <label className="block text-xs font-serif text-gray-500 mb-1">Image URL</label>
                          <input value={editImage} onChange={e => setEditImage(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs" />
                        </div>
                        <div>
                          <label className="block text-xs font-serif text-gray-500 mb-1">Images Gallery Link</label>
                          <input value={editImagesLink} onChange={e => setEditImagesLink(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs" />
                        </div>
                        <div>
                          <label className="block text-xs font-serif text-gray-500 mb-1">Event Link (optional)</label>
                          <input value={editEventLink} onChange={e => setEditEventLink(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs" />
                        </div>
                      </div>
                      {editImage && (
                        <img src={editImage} alt="preview" className="h-16 object-contain rounded border border-gray-200"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      )}
                      <div className="flex items-center gap-2">
                        <button onClick={() => saveEdit(ev.id)} className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs">
                          <Save className="w-3.5 h-3.5" /> Save
                        </button>
                        <button onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {ev.image ? (
                          <img src={ev.image} alt={ev.title} className="w-full h-full object-cover"
                            onError={e => {
                              const img = e.target as HTMLImageElement;
                              img.style.display = 'none';
                            }} />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-teal-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{ev.title}</p>
                        <div className="flex flex-wrap gap-3 mt-1">
                          {ev.imagesLink && (
                            <a href={ev.imagesLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 transition-colors">
                              <ImageIcon className="w-3 h-3" /> Gallery
                            </a>
                          )}
                          {ev.eventLink && (
                            <a href={ev.eventLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 transition-colors">
                              <ExternalLink className="w-3 h-3" /> Event link
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button onClick={() => startEdit(ev)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => removeItem(ev.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
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
