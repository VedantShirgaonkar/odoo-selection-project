import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shirt, Users, Repeat, Star, Menu, X } from 'lucide-react';

const ReWearLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible({
        hero: true,
        about: true,
        featured: true
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const featuredItems = [
    {
      id: 1,
      name: "Designer Blazer",
      points: 120,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      tags: ["Professional", "Size M"]
    },
    {
      id: 2,
      name: "Vintage Denim",
      points: 80,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      tags: ["Casual", "Size L"]
    },
    {
      id: 3,
      name: "Summer Dress",
      points: 95,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop",
      tags: ["Formal", "Size S"]
    },
    {
      id: 4,
      name: "Leather Jacket",
      points: 150,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      tags: ["Trendy", "Size M"]
    },
    {
      id: 5,
      name: "Silk Scarf",
      points: 45,
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop",
      tags: ["Accessories", "One Size"]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, featuredItems.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, featuredItems.length - 2)) % Math.max(1, featuredItems.length - 2));
  };

  const FloatingClothingIcon = ({ className, delay = 0 }) => (
    <div 
      className={`absolute ${className} animate-bounce opacity-20`}
      style={{ animationDelay: `${delay}s`, animationDuration: '3s' }}
    >
      <Shirt className="w-8 h-8 text-violet-300" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-coral-500 rounded-lg flex items-center justify-center">
                <Repeat className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">ReWear</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-600 hover:text-violet-600 transition-colors">How It Works</a>
              <a href="#" className="text-slate-600 hover:text-violet-600 transition-colors">Browse</a>
              <a href="#" className="text-slate-600 hover:text-violet-600 transition-colors">Community</a>
              <button className="px-4 py-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                Login
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-coral-500 text-white rounded-lg hover:from-violet-600 hover:to-coral-600 transition-all transform hover:scale-105">
                Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-violet-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-2 space-y-1">
              <a href="#" className="block px-3 py-2 text-slate-600 hover:text-violet-600 transition-colors">How It Works</a>
              <a href="#" className="block px-3 py-2 text-slate-600 hover:text-violet-600 transition-colors">Browse</a>
              <a href="#" className="block px-3 py-2 text-slate-600 hover:text-violet-600 transition-colors">Community</a>
              <button className="block w-full text-left px-3 py-2 text-violet-600 hover:bg-violet-50 transition-colors">
                Login
              </button>
              <button className="block w-full text-left px-3 py-2 bg-gradient-to-r from-violet-500 to-coral-500 text-white rounded-lg hover:from-violet-600 hover:to-coral-600 transition-all">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Floating Icons */}
        <FloatingClothingIcon className="top-20 left-10" delay={0} />
        <FloatingClothingIcon className="top-32 right-16" delay={1} />
        <FloatingClothingIcon className="bottom-32 left-20" delay={2} />
        <FloatingClothingIcon className="bottom-20 right-10" delay={0.5} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6">
              <span className="bg-gradient-to-r from-violet-600 to-coral-500 bg-clip-text text-transparent">
                Swap Style,
              </span>
              <br />
              <span className="text-slate-700">Not Waste</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Join the community-powered clothing exchange. Refresh your wardrobe, earn points, and discover unique pieces—all while reducing fashion waste.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-coral-500 text-white text-lg font-semibold rounded-xl hover:from-violet-600 hover:to-coral-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Swapping
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 text-lg font-semibold rounded-xl border-2 border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all transform hover:scale-105">
                Browse Items
              </button>
              <button className="px-8 py-4 bg-slate-800 text-white text-lg font-semibold rounded-xl hover:bg-slate-700 transition-all transform hover:scale-105">
                List an Item
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              How <span className="bg-gradient-to-r from-violet-600 to-coral-500 bg-clip-text text-transparent">ReWear</span> Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Four simple steps to refresh your wardrobe and join the circular fashion movement
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up",
                description: "Create your profile and join our community of style-conscious swappers",
                icon: Users,
                color: "from-violet-500 to-purple-500"
              },
              {
                step: "02",
                title: "List Items",
                description: "Upload photos of clothes you no longer wear and set point values",
                icon: Shirt,
                color: "from-coral-500 to-pink-500"
              },
              {
                step: "03",
                title: "Earn Points",
                description: "Get points when others choose your items, building your swap currency",
                icon: Star,
                color: "from-amber-500 to-orange-500"
              },
              {
                step: "04",
                title: "Swap Clothes",
                description: "Use your points to claim items you love from the community",
                icon: Repeat,
                color: "from-emerald-500 to-teal-500"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-6`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-slate-400 mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.featured ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Featured <span className="bg-gradient-to-r from-violet-600 to-coral-500 bg-clip-text text-transparent">Items</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover amazing pieces from our community members
            </p>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-center">
              <button 
                onClick={prevSlide}
                className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-slate-600" />
              </button>
              
              <div className="overflow-hidden w-full max-w-5xl mx-12">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredItems.map((item) => (
                    <div key={item.id} className="w-1/3 flex-shrink-0 px-4">
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                        <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                            <span className="text-sm font-semibold text-violet-600">{item.points} pts</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">{item.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={nextSlide}
                className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-coral-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of style-conscious individuals who are already swapping, saving, and styling sustainably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-violet-600 text-lg font-semibold rounded-xl hover:bg-slate-50 transition-all transform hover:scale-105 shadow-lg">
              Get Started Now
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-xl hover:bg-white hover:text-violet-600 transition-all transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-coral-500 rounded-lg flex items-center justify-center">
                  <Repeat className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ReWear</span>
              </div>
              <p className="text-slate-400">
                Revolutionizing fashion through community-powered clothing exchange.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Browse Items</a></li>
                <li><a href="#" className="hover:text-white transition-colors">List Items</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 ReWear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReWearLanding;