import { useState } from 'react';
import { Link } from 'react-router';
import { useSiteData, type ContentItem } from '../../contexts/SiteDataContext';
import { Plus, Trash2, Save, ArrowLeft, Users, Mail, BookOpen } from 'lucide-react';

interface TeacherData extends ContentItem {
  name: string;
  title: string;
  email: string;
  photo: string;
  specialization: string;
}

const emptyTeacher = (): TeacherData => ({
  id: crypto.randomUUID(),
  name: '',
  title: '',
  email: '',
  photo: '',
  specialization: '',
});

export default function TeachersManage() {
  const { data, addContentItem, updateContentItem, removeContentItem } = useSiteData();
  const sectionData = data.content.teachers;
  const items = (sectionData?.items || []) as TeacherData[];

  const [saved, setSaved] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  const [newSpecialization, setNewSpecialization] = useState('');

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhoto, setEditPhoto] = useState('');
  const [editSpecialization, setEditSpecialization] = useState('');

  const filtered = items.filter(t =>
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newName) return;
    addContentItem('teachers', { ...emptyTeacher(), name: newName, title: newTitle, email: newEmail, photo: newPhoto, specialization: newSpecialization });
    setNewName(''); setNewTitle(''); setNewEmail(''); setNewPhoto(''); setNewSpecialization('');
    setShowAddForm(false);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const startEdit = (t: TeacherData) => {
    setEditId(t.id);
    setEditName(t.name);
    setEditTitle(t.title);
    setEditEmail(t.email);
    setEditPhoto(t.photo);
    setEditSpecialization(t.specialization);
  };

  const saveEdit = () => {
    if (!editId) return;
    updateContentItem('teachers', editId, { name: editName, title: editTitle, email: editEmail, photo: editPhoto, specialization: editSpecialization });
    setEditId(null);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const handleRemove = (id: string) => {
    removeContentItem('teachers', id);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Teachers Management</h1>
          <p className="font-serif text-sm text-gray-500 mt-1">Manage the teachers list</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-teal-600 font-serif">Saved!</span>}
          <button onClick={() => setShowAddForm(true)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif">
            <Plus className="w-4 h-4" />Add Teacher
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
          <h2 className="font-serif text-sm font-semibold text-gray-700 flex items-center gap-2"><Users className="w-4 h-4 text-teal-600" />New Teacher</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Name *" className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title (Professor, Dr., etc.)" className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
            <input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="Email" className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
            <input value={newPhoto} onChange={e => setNewPhoto(e.target.value)} placeholder="Photo URL" className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
            <div className="md:col-span-2"><input value={newSpecialization} onChange={e => setNewSpecialization(e.target.value)} placeholder="Specialization" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" /></div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button onClick={handleAdd} disabled={!newName} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 text-sm font-serif">Add</button>
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Users className="w-4 h-4 text-teal-600" />
          <span className="font-serif text-sm font-semibold text-gray-700">{items.length} Teacher{items.length !== 1 ? 's' : ''}</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="ml-auto px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 w-48" />
        </div>
        <div className="divide-y divide-gray-100">
          {filtered.map((teacher) => (
            <div key={teacher.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-teal-100 overflow-hidden flex-shrink-0">
                {teacher.photo ? (
                  <img src={teacher.photo} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><BookOpen className="w-5 h-5 text-teal-400" /></div>
                )}
              </div>
              {editId === teacher.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input value={editName} onChange={e => setEditName(e.target.value)} className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
                  <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
                  <input value={editEmail} onChange={e => setEditEmail(e.target.value)} className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
                  <input value={editSpecialization} onChange={e => setEditSpecialization(e.target.value)} className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
                  <div className="md:col-span-2 flex gap-2"><button onClick={saveEdit} className="px-3 py-1 text-xs bg-teal-600 text-white rounded-lg">Save</button><button onClick={() => setEditId(null)} className="px-3 py-1 text-xs text-gray-500">Cancel</button></div>
                </div>
              ) : (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-serif font-semibold text-gray-900">{teacher.name}</p>
                    <p className="text-xs font-serif text-teal-600">{teacher.title}</p>
                    {teacher.specialization && <p className="text-xs font-serif text-gray-500">{teacher.specialization}</p>}
                    {teacher.email && <p className="text-xs font-serif text-gray-400 mt-0.5">{teacher.email}</p>}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(teacher)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Edit">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => handleRemove(teacher.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Remove"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-6 text-center text-sm font-serif text-gray-400">No teachers found</div>
          )}
        </div>
      </div>
    </div>
  );
}
