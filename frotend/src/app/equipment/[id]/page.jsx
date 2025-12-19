'use server';
import React from 'react';
import Link from 'next/link';

export default async function EquipmentDetailPage({ params }) {
  const { id } = params;

  try {
    const res = await fetch(`http://localhost:5000/equipment/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      return (
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Equipment Not Found</h2>
          <p className="text-sm text-gray-600">The requested equipment could not be retrieved.</p>
          <div className="mt-6">
            <Link href="/browse-equipment" className="text-blue-600 underline">Back to list</Link>
          </div>
        </div>
      );
    }

    const equipment = await res.json();

    return (
      <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow rounded border border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">{equipment.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Brand</p>
            <p className="text-lg font-medium">{equipment.brand || '—'}</p>

            <p className="mt-4 text-sm text-gray-500">Category</p>
            <p className="text-lg">{equipment.category || '—'}</p>

            <p className="mt-4 text-sm text-gray-500">Type</p>
            <p className="text-lg">{equipment.type || '—'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-lg font-medium">{equipment.price ? `₹ ${equipment.price}` : '—'}</p>

            <p className="mt-4 text-sm text-gray-500">Rent / Day</p>
            <p className="text-lg font-medium">{equipment.rent ? `₹ ${equipment.rent}` : '—'}</p>

            <div className="mt-6">
              <Link href="/browse-equipment" className="inline-block mr-3 px-4 py-2 bg-gray-200 rounded">Back</Link>
              <button className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Rent Now</button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="mt-2 text-gray-700">{equipment.description || 'No description provided.'}</p>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Error</h2>
        <p className="text-sm text-gray-600">{String(err)}</p>
        <div className="mt-6">
          <Link href="/browse-equipment" className="text-blue-600 underline">Back to list</Link>
        </div>
      </div>
    );
  }
}
