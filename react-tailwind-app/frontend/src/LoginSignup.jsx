import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check, X, Repeat } from 'lucide-react';

const ReWearAuth = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [validations, setValidations] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    firstName: null,
    lastName: null
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentView]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidations(prev => ({ ...prev, email: emailRegex.test(value) }));
    }
    if (field === 'password') {
      setValidations(prev => ({ ...prev, password: value.length >= 8 }));
    }
    if (field === 'confirmPassword') {
      setValidations(prev => ({ ...prev, confirmPassword: value === formData.password }));
    }
    if (field === 'firstName' || field === 'lastName') {
      setValidations(prev => ({ ...prev, [field]: value.length >= 2 }));
    }
  };

  const switchView = (view) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentView(view);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: ''
      });
      setValidations({
        email: null,
        password: null,
        confirmPassword: null,
        firstName: null,
        lastName: null
      });
    }, 300);
  };

  const InputField = ({ 
    icon: Icon, 
    type, 
    placeholder, 
    value, 
    onChange, 
    validation, 
    showToggle = false, 
    showPassword: showPass, 
    onTogglePassword 
  }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="w-5 h-5 text-slate-400" />
      </div>
      <input
        type={showToggle ? (showPass ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-12 pr-12 py-4 bg-white border-2 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none transition-all duration-300 ${
          validation === null 
            ? 'border-slate-200 focus:border-violet-300 focus:ring-4 focus:ring-violet-100' 
            : validation 
              ? 'border-green-300 focus:border-green-400 focus:ring-4 focus:ring-green-100' 
              : 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100'
        }`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute inset-y-0 right-0 pr-4 flex items-center"
        >
          {showPass ? (
            <EyeOff className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" />
          ) : (
            <Eye className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" />
          )}
        </button>
      )}
      {validation !== null && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          {validation ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <X className="w-5 h-5 text-red-500" />
          )}
        </div>
      )}
    </div>
  );

  const FloatingElement = ({ className, delay = 0 }) => (
    <div 
      className={`absolute ${className} animate-pulse opacity-10`}
      style={{ animationDelay: `${delay}s`, animationDuration: '4s' }}
    >
      <div className="w-4 h-4 bg-gradient-to-r from-violet-400 to-coral-400 rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center p-4">
      {/* Floating Background Elements */}
      <FloatingElement className="top-20 left-10" delay={0} />
      <FloatingElement className="top-32 right-16" delay={1} />
      <FloatingElement className="bottom-32 left-20" delay={2} />
      <FloatingElement className="bottom-20 right-10" delay={0.5} />
      <FloatingElement className="top-1/2 left-1/4" delay={1.5} />
      <FloatingElement className="top-1/3 right-1/3" delay={2.5} />

      <div className="w-full max-w-md">
        {/* Header */}
        <div className={`text-center mb-8 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-coral-500 rounded-xl flex items-center justify-center">
              <Repeat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">ReWear</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            {currentView === 'login' ? 'Welcome Back' : 'Join ReWear'}
          </h1>
          <p className="text-slate-600">
            {currentView === 'login' 
              ? 'Sign in to continue swapping amazing styles' 
              : 'Start your sustainable fashion journey today'
            }
          </p>
        </div>

        {/* Auth Form */}
        <div className={`bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="space-y-6">
            {currentView === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    icon={User}
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(value) => handleInputChange('firstName', value)}
                    validation={validations.firstName}
                  />
                  <InputField
                    icon={User}
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(value) => handleInputChange('lastName', value)}
                    validation={validations.lastName}
                  />
                </div>
                <InputField
                  icon={Phone}
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                />
              </>
            )}

            <InputField
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              validation={validations.email}
            />

            <InputField
              icon={Lock}
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              validation={validations.password}
              showToggle={true}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            {currentView === 'signup' && (
              <InputField
                icon={Lock}
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(value) => handleInputChange('confirmPassword', value)}
                validation={validations.confirmPassword}
                showToggle={true}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}

            {currentView === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                  <span className="ml-2 text-sm text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-violet-600 hover:text-violet-700 transition-colors">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-500 to-coral-500 text-white font-semibold py-4 rounded-xl hover:from-violet-600 hover:to-coral-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>{currentView === 'login' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2 text-sm font-medium text-slate-700">Google</span>
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span className="ml-2 text-sm font-medium text-slate-700">Twitter</span>
              </button>
            </div>
          </div>

          {/* Switch Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {currentView === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => switchView(currentView === 'login' ? 'signup' : 'login')}
                className="ml-2 text-violet-600 hover:text-violet-700 font-semibold transition-colors"
              >
                {currentView === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Terms & Privacy */}
        {currentView === 'signup' && (
          <div className={`mt-6 text-center transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-sm text-slate-500">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-violet-600 hover:text-violet-700 transition-colors">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-violet-600 hover:text-violet-700 transition-colors">Privacy Policy</a>
            </p>
          </div>
        )}

        {/* Back to Home */}
        <div className={`mt-8 text-center transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <a href="#" className="text-slate-500 hover:text-slate-700 transition-colors text-sm">
            ← Back to ReWear
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReWearAuth;