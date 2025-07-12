import React, { useState, useEffect } from 'react';
import { Bell, Search, Settings, Plus, Heart, ShoppingBag, TrendingUp, Users, Eye, Home } from 'lucide-react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

const ReWearDashboard = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(`http://localhost:5000/api/users/${userId}`).then(r => r.json()),
      fetch(`http://localhost:5000/api/items?uploaderId=${userId}`).then(r => r.json()),
      fetch(`http://localhost:5000/api/purchases?userId=${userId}`).then(r => r.json()).catch(() => [])
    ])
      .then(([userData, userListings, userPurchases]) => {
        setUser(userData.user || userData);
        setListings(userListings.items || userListings);
        setPurchases(userPurchases.purchases || userPurchases);
      })
      .catch(e => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading dashboard...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">{error}</div>;
  }
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">ReWear</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/landing')}
                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-purple-100 text-purple-600 rounded-lg font-medium transition-colors"
                title="Go to Home"
              >
                <Home className="w-5 h-5 mr-1" /> Home
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search items..." 
                  className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 w-64"
                />
              </div>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-purple-600 transition-colors" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">3</span>
              </div>
              <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-purple-600 transition-colors" />
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.firstName?.[0] || user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{user?.name || user?.firstName || 'User'}</h2>
              <p className="text-gray-600 mb-4">{user?.email || ''}</p>
              <div className="flex space-x-8 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{listings.length}</div>
                  <div className="text-sm text-gray-600">Items Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{user?.itemsSold || 0}</div>
                  <div className="text-sm text-gray-600">Items Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{purchases.length}</div>
                  <div className="text-sm text-gray-600">Purchases</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{user?.rating || '4.8'}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-800">${user?.earnings || 0}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-gray-800">{user?.views || 0}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Followers</p>
                <p className="text-2xl font-bold text-gray-800">{user?.followers || 0}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Likes</p>
                <p className="text-2xl font-bold text-gray-800">{user?.likes || 0}</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'listings'
                  ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('purchases')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'purchases'
                  ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              My Purchases
            </button>
          </div>
          <div className="p-6">
            {activeTab === 'listings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {listings.length === 0 ? (
                  <div className="col-span-full text-center text-gray-500">No listings found.</div>
                ) : (
                  listings.map((item) => (
                    <div key={item._id || item.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <div className="text-6xl mb-3 text-center">{item.image || '👕'}</div>
                      <h3 className="text-gray-800 font-medium mb-2">{item.title}</h3>
                      <p className="text-purple-600 text-lg font-bold mb-3">{item.price ? `$${item.price}` : ''}</p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{item.likes || 0}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{item.views || 0}</span>
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {activeTab === 'purchases' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {purchases.length === 0 ? (
                  <div className="col-span-full text-center text-gray-500">No purchases found.</div>
                ) : (
                  purchases.map((item) => (
                    <div key={item._id || item.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <div className="text-6xl mb-3 text-center">{item.image || '🛍️'}</div>
                      <h3 className="text-gray-800 font-medium mb-2">{item.title}</h3>
                      <p className="text-purple-600 text-lg font-bold mb-3">{item.price ? `$${item.price}` : ''}</p>
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          item.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status || ''}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReWearDashboard;