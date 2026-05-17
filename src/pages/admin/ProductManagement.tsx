import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, X, Upload } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useToast } from '../../context/ToastContext';

// Using mock data for now
const initialProducts = [
  { id: '1', name: 'Premium Oxford Shirt', category: 'Shirts', price: '$89.00', stock: 45, status: 'Active' },
  { id: '2', name: 'Heavyweight Cotton Tee', category: 'T-Shirts', price: '$45.00', stock: 12, status: 'Low Stock' },
  { id: '3', name: 'Tapered Wool Trousers', category: 'Pants', price: '$129.00', stock: 0, status: 'Out of Stock' },
  { id: '4', name: 'Sculptural Eyewear', category: 'Accessories', price: '$189.00', stock: 89, status: 'Active' },
];

export function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { showToast } = useToast();

  // Form State
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Shirts');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [options, setOptions] = useState([{ name: '', values: '' }]);
  const [variants, setVariants] = useState<{id: string, color: string, colorHex?: string, sizes: string, image: string}[]>([{ id: '1', color: '', colorHex: '#000000', sizes: '', image: '' }]);
  const [images, setImages] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setProductName('');
    setCategory('Shirts');
    setPrice('');
    setStock('');
    setOptions([{ name: '', values: '' }]);
    setVariants([{ id: '1', color: '', colorHex: '#000000', sizes: '', image: '' }]);
    setImages([]);
    setEditingId(null);
  };

  const handleAddOption = () => {
    setOptions([...options, { name: '', values: '' }]);
  };

  const handleOptionChange = (index: number, field: 'name' | 'values', value: string) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { id: Date.now().toString(), color: '', colorHex: '#000000', sizes: '', image: '' }]);
  };

  const handleVariantChange = (id: string, field: 'color' | 'sizes' | 'image' | 'colorHex', value: string) => {
    setVariants(variants.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const handleRemoveVariant = (id: string) => {
    setVariants(variants.filter(v => v.id !== id));
  };

  const handleVariantImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleVariantChange(id, 'image', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImages(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveProduct = () => {
    if (!productName || !price) {
      showToast('Please provide at least a product name and price');
      return;
    }

    if (editingId) {
      setProducts(products.map(p => {
        if (p.id === editingId) {
          return {
            ...p,
            name: productName,
            category: category,
            price: `$${parseFloat(price.replace('$', '') || '0').toFixed(2)}`,
            stock: parseInt(stock || '0'),
            status: parseInt(stock || '0') > 10 ? 'Active' : (parseInt(stock || '0') > 0 ? 'Low Stock' : 'Out of Stock')
          };
        }
        return p;
      }));
      showToast('Product updated successfully!');
    } else {
      const newProduct = {
        id: (products.length + 1).toString(),
        name: productName,
        category: category,
        price: `$${parseFloat(price.replace('$', '') || '0').toFixed(2)}`,
        stock: parseInt(stock || '0'),
        status: parseInt(stock || '0') > 10 ? 'Active' : (parseInt(stock || '0') > 0 ? 'Low Stock' : 'Out of Stock')
      };
      setProducts(prev => [newProduct, ...prev]);
      showToast('Product added successfully!');
    }

    setIsAdding(false);
    resetForm();
  };

  const handleEdit = (product: any) => {
    setProductName(product.name);
    setCategory(product.category);
    setPrice(product.price.replace('$', ''));
    setStock(product.stock.toString());
    setOptions([{ name: '', values: '' }]); 
    setVariants([{ id: '1', color: '', colorHex: '#000000', sizes: '', image: '' }]);
    setImages([]);
    setEditingId(product.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    showToast('Product deleted');
  };

  return (
    <div className="p-[15px] md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Product Catalog</h1>
          <p className="text-black/50 text-sm font-medium mt-2">Manage your inventory, prices, and variants.</p>
        </div>
        <button 
          onClick={() => {
            resetForm();
            setIsAdding(true);
          }}
          className="bg-black text-white px-6 py-3 text-sm font-bold flex items-center space-x-2 rounded-xl hover:bg-black/80 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-black/5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#FBFBFB]">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-white border border-black/10 rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 border border-black/10 rounded-xl bg-white hover:bg-black/5 transition-colors text-sm font-bold w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-black/40">Product</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-black/40">Category</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-black/40">Inventory</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-black/40">Price</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-black/40">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-black/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="group border-b border-black/[0.03] hover:bg-[#F9F9F9] transition-colors last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-black/5 rounded-lg flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-bold">{p.name}</p>
                        <p className="text-[10px] font-mono text-black/40">#PRD-{p.id.padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-black/60">{p.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-bold">{p.stock}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold">{p.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full",
                      p.status === 'Active' ? "bg-green-100 text-green-700" : 
                      p.status === 'Low Stock' ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                    )}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button 
                        onClick={() => handleEdit(p)}
                        className="p-2 text-black/40 hover:text-black hover:bg-black/5 rounded-lg transition-colors"
                       >
                        <Edit2 className="w-4 h-4" />
                       </button>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal Placeholder */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <h3 className="text-lg font-black uppercase tracking-tight">Add New Product</h3>
                <button onClick={() => setIsAdding(false)} className="text-black/50 hover:text-black">
                  <MoreVertical className="w-5 h-5 hidden" /> {/* Placeholder for close X if needed, but clicking outside works */}
                  x
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Basic Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Product Name</label>
                      <input 
                        type="text" 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                        placeholder="e.g., Premium Oxford Shirt" 
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest block">Description</label>
                        <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors">✨ Generate with AI</button>
                      </div>
                      <textarea rows={4} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none" placeholder="Describe the product details, materials, and fit..."></textarea>
                    </div>
                  </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Pricing & Inventory</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Regular Price</label>
                      <input 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                        placeholder="0.00" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Sale Price</label>
                      <input type="number" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" placeholder="$0.00" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">SKU</label>
                      <input type="text" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" placeholder="e.g., SH-OXF-WHT-M" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Stock Quantity</label>
                      <input 
                        type="number" 
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" 
                        placeholder="0" 
                      />
                    </div>
                  </div>
                </div>

                {/* Organization & Variants */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Organization & Variants</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Category</label>
                      <input 
                        type="text" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        list="categories"
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                        placeholder="Select or type a custom category"
                      />
                      <datalist id="categories">
                        <option value="Shirts" />
                        <option value="T-Shirts" />
                        <option value="Pants" />
                        <option value="Accessories" />
                      </datalist>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Variants (Colors & Sizes)</label>
                      <div className="border border-black/10 rounded-xl p-4 flex flex-col gap-4 bg-[#F9F9F9]">
                        {variants.map((v) => (
                          <div key={v.id} className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-black/5 relative">
                            {variants.length > 1 && (
                              <button 
                                onClick={() => handleRemoveVariant(v.id)}
                                className="absolute top-4 right-4 p-1 text-black/40 hover:text-red-500 rounded-lg transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mr-6 sm:mr-8">
                              <div>
                                <label className="text-[10px] uppercase font-bold tracking-widest mb-1 block text-black/60">Color</label>
                                <div className="flex gap-2">
                                  <input 
                                    type="color" 
                                    value={v.colorHex || '#000000'}
                                    onChange={(e) => handleVariantChange(v.id, 'colorHex', e.target.value as any)}
                                    className="w-[10%] h-[38px] min-w-[38px] p-0 border-0 rounded-lg cursor-pointer shrink-0 bg-transparent" 
                                  />
                                  <input 
                                    type="text" 
                                    value={v.color}
                                    onChange={(e) => handleVariantChange(v.id, 'color', e.target.value)}
                                    placeholder="Color Name (e.g. Navy)" 
                                    className="w-full bg-[#f9f9f9] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors" 
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold tracking-widest mb-1 block text-black/60">Sizes (comma separated)</label>
                                <input 
                                  type="text" 
                                  value={v.sizes}
                                  onChange={(e) => handleVariantChange(v.id, 'sizes', e.target.value)}
                                  placeholder="e.g. S, M, L, XL" 
                                  className="w-full bg-[#f9f9f9] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors" 
                                />
                              </div>
                            </div>
                            
                            <div>
                               <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block text-black/60">Variant Image</label>
                               {v.image ? (
                                 <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-black/10 group">
                                    <img src={v.image} alt="Variant" className="w-full h-full object-cover" />
                                    <button 
                                      onClick={() => handleVariantChange(v.id, 'image', '')}
                                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                 </div>
                               ) : (
                                 <label className="w-20 h-20 border-2 border-dashed border-black/10 rounded-lg flex flex-col items-center justify-center bg-[#F9F9F9] hover:bg-black/5 cursor-pointer transition-colors text-black/40">
                                    <Upload className="w-4 h-4 mb-1" />
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-center px-1">Upload Image</span>
                                    <input 
                                      type="file" 
                                      className="hidden" 
                                      accept="image/*" 
                                      onChange={(e) => handleVariantImageUpload(v.id, e)} 
                                    />
                                 </label>
                               )}
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={handleAddVariant}
                          className="w-fit text-left text-[10px] font-bold text-black/50 hover:text-black transition-colors mt-2 uppercase tracking-widest"
                        >
                          + Add another variant
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media & SEO */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Media & SEO</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Product Images</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-32 border-2 border-dashed border-black/10 rounded-xl flex flex-col items-center justify-center bg-[#F9F9F9] hover:bg-black/5 cursor-pointer transition-colors text-black/40 mb-4"
                      >
                        <Upload className="w-6 h-6 mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Click to upload images</span>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*" 
                          multiple 
                          onChange={handleImageUpload} 
                        />
                      </div>
                      
                      {images.length > 0 && (
                        <div className="flex gap-4 overflow-x-auto pb-2">
                          {images.map((src, idx) => (
                            <div key={idx} className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border border-black/10 group">
                              <img src={src} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                              <button 
                                onClick={() => handleRemoveImage(idx)}
                                className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Meta Title (SEO)</label>
                      <input type="text" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" placeholder="SEO optimized title..." />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest mb-2 block">Meta Description (SEO)</label>
                      <textarea rows={2} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none" placeholder="Brief description for search engines..."></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-black/5 bg-[#FBFBFB] flex justify-end space-x-4">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-black/60 hover:bg-black/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProduct}
                  className="px-6 py-3 rounded-xl bg-black text-white text-sm font-bold hover:bg-black/80 transition-colors"
                >
                  Save Product
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
