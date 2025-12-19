'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, LogOut, User, Settings, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check user authentication on mount
  useEffect(() => {
    const checkUser = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.log('Error checking user:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
    router.push('/login');
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Browse', href: '/browse', icon: '🔍' },
    { label: 'Add Equipment', href: '/add-equipment', icon: '➕' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-gradient-to-r from-green-700 via-green-600 to-green-700 shadow-lg'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>

          {/* Logo Section */}
          <Link href='/' className='flex items-center gap-2 flex-shrink-0 group'>
            <span className='text-3xl group-hover:scale-110 transition duration-200'>🌾</span>
            <span
              className={`text-2xl font-bold font-sans transition duration-200 ${
                isScrolled ? 'text-green-700' : 'text-white'
              }`}
            >
              AgriRent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-1'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md font-semibold transition duration-200 flex items-center gap-2 ${
                  isActive(link.href)
                    ? isScrolled
                      ? 'bg-green-100 text-green-700'
                      : 'bg-white bg-opacity-25 text-white'
                    : isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-100 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className='hidden md:flex items-center gap-4'>
            {loading ? (
              <div className='animate-pulse h-10 w-10 bg-gray-300 rounded-full'></div>
            ) : user ? (
              <div className='relative'>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 font-semibold ${
                    isScrolled
                      ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                  }`}
                >
                  <div className='w-8 h-8 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md'>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className='hidden sm:inline'>{user.name}</span>
                  <ChevronDown
                    size={18}
                    className={`transition duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className='absolute right-0 mt-2 w-52 rounded-lg shadow-2xl bg-white border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200'>
                    <div className='p-2'>
                      <div className='px-4 py-2 border-b border-gray-100'>
                        <p className='text-xs text-gray-500 font-semibold'>SIGNED IN AS</p>
                        <p className='text-sm font-bold text-gray-800'>{user.email}</p>
                      </div>
                      <Link
                        href='/profile'
                        className='flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition duration-200'
                      >
                        <User size={18} />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href='/my-equipment'
                        className='flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition duration-200'
                      >
                        <Settings size={18} />
                        <span>My Equipment</span>
                      </Link>
                      <Link
                        href='/favorites'
                        className='flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition duration-200'
                      >
                        <Heart size={18} />
                        <span>Favorites</span>
                      </Link>
                      <hr className='my-2' />
                      <button
                        onClick={handleLogout}
                        className='w-full flex items-center gap-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition duration-200 font-semibold'
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex items-center gap-3'>
                <Link
                  href='/login'
                  className={`px-4 py-2 rounded-md font-semibold transition duration-200 ${
                    isScrolled
                      ? 'text-green-700 hover:bg-green-50'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href='/signup'
                  className='px-4 py-2 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 transition duration-200 shadow-md'
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center gap-4'>
            {user && (
              <div className='w-8 h-8 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md'>
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition duration-200 ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className={`md:hidden pb-4 space-y-2 transition duration-200 ${
              isScrolled ? 'bg-gray-50' : 'bg-green-600'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-md transition duration-200 font-semibold ${
                  isActive(link.href)
                    ? isScrolled
                      ? 'bg-green-100 text-green-700'
                      : 'bg-white bg-opacity-25 text-white'
                    : isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-100 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <span className='mr-2'>{link.icon}</span>
                {link.label}
              </Link>
            ))}

            {/* Mobile User Section */}
            <div className='border-t pt-3 mt-3'>
              {user ? (
                <div className='space-y-2'>
                  <div className='px-4 py-2 border-b'>
                    <p className='text-xs font-semibold text-gray-500'>SIGNED IN AS</p>
                    <p className={`text-sm font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href='/profile'
                    className={`block px-4 py-2 rounded-md transition duration-200 font-semibold ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-green-100'
                        : 'text-gray-100 hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    👤 My Profile
                  </Link>
                  <Link
                    href='/my-equipment'
                    className={`block px-4 py-2 rounded-md transition duration-200 font-semibold ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-green-100'
                        : 'text-gray-100 hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    ⚙️ My Equipment
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-4 py-2 rounded-md font-semibold transition duration-200 ${
                      isScrolled
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-red-200 hover:bg-red-700'
                    }`}
                  >
                    🚪 Logout
                  </button>
                </div>
              ) : (
                <div className='flex gap-2 px-2'>
                  <Link
                    href='/login'
                    className={`flex-1 px-4 py-2 text-center rounded-md font-semibold transition duration-200 ${
                      isScrolled
                        ? 'bg-white text-green-700 hover:bg-gray-100'
                        : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    href='/signup'
                    className='flex-1 px-4 py-2 text-center rounded-md font-semibold bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200'
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;