import React, { useState, useEffect } from 'react';
import { User, Package, List, MoreVertical, Edit, Trash2, Eye, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        // If backend returns {users: [...]}, else just use data
        setUsers(data.users || data);
      })
      .catch(() => setError('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const ActionButton = ({  label, variant = 'primary' }) => (
    <button className={`
      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
      ${variant === 'primary' 
        ? 'bg-purple-600 text-white hover:bg-purple-700' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }
    `}>
      <Icon size={16} />
      {label}
    </button>
  );

  const UserRow = ({ user }) => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
      {/* Avatar */}
      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
        <User className="text-white" size={20} />
      </div>
      
      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 rounded-lg p-3">
          <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{user.email}</p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {user.role}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              user.status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {user.status}
            </span>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col gap-2">
        <ActionButton icon={Edit} label="Edit" />
        <ActionButton icon={Trash2} label="Delete" variant="secondary" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="text-white" size={18} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <MoreVertical size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 mb-8">
          {[
            { id: 'users', label: 'Manage Users', icon: User },
            { id: 'orders', label: 'Manage Orders', icon: Package },
            { id: 'listings', label: 'Manage Listings', icon: List },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all
                ${activeTab === tab.id 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }
              `}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Manage Users</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <User size={16} />
              Add New User
            </button>
          </div>

          {/* User List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center text-gray-500">Loading users...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : users.length === 0 ? (
              <div className="text-center text-gray-500">No users found.</div>
            ) : (
              users.map(user => (
                <UserRow key={user.id || user._id} user={user} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;