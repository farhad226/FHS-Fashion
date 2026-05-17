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
    { id: 'global', name: 'Global Settings', icon: <Layout className="w-4 h-4" /> },
    { id: 'hero', name: 'Hero Section', icon: <Layout className="w-4 h-4" /> },
    { id: 'promotions', name: 'Promotions & Sales', icon: <Tag className="w-4 h-4" /> },
    { id: 'trending', name: 'Trending Section', icon: <Layout className="w-4 h-4" /> },
    { id: 'newsletter', name: 'Newsletter Section', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'featured', name: 'Featured Products', icon: <Layout className="w-4 h-4" /> },
    { id: 'categories', name: 'Home Categories', icon: <Layout className="w-4 h-4" /> },
    { id: 'testimonials', name: 'Testimonials Area', icon: <FileText className="w-4 h-4" /> },
    { id: 'blog', name: 'Blog Section', icon: <FileText className="w-4 h-4" /> },
    { id: 'about', name: 'About Page', icon: <Info className="w-4 h-4" /> },
    { id: 'footer', name: 'Footer Text', icon: <FileText className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    updateCMSData(formData);
    showToast('Website content updated successfully!');
  };

  const updateGlobal = (field: keyof CMSData['global'], value: string) => {
    setFormData(prev => ({ ...prev, global: { ...prev.global, [field]: value } }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateGlobal('logoImage', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
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

  const updateTrending = (field: keyof CMSData['trending'], value: string) => {
    setFormData(prev => ({ ...prev, trending: { ...prev.trending, [field]: value } }));
  };

  const updateFeaturedProducts = (field: keyof CMSData['featuredProducts'], value: string) => {
    setFormData(prev => ({ ...prev, featuredProducts: { ...prev.featuredProducts, [field]: value } }));
  };

  const updateNewsletterImage = (value: string) => {
    setFormData(prev => ({ ...prev, newsletter: { ...prev.newsletter, bgImage: value } }));
  };

  const updateNewsletter = (field: keyof Omit<CMSData['newsletter'], 'bgImage'>, value: string) => {
    setFormData(prev => ({ ...prev, newsletter: { ...prev.newsletter, [field]: value } }));
  };

  const updateTestimonials = (field: keyof CMSData['testimonialsSection'], value: string) => {
    setFormData(prev => ({ ...prev, testimonialsSection: { ...prev.testimonialsSection, [field]: value } }));
  };

  const handleTestimonialChange = (index: number, field: keyof CMSData['testimonials'][0], value: any) => {
    const newTests = [...formData.testimonials];
    newTests[index] = { ...newTests[index], [field]: value };
    setFormData(prev => ({ ...prev, testimonials: newTests }));
  };

  const handleTestimonialAvatarUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleTestimonialChange(index, 'avatar', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateBlog = (field: keyof CMSData['blogSection'], value: string) => {
    setFormData(prev => ({ ...prev, blogSection: { ...prev.blogSection, [field]: value } }));
  };

  const handleBlogPostChange = (index: number, field: keyof CMSData['blogPosts'][0], value: any) => {
    const newPosts = [...formData.blogPosts];
    newPosts[index] = { ...newPosts[index], [field]: value };
    setFormData(prev => ({ ...prev, blogPosts: newPosts }));
  };

  const handleHomeCategoryChange = (index: number, field: string, value: string) => {
    const newCats = [...formData.homeCategories];
    newCats[index] = { ...newCats[index], [field]: value };
    setFormData(prev => ({ ...prev, homeCategories: newCats }));
  };

  const handleHomeCategoryImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleHomeCategoryChange(index, 'image', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewsletterImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateNewsletterImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
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
          {activeTab === 'global' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-8">Global Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center space-x-2">
                       <span>Brand Logo Text</span>
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                      value={formData.global?.logoText || ''}
                      onChange={(e) => updateGlobal('logoText', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4" /> <span>Upload Logo Image</span>
                    </label>
                    <div className="flex gap-4 items-center mb-4">
                      <label className="cursor-pointer bg-black text-white px-6 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-black/80 transition-colors whitespace-nowrap">
                        Upload Logo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                      </label>
                      {formData.global?.logoImage && (
                        <button 
                          onClick={() => updateGlobal('logoImage', '')}
                          className="text-[10px] font-bold text-red-500 uppercase px-4 py-3 border border-red-200 rounded-xl hover:bg-red-50"
                        >
                          Remove Logo
                        </button>
                      )}
                    </div>
                    {formData.global?.logoImage && (
                      <div className="mt-4 rounded-xl overflow-hidden h-24 max-w-xs border border-black/10 shadow-sm flex items-center justify-center bg-gray-100">
                        <img src={formData.global.logoImage} alt="Logo Preview" className="max-h-full object-contain" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

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

          {activeTab === 'trending' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-8">Trending Now Section</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Section Subtitle</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                      value={formData.trending.sectionName}
                      onChange={(e) => updateTrending('sectionName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Main Heading</label>
                    <textarea 
                      rows={2} 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none" 
                      value={formData.trending.heading}
                      onChange={(e) => updateTrending('heading', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Button Text</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                        value={formData.trending.buttonText}
                        onChange={(e) => updateTrending('buttonText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Button URL</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                        value={formData.trending.buttonUrl}
                        onChange={(e) => updateTrending('buttonUrl', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'newsletter' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-8">Newsletter Section</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center space-x-2">
                       <ImageIcon className="w-4 h-4" /> <span>Background Image URL</span>
                    </label>
                    <div className="flex gap-4 items-center mb-4">
                      <input 
                        type="text" 
                        className="flex-1 bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                        value={formData.newsletter.bgImage}
                        onChange={(e) => updateNewsletterImage(e.target.value)}
                        placeholder="Paste image URL..."
                      />
                      <span className="text-xs uppercase font-bold text-black/50">OR</span>
                      <label className="cursor-pointer bg-black text-white px-6 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-black/80 transition-colors whitespace-nowrap">
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleNewsletterImageUpload}
                        />
                      </label>
                    </div>
                    {formData.newsletter.bgImage && (
                      <div className="mt-4 rounded-xl overflow-hidden h-48 border border-black/10 shadow-sm">
                        <img src={formData.newsletter.bgImage} alt="Newsletter Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/5 pt-8">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="space-y-4 border border-black/5 p-4 rounded-xl">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-black/40">Block {num}</h4>
                        <div>
                           <label className="text-[9px] uppercase font-bold tracking-widest mb-1 block">Title</label>
                           <input 
                             type="text" 
                             className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors" 
                             value={(formData.newsletter as any)[`block${num}Title`]}
                             onChange={(e) => updateNewsletter(`block${num}Title` as any, e.target.value)}
                           />
                        </div>
                        <div>
                           <label className="text-[9px] uppercase font-bold tracking-widest mb-1 block">Heading</label>
                           <input 
                             type="text" 
                             className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors" 
                             value={(formData.newsletter as any)[`block${num}Heading`]}
                             onChange={(e) => updateNewsletter(`block${num}Heading` as any, e.target.value)}
                           />
                        </div>
                        <div>
                           <label className="text-[9px] uppercase font-bold tracking-widest mb-1 block">Text</label>
                           <textarea 
                             rows={2}
                             className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors resize-none" 
                             value={(formData.newsletter as any)[`block${num}Text`]}
                             onChange={(e) => updateNewsletter(`block${num}Text` as any, e.target.value)}
                           />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-8">Home Categories Grid</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {formData.homeCategories.map((cat, index) => (
                    <div key={cat.id} className="border border-black/10 p-6 rounded-xl space-y-4 relative">
                      <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 rounded-bl-xl text-[10px] font-bold">POS {index + 1}</div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Category Title</label>
                        <input 
                          type="text" 
                          className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                          value={cat.title}
                          onChange={(e) => handleHomeCategoryChange(index, 'title', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Item Count Text</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                            value={cat.countText}
                            onChange={(e) => handleHomeCategoryChange(index, 'countText', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">URL Path</label>
                          <input 
                            type="text" 
                            className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                            value={cat.url}
                            onChange={(e) => handleHomeCategoryChange(index, 'url', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Background Image</label>
                        {cat.image ? (
                          <div className="relative h-40 rounded-xl overflow-hidden group">
                             <img src={cat.image} className="w-full h-full object-cover" alt="preview" />
                             <button 
                               onClick={() => handleHomeCategoryChange(index, 'image', '')}
                               className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                             >Remove</button>
                          </div>
                        ) : (
                          <label className="flex items-center justify-center h-40 border-2 border-dashed border-black/20 rounded-xl cursor-pointer hover:bg-black/5">
                            <span className="text-xs uppercase font-bold text-black/50 tracking-widest">Upload Image</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleHomeCategoryImageUpload(index, e)} />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-8">Testimonials Area</h3>
                <div className="space-y-6">
                  {/* Section text editing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Section Tagline</label>
                      <input type="text" className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm" value={formData.testimonialsSection.sectionName} onChange={(e) => updateTestimonials('sectionName', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Main Heading</label>
                      <input type="text" className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm" value={formData.testimonialsSection.heading} onChange={(e) => updateTestimonials('heading', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Subheading / Text</label>
                    <textarea rows={2} className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm" value={formData.testimonialsSection.subheading} onChange={(e) => updateTestimonials('subheading', e.target.value)} />
                  </div>
                </div>

                <div className="mt-12 space-y-6">
                  <h4 className="text-md font-bold uppercase tracking-tight">Testimonials List</h4>
                  {formData.testimonials.map((t, index) => (
                    <div key={t.id} className="border border-black/5 p-4 rounded-xl space-y-3">
                      <div className="flex gap-4 items-center">
                        <img src={t.avatar} className="w-12 h-12 rounded-full object-cover border border-black/10" alt="avatar" />
                        <label className="cursor-pointer bg-black text-white px-3 py-1.5 rounded-lg text-[9px] uppercase font-bold tracking-widest hover:bg-black/80">
                          Edit Avatar
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleTestimonialAvatarUpload(index, e)} />
                        </label>
                      </div>
                      <input type="text" className="w-full bg-transparent font-bold text-sm border-none focus:outline-none focus:ring-0" value={t.author} onChange={(e) => handleTestimonialChange(index, 'author', e.target.value)} />
                      <input type="text" className="w-full bg-transparent text-xs text-black/50 border-none focus:outline-none focus:ring-0" value={t.role} onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)} />
                      <textarea className="w-full bg-transparent text-sm italic border-none focus:outline-none focus:ring-0" value={t.quote} onChange={(e) => handleTestimonialChange(index, 'quote', e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-8">Blog Section</h3>
                <div className="space-y-6">
                  {/* Section text editing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Main Heading</label>
                      <input type="text" className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm" value={formData.blogSection.heading} onChange={(e) => updateBlog('heading', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Subheading Description</label>
                      <input type="text" className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm" value={formData.blogSection.subheading} onChange={(e) => updateBlog('subheading', e.target.value)} />
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 space-y-6">
                  <h4 className="text-md font-bold uppercase tracking-tight">Blog Posts List</h4>
                  {formData.blogPosts.map((p, index) => (
                    <div key={p.id} className="border border-black/5 p-4 rounded-xl space-y-3">
                      <input type="text" className="w-full bg-transparent font-bold text-sm" value={p.title} onChange={(e) => handleBlogPostChange(index, 'title', e.target.value)} />
                      <input type="text" className="w-full bg-transparent text-xs text-black/50" value={p.date} onChange={(e) => handleBlogPostChange(index, 'date', e.target.value)} />
                      <textarea className="w-full bg-transparent text-sm" value={p.description} onChange={(e) => handleBlogPostChange(index, 'description', e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'featured' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-8">Featured Products Section</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Section Subtitle</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                      value={formData.featuredProducts.sectionName}
                      onChange={(e) => updateFeaturedProducts('sectionName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Main Heading</label>
                    <textarea 
                      rows={2} 
                      className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none" 
                      value={formData.featuredProducts.heading}
                      onChange={(e) => updateFeaturedProducts('heading', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Button Text</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                        value={formData.featuredProducts.buttonText}
                        onChange={(e) => updateFeaturedProducts('buttonText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Button URL</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                        value={formData.featuredProducts.buttonUrl}
                        onChange={(e) => updateFeaturedProducts('buttonUrl', e.target.value)}
                      />
                    </div>
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
