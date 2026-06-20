import { useState } from 'react';
import { Link } from 'react-router';
import { useSiteData, type ContentItem } from '../../contexts/SiteDataContext';
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface ExamData extends ContentItem {
  module: string;
  year: string;
  session: string;
  pdfLink: string;
}

export default function ExamsManage() {
  const { data, addContentItem, updateContentItem, removeContentItem } = useSiteData();
  const sectionData = data.content.exams;
  const items = sectionData?.items || [];

  const [saved, setSaved] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  const [newModule, setNewModule] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newSession, setNewSession] = useState('');
  const [newPdfLink, setNewPdfLink] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editModule, setEditModule] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editSession, setEditSession] = useState('');
  const [editPdfLink, setEditPdfLink] = useState('');

  const toExam = (item: ContentItem) => item as unknown as ExamData;

  const sortedItems = [...items].sort((a, b) => {
    const cmp = (toExam(a).module || '').localeCompare(toExam(b).module || '');
    if (cmp !== 0) return cmp;
    return (toExam(b).year || '').localeCompare(toExam(a).year || '');
  });

  const filteredItems = search
    ? sortedItems.filter(item => {
        const e = toExam(item);
        return (
          e.module?.toLowerCase().includes(search.toLowerCase()) ||
          e.year?.toLowerCase().includes(search.toLowerCase()) ||
          e.session?.toLowerCase().includes(search.toLowerCase())
        );
      })
    : sortedItems;

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetForm = () => {
    setNewModule('');
    setNewYear('');
    setNewSession('');
    setNewPdfLink('');
  };

  const handleAdd = () => {
    if (!newModule.trim()) return;
    const exam: ContentItem = {
      id: `exam-${Date.now()}`,
      module: newModule.trim(),
      year: newYear.trim(),
      session: newSession.trim(),
      pdfLink: newPdfLink.trim(),
    };
    addContentItem('exams', exam);
    resetForm();
    setShowAddForm(false);
    showSaved();
  };

  const startEdit = (item: ContentItem) => {
    const e = toExam(item);
    setEditingId(item.id);
    setEditModule(e.module || '');
    setEditYear(e.year || '');
    setEditSession(e.session || '');
    setEditPdfLink(e.pdfLink || '');
  };

  const saveEdit = (id: string) => {
    updateContentItem('exams', id, {
      module: editModule.trim(),
      year: editYear.trim(),
      session: editSession.trim(),
      pdfLink: editPdfLink.trim(),
    } as Partial<ContentItem>);
    setEditingId(null);
    showSaved();
  };

  const removeExam = (id: string) => {
    if (!confirm('Delete this exam?')) return;
    removeContentItem('exams', id);
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
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Exams</h1>
          </div>
          <p className="font-serif text-sm text-gray-500 mt-1 ml-10">
            {items.length} exam{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-teal-600 font-medium">Saved</span>}
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif"
          >
            <Plus className="w-4 h-4" />
            Add Exam
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by module, year, or session..."
          className="w-full max-w-md px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-serif text-sm font-semibold text-gray-700 mb-4">New Exam</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Module</label>
              <input
                value={newModule}
                onChange={e => setNewModule(e.target.value)}
                placeholder="e.g. Mathématiques 1"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Year</label>
              <input
                value={newYear}
                onChange={e => setNewYear(e.target.value)}
                placeholder="e.g. 2024/2025"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Session</label>
              <input
                value={newSession}
                onChange={e => setNewSession(e.target.value)}
                placeholder="e.g. Session Normale / Rattrapage"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1">Google Drive PDF Link</label>
              <input
                value={newPdfLink}
                onChange={e => setNewPdfLink(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              disabled={!newModule.trim()}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Exam
            </button>
            <button
              onClick={() => { setShowAddForm(false); resetForm(); }}
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
            <FileText className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="font-serif text-sm text-gray-400">
              {search ? 'No exams match your search.' : 'No exams yet.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredItems.map(item => {
              const exam = toExam(item);
              return (
                <div key={exam.id} className="px-6 py-4 hover:bg-gray-50 transition-colors group">
                  {editingId === exam.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-serif text-gray-500 mb-1">Module</label>
                          <input
                            value={editModule}
                            onChange={e => setEditModule(e.target.value)}
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-serif text-gray-500 mb-1">Year</label>
                          <input
                            value={editYear}
                            onChange={e => setEditYear(e.target.value)}
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-serif text-gray-500 mb-1">Session</label>
                          <input
                            value={editSession}
                            onChange={e => setEditSession(e.target.value)}
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-serif text-gray-500 mb-1">Google Drive PDF Link</label>
                          <input
                            value={editPdfLink}
                            onChange={e => setEditPdfLink(e.target.value)}
                            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => saveEdit(exam.id)}
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
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-teal-700" />
                      </div>
                      <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{exam.module}</p>
                        </div>
                        <span className="text-xs text-gray-500">{exam.year}</span>
                        <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded inline-block w-fit">{exam.session}</span>
                        <div className="flex items-center gap-2 min-w-0">
                          {exam.pdfLink ? (
                            <a
                              href={exam.pdfLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 transition-colors truncate"
                            >
                              <ExternalLink className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">Open PDF</span>
                            </a>
                          ) : (
                            <span className="text-xs text-gray-400 italic">No link</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(exam)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => removeExam(exam.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
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
