import React, { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  Plus, 
  Camera, 
  Search, 
  ArrowLeft, 
  Tag, 
  DollarSign, 
  Package, 
  Shirt, 
  Repeat,
  Save,
  Eye,
  Heart
} from 'lucide-react';

const ItemListing = () => {
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    brand: '',
    condition: '',
    pointValue: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const mainImageRef = useRef(null);
  const additionalImageRef = useRef(null);

  const categories = [
    'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 
    'Accessories', 'Bags', 'Jewelry', 'Activewear', 'Formal'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const conditions = ['Like New', 'Excellent', 'Good', 'Fair'];

  const handleImageUpload = (event, type) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'main') {
          setMainImage(e.target.result);
        } else {
          setAdditionalImages(prev => [...prev, e.target.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index, type) => {
    if (type === 'main') {
      setMainImage(null);
    } else {
      setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const ImageUploadBox = ({ onClick, children, className = "" }) => (
    <div 
      onClick={onClick}
      className={`border-2 border-dashed border-slate-300 rounded-xl hover:border-violet-400 transition-all duration-300 cursor-pointer group ${className}`}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-coral-500 rounded-lg flex items-center justify-center">
                  <Repeat className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-800">ReWear</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search items..."
                  className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">List Your Item</h1>
          <p className="text-slate-600">Share your fashion finds with the ReWear community</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Main Product Image</h3>
              {mainImage ? (
                <div className="relative group">
                  <img 
                    src={mainImage} 
                    alt="Main product" 
                    className="w-full h-96 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => removeImage(0, 'main')}
                    className="absolute top-4 right-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <ImageUploadBox 
                  onClick={() => mainImageRef.current?.click()}
                  className="h-96 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100"
                >
                  <Camera className="w-12 h-12 text-slate-400 mb-4 group-hover:text-violet-500 transition-colors" />
                  <p className="text-slate-600 font-medium">Upload Main Image</p>
                  <p className="text-sm text-slate-400 mt-2">JPG, PNG up to 10MB</p>
                </ImageUploadBox>
              )}
              <input
                ref={mainImageRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'main')}
                className="hidden"
              />
            </div>

            {/* Additional Images */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Additional Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {additionalImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Additional ${index + 1}`} 
                      className="w-full h-32 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => removeImage(index, 'additional')}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {additionalImages.length < 4 && (
                  <ImageUploadBox 
                    onClick={() => additionalImageRef.current?.click()}
                    className="h-32 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100"
                  >
                    <Plus className="w-6 h-6 text-slate-400 mb-2 group-hover:text-violet-500 transition-colors" />
                    <p className="text-sm text-slate-600">Add Photo</p>
                  </ImageUploadBox>
                )}
              </div>
              <input
                ref={additionalImageRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, 'additional')}
                className="hidden"
              />
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Product Details</h3>
              
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    placeholder="Describe your item in detail..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition-all resize-none"
                  />
                </div>

                {/* Category and Size */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition-all"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Size *
                    </label>
                    <select
                      value={formData.size}
                      onChange={(e) => handleInputChange('size', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition-all"
                    >
                      <option value="">Select size</option>
                      {sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Brand and Condition */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Brand
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Zara, H&M"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Condition *
                    </label>
                    <select
                      value={formData.condition}
                      onChange={(e) => handleInputChange('condition', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition-all"
                    >
                      <option value="">Select condition</option>
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Point Value */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Point Value *
                  </label>
                  <div className="relative">
                    <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="number"
                      placeholder="120"
                      value={formData.pointValue}
                      onChange={(e) => handleInputChange('pointValue', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Points other users will pay to claim this item</p>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 hover:text-violet-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a tag..."
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition-all"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="w-5 h-5" />
                <span>Preview</span>
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-500 to-coral-500 text-white rounded-xl hover:from-violet-600 hover:to-coral-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Save className="w-5 h-5" />
                <span>List Item</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemListing;