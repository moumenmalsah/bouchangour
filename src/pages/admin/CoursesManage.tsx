import { useState } from 'react';
import { Link } from 'react-router';
import { useSiteData, type ContentItem } from '../../contexts/SiteDataContext';
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  BookOpen,
  Clock,
  ChevronDown,
  ChevronRight,
  FileText,
  ExternalLink,
  GripVertical,
} from 'lucide-react';

interface Chapter {
  name: string;
  pdfLink: string;
}

interface CourseData extends ContentItem {
  name: string;
  hours: string;
  chapters: Chapter[];
}

export default function CoursesManage() {
  const { data, addContentItem, updateContentItem, removeContentItem } = useSiteData();
  const section = 'courses';
  const sectionData = data.content[section];
  const items = sectionData?.items || [];

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  const [newName, setNewName] = useState('');
  const [newHours, setNewHours] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editHours, setEditHours] = useState('');

  const toCourse = (item: ContentItem) => item as unknown as CourseData;

  const sortedItems = [...items].sort(
    (a, b) => (toCourse(a).name || '').localeCompare(toCourse(b).name || '')
  );

  const filteredItems = search
    ? sortedItems.filter(item =>
        toCourse(item).name?.toLowerCase().includes(search.toLowerCase())
      )
    : sortedItems;

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddCourse = () => {
    if (!newName.trim()) return;
    const course: ContentItem = {
      id: `course-${Date.now()}`,
      name: newName.trim(),
      hours: newHours.trim() || 'N/A',
      chapters: [],
    };
    addContentItem('courses', course);
    setNewName('');
    setNewHours('');
    setShowAddForm(false);
    showSaved();
  };

  const startEdit = (item: ContentItem) => {
    const course = toCourse(item);
    setEditingId(item.id);
    setEditName(course.name || '');
    setEditHours(course.hours || '');
  };

  const saveEdit = (id: string) => {
    updateContentItem('courses', id, {
      name: editName.trim(),
      hours: editHours.trim() || 'N/A',
    } as Partial<ContentItem>);
    setEditingId(null);
    showSaved();
  };

  const findCourse = (courseId: string) => {
    const item = items.find(i => i.id === courseId);
    return item ? toCourse(item) : undefined;
  };

  const addChapter = (courseId: string) => {
    const course = findCourse(courseId);
    if (!course) return;
    const newChapter: Chapter = { name: '', pdfLink: '' };
    const updatedChapters = [...course.chapters, newChapter];
    updateContentItem('courses', courseId, { chapters: updatedChapters } as unknown as Partial<ContentItem>);
    showSaved();
  };

  const updateChapter = (courseId: string, chapterIndex: number, field: keyof Chapter, value: string) => {
    const course = findCourse(courseId);
    if (!course) return;
    const updatedChapters = [...course.chapters];
    updatedChapters[chapterIndex] = { ...updatedChapters[chapterIndex], [field]: value };
    updateContentItem('courses', courseId, { chapters: updatedChapters } as unknown as Partial<ContentItem>);
  };

  const removeChapter = (courseId: string, chapterIndex: number) => {
    const course = findCourse(courseId);
    if (!course) return;
    const updatedChapters = course.chapters.filter((_, i) => i !== chapterIndex);
    updateContentItem('courses', courseId, { chapters: updatedChapters } as unknown as Partial<ContentItem>);
    showSaved();
  };

  const removeCourse = (id: string) => {
    if (!confirm('Delete this course?')) return;
    removeContentItem('courses', id);
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
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Courses</h1>
          </div>
          <p className="font-serif text-sm text-gray-500 mt-1 ml-10">
            {items.length} course{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-teal-600 font-medium">Saved</span>}
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif"
          >
            <Plus className="w-4 h-4" />
            Add Course
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full max-w-md px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-serif text-sm font-semibold text-gray-700 mb-4">New Course</h3>
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
              <label className="block text-xs font-serif text-gray-500 mb-1">Hours</label>
              <input
                value={newHours}
                onChange={e => setNewHours(e.target.value)}
                placeholder="e.g. 45h"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddCourse}
              disabled={!newName.trim()}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Course
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
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="font-serif text-sm text-gray-400">
              {search ? 'No courses match your search.' : 'No courses yet. Click "Add Course" to create one.'}
            </p>
          </div>
        ) : (
          filteredItems.map(item => {
            const course = item as unknown as CourseData;
            const isExpanded = expandedId === course.id;
            const chapterCount = course.chapters?.length || 0;
            const hasChapters = chapterCount > 0;

            return (
              <div key={course.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : course.id)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  {editingId === course.id ? (
                    <div className="flex-1 flex items-center gap-3">
                      <input
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        placeholder="Course name"
                      />
                      <input
                        value={editHours}
                        onChange={e => setEditHours(e.target.value)}
                        className="w-24 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        placeholder="Hours"
                      />
                      <button
                        onClick={() => saveEdit(course.id)}
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
                        <BookOpen className="w-5 h-5 text-teal-700" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-base font-semibold text-gray-900 truncate">
                          {course.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {course.hours}
                          </span>
                          <span className="text-xs text-gray-400">|</span>
                          <span className="text-xs text-teal-600">
                            {chapterCount} chapter{chapterCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => startEdit(course)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeCourse(course.id)}
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
                      <h4 className="font-serif text-sm font-semibold text-gray-700">Chapters</h4>
                      <button
                        onClick={() => addChapter(course.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-teal-600 transition-colors text-xs font-serif"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Chapter
                      </button>
                    </div>

                    {!hasChapters ? (
                      <p className="text-xs text-gray-400 text-center py-4">No chapters yet. Click "Add Chapter" to add one.</p>
                    ) : (
                      <div className="space-y-2">
                        {course.chapters.map((chapter, chIndex) => (
                          <div
                            key={chIndex}
                            className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-3"
                          >
                            <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                            <FileText className="w-4 h-4 text-teal-500 flex-shrink-0" />

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                value={chapter.name}
                                onChange={e => updateChapter(course.id, chIndex, 'name', e.target.value)}
                                placeholder="Chapter name"
                                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  value={chapter.pdfLink}
                                  onChange={e => updateChapter(course.id, chIndex, 'pdfLink', e.target.value)}
                                  placeholder="Google Drive PDF link"
                                  className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono text-xs"
                                />
                                {chapter.pdfLink && (
                                  <a
                                    href={chapter.pdfLink}
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
                              onClick={() => removeChapter(course.id, chIndex)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                              title="Remove chapter"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {hasChapters && (
                      <div className="mt-3 text-right">
                        <span className="text-[10px] text-gray-400">Changes are saved automatically</span>
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
