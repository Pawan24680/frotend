'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Equipment', icon: '🚜' },
    { id: 'tractors', name: 'Tractors', icon: '🚜' },
    { id: 'harvesters', name: 'Harvesters', icon: '🌾' },
    { id: 'plows', name: 'Plows', icon: '⚙️' },
    { id: 'sprayers', name: 'Sprayers', icon: '💧' },
  ]

  const equipment = [
    { id: 1, name: 'John Deere Tractor 8R', category: 'tractors', price: '$150/day', image: '🚜', rating: 4.8 },
    { id: 2, name: 'CLAAS Combine Harvester', category: 'harvesters', price: '$300/day', image: '🌾', rating: 4.9 },
    { id: 3, name: 'Heavy Duty Plow', category: 'plows', price: '$80/day', image: '⚙️', rating: 4.7 },
    { id: 4, name: 'Agricultural Sprayer', category: 'sprayers', price: '$120/day', image: '💧', rating: 4.6 },
    { id: 5, name: 'Kubota Compact Tractor', category: 'tractors', price: '$120/day', image: '🚜', rating: 4.8 },
    { id: 6, name: 'Precision Seed Drill', category: 'plows', price: '$95/day', image: '⚙️', rating: 4.7 },
  ]

  const filteredEquipment = equipment.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-green-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <span>🌾</span>
              <span>AgriRent</span>
            </div>
            <ul className="hidden md:flex gap-8 items-center">
              <li><a href="#home" className="hover:text-yellow-300 transition">Home</a></li>
              <li><a href="#equipment" className="hover:text-yellow-300 transition">Equipment</a></li>
              <li><a href="#about" className="hover:text-yellow-300 transition">About</a></li>
              <li><button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">Sign In</button></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rent Agricultural Equipment with Ease</h1>
          <p className="text-lg md:text-xl text-green-100 mb-8">Find and book quality farming equipment at affordable prices</p>
          <Link href={'/browse'} className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-600 transition transform hover:scale-105">Browse Equipments</Link>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-12">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search for equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          />
          <button className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition">🔍 Search</button>
        </div>
      </section>

      {/* Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition transform hover:scale-105 ${
                selectedCategory === cat.id
                  ? 'bg-green-700 text-white border-green-700'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-green-700'
              }`}
            >
              <span className="text-3xl mb-2">{cat.icon}</span>
              <span className="font-semibold text-sm text-center">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Equipment Listing */}
      <section id="equipment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Available Equipment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-green-100 to-green-50 p-8 text-center">
                <div className="text-6xl">{item.image}</div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-2xl font-bold text-green-700 mb-3">{item.price}</p>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400">⭐</span>
                  <span className="ml-2 text-gray-700 font-semibold">{item.rating}</span>
                </div>
                <button className="w-full bg-green-700 text-white py-2 rounded-lg font-bold hover:bg-green-800 transition">Rent Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16 px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose AgriRent?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Quality Equipment</h3>
              <p className="text-gray-600">Well-maintained and reliable farming equipment for your needs</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Affordable Prices</h3>
              <p className="text-gray-600">Best rates in the market without compromising quality</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Quick delivery and pickup services available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-700 text-white py-12 px-4 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Rent?</h2>
          <p className="text-lg text-green-100 mb-6">Join thousands of farmers using AgriRent</p>
          <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition">Create Account</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white text-center py-8">
        <p className="text-green-100">&copy; 2025 AgriRent. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-yellow-300 transition">Privacy</a>
          <a href="#" className="hover:text-yellow-300 transition">Terms</a>
          <a href="#" className="hover:text-yellow-300 transition">Contact</a>
        </div>
      </footer>
    </div>
  )
}

export default Home