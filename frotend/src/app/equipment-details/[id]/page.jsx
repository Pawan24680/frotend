'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Star, MapPin, Calendar, DollarSign, Heart, Share2, Check, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const EquipmentDetails = () => {
    const { id } = useParams();
    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [rentalDays, setRentalDays] = useState(1);
    const [startDate, setStartDate] = useState('');

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/equipment/getbyid/${id}`);
                setEquipment(res.data);
                console.log(res.data);
            } catch (err) {
                toast.error('Error fetching equipment details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchEquipment();
        }
    }, [id]);

    const handleRentNow = () => {
        if (!startDate) {
            toast.error('Please select a start date');
            return;
        }
        toast.success(`Equipment booked for ${rentalDays} days!`);
        // TODO: Redirect to checkout/booking page
    };

    const totalRentalCost = equipment ? equipment.rent * rentalDays : 0;

    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin text-5xl mb-4'>⏳</div>
                    <p className='text-gray-600 font-semibold text-lg'>Loading equipment details...</p>
                </div>
            </div>
        );
    }

    if (!equipment) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center'>
                <div className='text-center'>
                    <p className='text-4xl mb-4'>❌</p>
                    <p className='text-gray-600 font-semibold text-lg'>Equipment not found</p>
                    <Link href='/browse' className='mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'>
                        Back to Browse
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-gray-100 py-12 px-4'>
            <div className='max-w-7xl mx-auto'>

                {/* Breadcrumb */}
                <div className='flex items-center gap-2 mb-8 text-sm'>
                    <Link href='/' className='text-green-600 hover:text-green-700 font-semibold'>Home</Link>
                    <span className='text-gray-400'>/</span>
                    <Link href='/browse' className='text-green-600 hover:text-green-700 font-semibold'>Browse</Link>
                    <span className='text-gray-400'>/</span>
                    <span className='text-gray-600'>{equipment.name}</span>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

                    {/* Left Section - Images and Details */}
                    <div className='lg:col-span-2 space-y-6'>

                        {/* Main Image */}
                        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
                            <div className='bg-gradient-to-br from-green-100 to-green-50 h-96 flex items-center justify-center relative'>
                                {equipment.image ? (
                                    <img
                                        src={equipment.image}
                                        alt={equipment.name}
                                        className='w-full h-full object-cover'
                                    />
                                ) : (
                                    <span className='text-8xl'>🚜</span>
                                )}
                                <div className='absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-sm'>
                                    {equipment.category}
                                </div>
                                <div className='absolute top-4 right-4 flex gap-2'>
                                    <button className='bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition hover:scale-110'>
                                        <Heart
                                            size={20}
                                            className={isFavorite ? 'fill-red-600 text-red-600' : 'text-gray-600'}
                                            onClick={() => setIsFavorite(!isFavorite)}
                                        />
                                    </button>
                                    <button className='bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition hover:scale-110'>
                                        <Share2 size={20} className='text-gray-600' />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Equipment Info */}
                        <div className='bg-white rounded-xl shadow-lg p-6'>
                            <h1 className='text-3xl font-bold text-gray-800 mb-2'>{equipment.name}</h1>
                            <div className='flex items-center gap-4 mb-4 pb-4 border-b'>
                                <div className='flex items-center gap-1'>
                                    <Star className='fill-yellow-400 text-yellow-400' size={20} />
                                    <span className='font-semibold text-gray-800'>4.8</span>
                                    <span className='text-gray-600'>(124 reviews)</span>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-4 mb-6'>
                                <div className='bg-green-50 p-4 rounded-lg'>
                                    <p className='text-gray-600 text-sm font-semibold mb-1'>Brand</p>
                                    <p className='text-xl font-bold text-green-700'>{equipment.brand}</p>
                                </div>
                                <div className='bg-blue-50 p-4 rounded-lg'>
                                    <p className='text-gray-600 text-sm font-semibold mb-1'>Type</p>
                                    <p className='text-xl font-bold text-blue-700'>{equipment.type}</p>
                                </div>
                            </div>

                            <h3 className='text-lg font-bold text-gray-800 mb-3'>Description</h3>
                            <p className='text-gray-700 leading-relaxed mb-6'>
                                {equipment.description}
                            </p>

                            {/* Equipment Features */}
                            <h3 className='text-lg font-bold text-gray-800 mb-4'>Key Features</h3>
                            <div className='grid grid-cols-2 gap-3 mb-6'>
                                <div className='flex items-center gap-2'>
                                    <Check size={20} className='text-green-600' />
                                    <span className='text-gray-700'>Well Maintained</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Check size={20} className='text-green-600' />
                                    <span className='text-gray-700'>Certified Equipment</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Check size={20} className='text-green-600' />
                                    <span className='text-gray-700'>Free Delivery</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Check size={20} className='text-green-600' />
                                    <span className='text-gray-700'>Insurance Included</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Check size={20} className='text-green-600' />
                                    <span className='text-gray-700'>24/7 Support</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Check size={20} className='text-green-600' />
                                    <span className='text-gray-700'>Flexible Dates</span>
                                </div>
                            </div>

                            {/* Pricing Breakdown */}
                            <h3 className='text-lg font-bold text-gray-800 mb-4'>Pricing</h3>
                            <div className='bg-gray-50 p-4 rounded-lg space-y-3'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-gray-700'>Equipment Value</span>
                                    <span className='font-bold text-lg'>${equipment.price}</span>
                                </div>
                                <div className='border-t pt-3'>
                                    <div className='flex justify-between items-center mb-2'>
                                        <span className='text-gray-700'>Daily Rent Rate</span>
                                        <span className='font-bold text-lg text-green-600'>${equipment.rent}/day</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className='bg-white rounded-xl shadow-lg p-6'>
                            <h3 className='text-lg font-bold text-gray-800 mb-4'>Customer Reviews</h3>
                            <div className='space-y-4'>
                                {[1, 2, 3].map((review) => (
                                    <div key={review} className='border-b pb-4 last:border-b-0'>
                                        <div className='flex items-center justify-between mb-2'>
                                            <div>
                                                <p className='font-semibold text-gray-800'>Farmer Name</p>
                                                <div className='flex items-center gap-1'>
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} className='fill-yellow-400 text-yellow-400' />
                                                    ))}
                                                </div>
                                            </div>
                                            <span className='text-gray-500 text-sm'>2 weeks ago</span>
                                        </div>
                                        <p className='text-gray-700'>Great equipment, works perfectly! Highly recommend for anyone in the farming business.</p>
                                    </div>
                                ))}
                            </div>
                            <button className='w-full mt-4 py-2 px-4 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition'>
                                View All Reviews
                            </button>
                        </div>

                    </div>

                    {/* Right Section - Booking Card */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-xl shadow-2xl p-6 sticky top-20'>

                            {/* Price Summary */}
                            <div className='mb-6 pb-6 border-b'>
                                <div className='flex items-baseline gap-2 mb-2'>
                                    <span className='text-4xl font-bold text-green-600'>${equipment.rent}</span>
                                    <span className='text-gray-600'>/day</span>
                                </div>
                                <p className='text-sm text-gray-600 flex items-center gap-1'>
                                    <Star size={16} className='fill-yellow-400 text-yellow-400' />
                                    4.8 (124 reviews)
                                </p>
                            </div>

                            {/* Booking Form */}
                            <div className='space-y-4 mb-6'>
                                {/* Start Date */}
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        📅 Start Date
                                    </label>
                                    <input
                                        type='date'
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                                    />
                                </div>

                                {/* Number of Days */}
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        📆 Number of Days
                                    </label>
                                    <div className='flex items-center gap-3'>
                                        <button
                                            onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                                            className='w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-green-600 transition font-bold'
                                        >
                                            −
                                        </button>
                                        <input
                                            type='number'
                                            min='1'
                                            value={rentalDays}
                                            onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
                                            className='flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center'
                                        />
                                        <button
                                            onClick={() => setRentalDays(rentalDays + 1)}
                                            className='w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-green-600 transition font-bold'
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Cost Breakdown */}
                            <div className='bg-gray-50 p-4 rounded-lg mb-6 space-y-2'>
                                <div className='flex justify-between text-sm'>
                                    <span className='text-gray-600'>Rental ({rentalDays} days)</span>
                                    <span className='font-semibold'>${totalRentalCost}</span>
                                </div>
                                <div className='flex justify-between text-sm'>
                                    <span className='text-gray-600'>Delivery Fee</span>
                                    <span className='font-semibold text-green-600'>Free</span>
                                </div>
                                <div className='flex justify-between text-sm'>
                                    <span className='text-gray-600'>Insurance</span>
                                    <span className='font-semibold text-green-600'>Included</span>
                                </div>
                                <div className='border-t pt-2 flex justify-between'>
                                    <span className='font-bold text-gray-800'>Total</span>
                                    <span className='font-bold text-xl text-green-600'>${totalRentalCost}</span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <button
                                onClick={handleRentNow}
                                className='w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 transition transform hover:scale-105 mb-3'
                            >
                                🚀 Rent Now
                            </button>
                            <button className='w-full py-3 px-4 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition flex items-center justify-center gap-2'>
                                <MessageCircle size={20} />
                                Contact Owner
                            </button>
                        </div>
                    </div>

                </div>

                {/* Similar Equipment Section */}
                <div className='mt-16'>
                    <h3 className='text-2xl font-bold text-gray-800 mb-6'>Similar Equipment</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer'>
                                <div className='bg-gradient-to-br from-green-100 to-green-50 h-40 flex items-center justify-center text-5xl'>
                                    🚜
                                </div>
                                <div className='p-4'>
                                    <h4 className='font-bold text-gray-800 mb-2'>Similar Equipment {item}</h4>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-green-600 font-bold'>${equipment.rent}/day</span>
                                        <Star size={16} className='fill-yellow-400 text-yellow-400' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EquipmentDetails;