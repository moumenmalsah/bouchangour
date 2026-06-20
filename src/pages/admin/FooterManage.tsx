import { useState } from 'react';
import { useSiteData, type FooterConfig } from '../../contexts/SiteDataContext';
import { Save, Mail, MapPin, BookOpen, Plus, Trash2, Globe } from 'lucide-react';

export default function FooterManage() {
  const { data, updateFooter } = useSiteData();
  const [config, setConfig] = useState<FooterConfig>({ ...data.footer, emails: [...data.footer.emails], affiliations: data.footer.affiliations.map(a => ({ ...a })) });
  const [saved, setSaved] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newAffName, setNewAffName] = useState('');
  const [newAffDesc, setNewAffDesc] = useState('');

  const handleSave = () => {
    updateFooter(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addEmail = () => {
    if (!newEmail) return;
    setConfig(prev => ({ ...prev, emails: [...prev.emails, newEmail] }));
    setNewEmail('');
  };

  const removeEmail = (index: number) => {
    setConfig(prev => ({ ...prev, emails: prev.emails.filter((_, i) => i !== index) }));
  };

  const addAffiliation = () => {
    if (!newAffName) return;
    setConfig(prev => ({
      ...prev,
      affiliations: [...prev.affiliations, { name: newAffName, description: newAffDesc || undefined }],
    }));
    setNewAffName('');
    setNewAffDesc('');
  };

  const removeAffiliation = (index: number) => {
    setConfig(prev => ({ ...prev, affiliations: prev.affiliations.filter((_, i) => i !== index) }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">Footer Management</h1>
          <p className="font-serif text-sm text-gray-500 mt-1">Customize footer content</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-serif"
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-serif text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600" />
              Location
            </h2>
          </div>
          <div className="p-6">
            <input
              value={config.location}
              onChange={e => setConfig(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="Oujda, Morocco"
            />
          </div>
        </div>

        {/* Emails */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-serif text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-600" />
              Emails
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {config.emails.map((email, index) => (
              <div key={index} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors group">
                <div className="flex-1 text-sm font-mono text-teal-600">{email}</div>
                <button
                  onClick={() => removeEmail(index)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <input
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="email@example.com"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
              <button
                onClick={addEmail}
                disabled={!newEmail}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-serif"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-serif text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-600" />
              Copyright
            </h2>
          </div>
          <div className="p-6">
            <input
              value={config.copyright}
              onChange={e => setConfig(prev => ({ ...prev, copyright: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="Dr. Bouchangour Mohammed. All rights reserved."
            />
          </div>
        </div>

        {/* Affiliations */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-serif text-sm font-semibold text-gray-700 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-600" />
              Affiliations
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {config.affiliations.map((aff, index) => (
              <div key={index} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors group">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{aff.name}</p>
                  {aff.description && <p className="text-xs text-gray-500">{aff.description}</p>}
                </div>
                <button
                  onClick={() => removeAffiliation(index)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-gray-100">
            <h3 className="font-serif text-sm font-semibold text-gray-700 mb-3">Add Affiliation</h3>
            <div className="flex items-center gap-3">
              <input
                value={newAffName}
                onChange={e => setNewAffName(e.target.value)}
                placeholder="Organization name"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
              <input
                value={newAffDesc}
                onChange={e => setNewAffDesc(e.target.value)}
                placeholder="Description (optional)"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
              <button
                onClick={addAffiliation}
                disabled={!newAffName}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-serif"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
