import { useState } from 'react';
import { useStorefront } from '../../context/StorefrontContext';
import { useToast } from '../../context/ToastContext';
import { Code } from 'lucide-react';

export function CustomCSS() {
  const { cmsData, updateCMSData } = useStorefront();
  const { showToast } = useToast();
  const [css, setCss] = useState(cmsData.customCSS || '');

  const handleSave = () => {
    updateCMSData({ ...cmsData, customCSS: css });
    showToast('Custom CSS saved successfully!');
  };

  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Custom CSS</h1>
          <p className="text-black/50 text-sm font-medium mt-2">Manage website styling with custom CSS.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-black text-white px-8 py-4 text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-black/80 transition-colors"
        >
          Save & Apply
        </button>
      </div>
      <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-8">
        <label className="text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center space-x-2">
            <Code className="w-4 h-4" /> <span>CSS Code</span>
        </label>
        <textarea 
          rows={20}
          className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-black transition-colors" 
          value={css}
          onChange={(e) => setCss(e.target.value)}
          placeholder="e.g. body { background: #f0f0f0; }"
        />
      </div>
    </div>
  );
}
