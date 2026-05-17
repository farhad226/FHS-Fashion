import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingBag, 
  Plus, 
  Search, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  LayoutGrid,
  List,
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Variation {
  id: string;
  size: string;
  color: string;
  price: string;
  stock: number;
  image: string;
}

export function AdminDashboard() {
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Form State
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>(['']);
  const [variations, setVariations] = useState<Variation[]>([
    { id: '1', size: 'M', color: 'Black', price: '', stock: 0, image: '' }
  ]);

  const stats = [
    { name: 'Revenue', value: '$84,230', change: '+12.5%', trend: 'up' },
    { name: 'Total Orders', value: '1,240', change: '+4.2%', trend: 'up' },
    { name: 'Active Customers', value: '4,890', change: '-2.1%', trend: 'down' },
    { name: 'Retention Rate', value: '24%', change: '+0.5%', trend: 'up' },
  ];

  const recentProducts = [
    { id: 1, name: 'Premium Oxford Shirt', category: 'Shirts', price: '$89.00', stock: 45, status: 'Active' },
    { id: 2, name: 'Heavyweight Cotton Tee', category: 'Essentials', price: '$45.00', stock: 12, status: 'Low Stock' },
    { id: 3, name: 'Tapered Wool Trousers', category: 'Pants', price: '$129.00', stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Sculptural Eyewear', category: 'Accessories', price: '$189.00', stock: 89, status: 'Active' },
  ];

  const handleAddImage = () => setImages([...images, '']);
  const handleRemoveImage = (index: number) => setImages(images.filter((_, i) => i !== index));
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleAddVariation = () => {
    setVariations([
      ...variations,
      { id: Date.now().toString(), size: '', color: '', price: '', stock: 0, image: '' }
    ]);
  };

  const handleRemoveVariation = (id: string) => {
    setVariations(variations.filter(v => v.id !== id));
  };

  const handleVariationChange = (id: string, field: keyof Variation, value: string | number) => {
    setVariations(variations.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ productName, category, description, images, variations });
    setIsAddModalOpen(false);
  };

  return (
    <div className="pt-32 md:pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <span className="w-12 h-[1px] bg-black/20" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40">Studio Administration</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-tight md:leading-[0.8]">
            Systems <br /> <span className="italic font-light text-black/40">Overview</span>
          </h1>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-black text-white px-8 py-5 text-[11px] uppercase tracking-[0.3em] font-bold flex items-center space-x-3 hover:pr-12 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-24">
        {stats.map((stat) => (
          <div key={stat.name} className="p-8 border border-black/5 bg-[#FBFBFB] group hover:border-black transition-all">
            <span className="text-[9px] uppercase tracking-[0.4em] text-black/30 font-bold block mb-6">{stat.name}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
              <div className={cn(
                "flex items-center space-x-1 text-[10px] font-bold",
                stat.trend === 'up' ? "text-green-600" : "text-red-500"
              )}>
                <span>{stat.change}</span>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Management Section */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-6 md:gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 w-full md:w-auto">
            <h2 className="text-sm uppercase tracking-[0.4em] font-bold">Catalog Management</h2>
            <div className="flex items-center border border-black/10 px-4 py-2 bg-white w-full sm:w-auto">
              <Search className="w-3.5 h-3.5 text-black/30 mr-3" />
              <input 
                type="text" 
                placeholder="PROD-ID SEARCH..." 
                className="bg-transparent outline-none text-[10px] font-bold tracking-widest uppercase flex-1 sm:w-48"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 border border-black/5 p-1">
            <button 
              onClick={() => setView('grid')}
              className={cn("p-2 transition-colors", view === 'grid' ? "bg-black text-white" : "hover:bg-black/5")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn("p-2 transition-colors", view === 'list' ? "bg-black text-white" : "hover:bg-black/5")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table/List */}
        <div className="border border-black/[0.03] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 bg-[#FBFBFB]">
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] font-bold text-black/40">Product Description</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] font-bold text-black/40">Category</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] font-bold text-black/40">Inventory</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] font-bold text-black/40">Price</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] font-bold text-black/40">Logistics</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] font-bold text-black/40"></th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => (
                <tr key={p.id} className="group border-b border-black/[0.03] hover:bg-black/[0.01] transition-colors">
                  <td className="px-8 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-16 bg-[#F6F6F6] flex-shrink-0 grayscale"></div>
                      <div>
                        <p className="text-[11px] uppercase tracking-widest font-bold mb-1">{p.name}</p>
                        <p className="text-[9px] font-mono text-black/30">#PRD-0{p.id}K29</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <span className="text-[10px] uppercase tracking-widest font-medium opacity-60">{p.category}</span>
                  </td>
                  <td className="px-8 py-8">
                    <span className="text-[10px] font-mono font-bold">{p.stock} Units</span>
                  </td>
                  <td className="px-8 py-8">
                    <span className="text-[10px] font-bold">{p.price}</span>
                  </td>
                  <td className="px-8 py-8">
                    <span className={cn(
                      "px-3 py-1 text-[8px] uppercase tracking-[0.2em] font-bold",
                      p.status === 'Active' ? "bg-green-50 text-green-700" : 
                      p.status === 'Low Stock' ? "bg-orange-50 text-orange-700" : "bg-red-50 text-red-700"
                    )}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-8 py-8 text-right">
                    <button className="p-2 hover:bg-black hover:text-white transition-all rounded-full border border-transparent hover:border-black">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/80 backdrop-blur-md px-10 py-8 border-b border-black/5 flex items-center justify-between z-10">
                <h3 className="text-xl font-serif text-black italic">Catalog Entrance</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-black hover:text-white transition-all rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-12">
                {/* General Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Essential Metrics</p>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Identity</label>
                        <input 
                          type="text" 
                          placeholder="e.g., Premium Oxford Shirt"
                          className="w-full bg-[#FBFBFB] border border-black/5 px-4 py-4 text-[11px] font-bold uppercase tracking-widest focus:border-black transition-colors outline-none"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Classification</label>
                        <select 
                          className="w-full bg-[#FBFBFB] border border-black/5 px-4 py-4 text-[11px] font-bold uppercase tracking-widest focus:border-black transition-colors outline-none appearance-none"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          <option value="Shirts">Shirts</option>
                          <option value="T-Shirts">T-Shirts</option>
                          <option value="Pants">Pants</option>
                          <option value="Outerwear">Outerwear</option>
                          <option value="Accessories">Accessories</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Narrative</p>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Deep Description</label>
                      <textarea 
                        rows={4}
                        placeholder="Detail the materials, the drape, the story..."
                        className="w-full bg-[#FBFBFB] border border-black/5 px-4 py-4 text-[11px] font-medium leading-relaxed focus:border-black transition-colors outline-none resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Multiple Images Support */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Visual Assets</p>
                    <button 
                      type="button"
                      onClick={handleAddImage}
                      className="text-[9px] uppercase tracking-widest font-bold text-black/60 hover:text-black flex items-center space-x-2"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Image URL</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <div className="aspect-[3/4] bg-[#F9F9F9] border border-dashed border-black/10 flex flex-col items-center justify-center p-4">
                          {img ? (
                            <img src={img} className="w-full h-full object-cover mix-blend-multiply" alt="Preview" />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-black/10 mb-4" />
                          )}
                          <input 
                            type="text" 
                            placeholder="IMAGE CDN URL..."
                            className="w-full bg-white border border-black/5 px-3 py-2 text-[8px] font-bold uppercase tracking-widest focus:border-black transition-colors outline-none mt-auto"
                            value={img}
                            onChange={(e) => handleImageChange(idx, e.target.value)}
                          />
                        </div>
                        {images.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Variations Management */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Product Variations</p>
                    <button 
                      type="button"
                      onClick={handleAddVariation}
                      className="text-[9px] uppercase tracking-widest font-bold border border-black px-4 py-2 hover:bg-black hover:text-white transition-all flex items-center space-x-2"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Variation</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {variations.map((v) => (
                      <div key={v.id} className="p-6 border border-black/5 bg-[#FBFBFB] grid grid-cols-1 md:grid-cols-6 gap-4 items-end group relative">
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-widest font-black text-black/20">Size</label>
                          <input 
                            type="text" 
                            placeholder="S, M, L..."
                            className="w-full bg-white border border-black/5 px-3 py-3 text-[10px] font-bold uppercase focus:border-black outline-none"
                            value={v.size}
                            onChange={(e) => handleVariationChange(v.id, 'size', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-widest font-black text-black/20">Color</label>
                          <input 
                            type="text" 
                            placeholder="Black, Navy..."
                            className="w-full bg-white border border-black/5 px-3 py-3 text-[10px] font-bold uppercase focus:border-black outline-none"
                            value={v.color}
                            onChange={(e) => handleVariationChange(v.id, 'color', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-widest font-black text-black/20">Price</label>
                          <input 
                            type="text" 
                            placeholder="$0.00"
                            className="w-full bg-white border border-black/5 px-3 py-3 text-[10px] font-bold uppercase focus:border-black outline-none"
                            value={v.price}
                            onChange={(e) => handleVariationChange(v.id, 'price', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase tracking-widest font-black text-black/20">Stock</label>
                          <input 
                            type="number" 
                            className="w-full bg-white border border-black/5 px-3 py-3 text-[10px] font-bold uppercase focus:border-black outline-none"
                            value={v.stock}
                            onChange={(e) => handleVariationChange(v.id, 'stock', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-[8px] uppercase tracking-widest font-black text-black/20">Variation Image (Link)</label>
                          <div className="flex space-x-2">
                            <input 
                              type="text" 
                              placeholder="IMAGE URL..."
                              className="w-full bg-white border border-black/5 px-3 py-3 text-[10px] font-bold uppercase focus:border-black outline-none"
                              value={v.image}
                              onChange={(e) => handleVariationChange(v.id, 'image', e.target.value)}
                            />
                            {variations.length > 1 && (
                              <button 
                                type="button"
                                onClick={() => handleRemoveVariation(v.id)}
                                className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-12 border-t border-black/5 flex justify-end space-x-6">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="text-[11px] uppercase tracking-[0.3em] font-bold text-black/40 hover:text-black transition-colors"
                  >
                    Discard Changes
                  </button>
                  <button 
                    type="submit"
                    className="bg-black text-white px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-bold flex items-center space-x-3 hover:pr-16 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Deploy Product</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

