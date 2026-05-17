import { Plus, Image as ImageIcon, Layout, Type, Link as LinkIcon, Trash2, Tag, Info, FileText } from 'lucide-react';
import { useState } from 'react';
import { useStorefront, CMSData } from '../../context/StorefrontContext';
import { useToast } from '../../context/ToastContext';

export function StorefrontCMS() {
  const { cmsData, updateCMSData } = useStorefront();
  const { showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState<CMSData>(cmsData);

  const tabs = [
    { id: 'hero', name: 'Hero Section', icon: <Layout className="w-4 h-4" /> },
    { id: 'promotions', name: 'Promotions & Sales', icon: <Tag className="w-4 h-4" /> },
    { id: 'about', name: 'About Page', icon: <Info className="w-4 h-4" /> },
    { id: 'footer', name: 'Footer Text', icon: <FileText className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    updateCMSData(formData);
    showToast('Website content updated successfully!');
  };

  const updateHero = (field: keyof CMSData['hero'], value: string) => {
    setFormData(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateHero('bgImage', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateFlashSale = (field: keyof CMSData['flashSale'], value: string) => {
    setFormData(prev => ({ ...prev, flashSale: { ...prev.flashSale, [field]: value } }));
  };

  const updateAbout = (field: keyof CMSData['about'], value: string) => {
    setFormData(prev => ({ ...prev, about: { ...prev.about, [field]: value } }));
  };

  const updateFooter = (value: string) => {
    setFormData(prev => ({ ...prev, footer: { ...prev.footer, description: value } }));
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 flex flex-col h-[calc(100vh-4rem)] md:h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Storefront CMS</h1>
          <p className="text-black/50 text-sm font-medium mt-2">Manage all website content deeply from here.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-black text-white px-8 py-4 text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-black/80 transition-colors"
        >
          Publish Changes
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden flex flex-1 w-full flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 bg-[#FBFBFB] border-b md:border-b-0 md:border-r border-black/5 p-4 md:p-6 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto flex-shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left flex items-center space-x-3 px-4 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors flex-shrink-0 ${
                activeTab === tab.id ? 'bg-black text-white' : 'text-black/50 hover:bg-black/5 hover:text-black'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">
          {activeTab === 'hero' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-8">Hero Section (Home Page)</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center space-x-2">
                      <Type className="w-4 h-4" /> <span>Main Heading</span>
                    </label>
                    <textarea 
                      rows={2}
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none" 
                      value={formData.hero.heading}
                      onChange={(e) => updateHero('heading', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center space-x-2">
                      <Type className="w-4 h-4" /> <span>Subheading / Description</span>
                    </label>
                    <textarea 
                      rows={3} 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none" 
                      value={formData.hero.subheading}
                      onChange={(e) => updateHero('subheading', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center space-x-2">
                        <Type className="w-4 h-4" /> <span>Button Text</span>
                      </label>
                      <input 
                        type="text" 
                        className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                        value={formData.hero.buttonText}
                        onChange={(e) => updateHero('buttonText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center space-x-2">
                        <LinkIcon className="w-4 h-4" /> <span>Button URL</span>
                      </label>
                      <input 
                        type="text" 
                        className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                        value={formData.hero.buttonUrl}
                        onChange={(e) => updateHero('buttonUrl', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4" /> <span>Background Image URL</span>
                    </label>
                    <div className="flex gap-4 items-center mb-4">
                      <input 
                        type="text" 
                        className="flex-1 bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                        value={formData.hero.bgImage}
                        onChange={(e) => updateHero('bgImage', e.target.value)}
                        placeholder="Paste image URL..."
                      />
                      <span className="text-xs uppercase font-bold text-black/50">OR</span>
                      <label className="cursor-pointer bg-black text-white px-6 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-black/80 transition-colors whitespace-nowrap">
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    {formData.hero.bgImage && (
                      <div className="mt-4 rounded-xl overflow-hidden h-48 border border-black/10 shadow-sm">
                        <img src={formData.hero.bgImage} alt="Hero Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'promotions' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-8">Flash Sale Banner</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Heading</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                      value={formData.flashSale.heading}
                      onChange={(e) => updateFlashSale('heading', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Subheading text</label>
                    <textarea 
                      rows={2} 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none" 
                      value={formData.flashSale.subheading}
                      onChange={(e) => updateFlashSale('subheading', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Discount Taglet (e.g. 50% OFF)</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                      value={formData.flashSale.discountText}
                      onChange={(e) => updateFlashSale('discountText', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-8">About Us Page Content</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Main Title Heading</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                      value={formData.about.heading}
                      onChange={(e) => updateAbout('heading', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Brand Description & Story</label>
                    <textarea 
                      rows={6} 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none" 
                      value={formData.about.description}
                      onChange={(e) => updateAbout('description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-8">Footer Branding</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Company Bio Summary (Shows below logo)</label>
                    <textarea 
                      rows={4} 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none" 
                      value={formData.footer.description}
                      onChange={(e) => updateFooter(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
