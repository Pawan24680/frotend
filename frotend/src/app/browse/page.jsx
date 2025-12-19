'use client';
import axios from 'axios'
import { Pencil, Trash2, Star, MapPin, DollarSign, Calendar } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BrowseEquipment = () => {
    const [userData, setUserData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [loading, setLoading] = useState(true);
    const [imageErrors, setImageErrors] = useState({});
    const router = useRouter();

    const categories = [
        { value: 'all', label: 'All Equipment', icon: '🚜' },
        { value: 'tractors', label: 'Tractors', icon: '🚜' },
        { value: 'harvesters', label: 'Harvesters', icon: '🌾' },
        { value: 'plows', label: 'Plows', icon: '⚙️' },
        { value: 'sprayers', label: 'Sprayers', icon: '💧' },
        { value: 'seeders', label: 'Seeders', icon: '🌱' },
        { value: 'tillers', label: 'Tillers', icon: '🔧' },
    ];

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/equipment/getall');
            console.log(res.data);
            setUserData(res.data);
            setFilteredData(res.data);
        } catch (err) {
            toast.error('Error fetching equipment');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        let filtered = userData;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Search by name or brand
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.brand.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.rent - b.rent);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.rent - a.rent);
        } else if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setFilteredData(filtered);
    }, [selectedCategory, searchTerm, sortBy, userData]);

    const deleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this equipment?')) {
            axios.delete(`http://localhost:5000/equipment/delete/${id}`)
                .then(() => {
                    toast.success('Equipment deleted successfully');
                    fetchUserData();
                })
                .catch((err) => {
                    toast.error('Error deleting equipment');
                    console.log(err);
                });
        }
    };

    const handleViewDetails = (equipmentId) => {
        router.push(`/equipment-details/${equipmentId}`);
    };

    const handleRentNow = (equipmentId) => {
        router.push(`/equipment-details/${equipmentId}?tab=booking`);
    };

    const handleImageError = (equipmentId) => {
        setImageErrors(prev => ({
            ...prev,
            [equipmentId]: true
        }));
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-gray-100 py-12 px-4'>
            
            {/* Header Section */}
            <div className='max-w-7xl mx-auto mb-8'>
                <div className='flex items-center gap-3 mb-4'>
                    <span className='text-4xl'>🚜</span>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>Browse Equipment</h1>
                </div>
                <p className='text-gray-600 text-lg'>Discover and rent quality agricultural equipment</p>
            </div>

            {/* Filters Section */}
            <div className='max-w-7xl mx-auto mb-8 space-y-4'>
                
                {/* Search Bar */}
                <div className='flex gap-4 flex-col sm:flex-row'>
                    <div className='flex-1'>
                        <input
                            type='text'
                            placeholder='Search by equipment name or brand...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className='px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                    >
                        <option value='newest'>Newest</option>
                        <option value='price-low'>Price: Low to High</option>
                        <option value='price-high'>Price: High to Low</option>
                    </select>
                </div>

                {/* Category Filter */}
                <div className='bg-white rounded-lg shadow p-4'>
                    <h3 className='font-semibold text-gray-700 mb-3'>Filter by Category</h3>
                    <div className='flex gap-2 flex-wrap'>
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`px-4 py-2 rounded-lg font-medium transition ${
                                    selectedCategory === cat.value
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                <span className='mr-2'>{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Equipment Grid */}
            <div className='max-w-7xl mx-auto'>
                {loading ? (
                    <div className='flex items-center justify-center min-h-96'>
                        <div className='text-center'>
                            <div className='animate-spin text-4xl mb-4'>⏳</div>
                            <p className='text-gray-600 font-semibold'>Loading equipment...</p>
                        </div>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className='flex items-center justify-center min-h-96'>
                        <div className='text-center'>
                            <p className='text-4xl mb-4'>🔍</p>
                            <p className='text-gray-600 font-semibold'>No equipment found matching your criteria</p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                }}
                                className='mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredData.map((equipment) => (
                            <motion.div
                                key={equipment._id}
                                whileHover={{ scale: 1.05 }}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0 }}
                                className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer group'
                                onClick={() => handleViewDetails(equipment._id)}
                            >
                                {/* Image Section */}
                                <div className='relative w-full h-48 bg-gradient-to-br from-green-100 to-green-50 overflow-hidden'>
                                    {equipment.image && !imageErrors[equipment._id] ? (
                                        <img
                                            src={equipment.image}
                                            alt={equipment.name}
                                            className='w-full h-full object-cover group-hover:scale-110 transition duration-300'
                                            onError={() => handleImageError(equipment._id)}
                                            loading='lazy'
                                        />
                                    ) : (
                                        <div className='flex items-center justify-center h-full text-6xl bg-green-100 group-hover:bg-green-200 transition'>
                                            🚜
                                        </div>
                                    )}
                                    
                                    <div className='absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg'>
                                        {equipment.type || 'Equipment'}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className='p-5'>
                                    
                                    {/* Title */}
                                    <h3 className='text-lg font-bold text-gray-800 mb-1 truncate group-hover:text-green-600 transition'>
                                        {equipment.name}
                                    </h3>
                                    
                                    {/* Brand */}
                                    <p className='text-sm text-gray-500 mb-3'>
                                        <span className='font-semibold'>Brand:</span> {equipment.brand}
                                    </p>

                                    {/* Description */}
                                    <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                                        {equipment.description}
                                    </p>

                                    {/* Price Section */}
                                    <div className='bg-gray-50 rounded-lg p-3 mb-4 space-y-2'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-600 flex items-center gap-1 text-sm'>
                                                <DollarSign size={16} />
                                                Price
                                            </span>
                                            <span className='font-bold text-green-600'>
                                                ${equipment.price}
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center border-t pt-2'>
                                            <span className='text-gray-600 flex items-center gap-1 text-sm'>
                                                <Calendar size={16} />
                                                Per Day
                                            </span>
                                            <span className='font-bold text-green-600'>
                                                ${equipment.rent}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Category Badge */}
                                    <div className='mb-4'>
                                        <span className='inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold'>
                                            📦 {equipment.category}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='flex gap-3 mb-3'>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteUser(equipment._id);
                                            }}
                                            className='flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition font-semibold text-sm'
                                        >
                                            <Trash2 size={18} />
                                            Delete
                                        </button>
                                        <Link
                                            href={'/update-equipment/' + equipment._id}
                                            onClick={(e) => e.stopPropagation()}
                                            className='flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition font-semibold text-sm'
                                        >
                                            <Pencil size={18} />
                                            Edit
                                        </Link>
                                    </div>

                                    {/* Rent Now Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRentNow(equipment._id);
                                        }}
                                        className='w-full py-2 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 transition transform hover:scale-105 text-sm'
                                    >
                                        Rent Now
                                    </button>

                                </div>

                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Stats Section */}
            {filteredData.length > 0 && (
                <div className='max-w-7xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
                        <div className='hover:scale-105 transition'>
                            <p className='text-3xl font-bold text-green-600'>{filteredData.length}</p>
                            <p className='text-gray-600 text-sm md:text-base'>Equipment Available</p>
                        </div>
                        <div className='hover:scale-105 transition'>
                            <p className='text-3xl font-bold text-blue-600'>
                                ${filteredData.length > 0 ? Math.min(...filteredData.map(e => e.rent)) : 0}
                            </p>
                            <p className='text-gray-600 text-sm md:text-base'>Lowest Daily Rent</p>
                        </div>
                        <div className='hover:scale-105 transition'>
                            <p className='text-3xl font-bold text-purple-600'>
                                ${filteredData.length > 0 ? Math.max(...filteredData.map(e => e.rent)) : 0}
                            </p>
                            <p className='text-gray-600 text-sm md:text-base'>Highest Daily Rent</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default BrowseEquipment;