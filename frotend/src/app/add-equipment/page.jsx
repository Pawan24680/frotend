'use client';
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

// Validation Schema
const equipmentSchema = Yup.object().shape({
  name: Yup.string().required("Equipment name is required"),
  brand: Yup.string().required("Brand is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
  rent: Yup.number().required("Rent per day is required").positive("Rent must be positive"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
  type: Yup.string().required("Equipment type is required"),
  image: Yup.string().required("Please upload an image"),
});

const AddEquipment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    { value: 'tractors', label: '🚜 Tractors' },
    { value: 'harvesters', label: '🌾 Harvesters' },
    { value: 'plows', label: '⚙️ Plows' },
    { value: 'sprayers', label: '💧 Sprayers' },
    { value: 'seeders', label: '🌱 Seeders' },
    { value: 'tillers', label: '🔧 Tillers' },
  ];

  const types = [
    { value: 'heavy', label: 'Heavy Duty' },
    { value: 'medium', label: 'Medium Duty' },
    { value: 'light', label: 'Light Duty' },
    { value: 'premium', label: 'Premium' },
  ];

  const upload = (e) => {
    const file = e.target.files[0];
    
    // Validate file type
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'MERN_6:30');
    fd.append('cloud_name', 'dzjjvydkz');

    axios.post('https://api.cloudinary.com/v1_1/dzjjvydkz/image/upload', fd)
      .then((result) => {
        toast.success('Image uploaded successfully');
        console.log(result.data);
        setPreview(result.data.url);
        setImageUrl(result.data.url);
        setIsUploading(false);
      })
      .catch((err) => {
        toast.error('Error while uploading image');
        console.log(err);
        setIsUploading(false);
      });
  };

  const handleRemoveImage = () => {
    setPreview("");
    setImageUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 py-12 px-4">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🚜</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Add Equipment</h1>
        </div>
        <p className="text-gray-600 text-lg">List your agricultural equipment and start earning</p>
      </div>

      {/* Main Form Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 md:px-8 py-8">
            <h2 className="text-2xl font-bold text-white">Equipment Details</h2>
            <p className="text-green-100 text-sm mt-1">Fill in all the required fields to list your equipment</p>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            <Formik
              initialValues={{
                name: "",
                brand: "",
                price: "",
                rent: "",
                category: "",
                description: "",
                type: "",
                image: "",
              }}
              validationSchema={equipmentSchema}
              onSubmit={async (values, { resetForm }) => {
                if (!imageUrl) {
                  toast.error('Please upload an image before submitting');
                  return;
                }

                setIsSubmitting(true);
                try {
                  const submitData = {
                    ...values,
                    image: imageUrl,
                  };
                  await axios.post("http://localhost:5000/equipment/add", submitData);
                  toast.success('Equipment added successfully!');
                  resetForm();
                  setPreview("");
                  setImageUrl("");
                } catch (err) {
                  console.error(err);
                  toast.error(err.response?.data?.message || 'Error adding equipment');
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form className="space-y-6">

                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      📸 Equipment Image
                    </label>
                    <div className="space-y-4">
                      {/* Preview */}
                      {preview ? (
                        <div className="relative">
                          <img 
                            src={preview} 
                            alt="Equipment preview" 
                            className="w-full h-64 object-cover rounded-lg border-2 border-green-500"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                          >
                            ✕
                          </button>
                          <div className="mt-2 text-green-600 text-sm flex items-center gap-1">
                            ✅ Image uploaded successfully
                          </div>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition">
                          <input
                            type="file"
                            id="image-upload"
                            onChange={(e) => {
                              upload(e);
                              setFieldValue('image', 'uploading');
                            }}
                            disabled={isUploading}
                            className="hidden"
                            accept="image/*"
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            <div className="text-4xl mb-2">📤</div>
                            <p className="text-gray-700 font-semibold mb-1">
                              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                            </p>
                            <p className="text-gray-500 text-sm">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </label>
                        </div>
                      )}
                    </div>
                    {errors.image && !preview && (
                      <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                        ❌ {errors.image}
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 pt-6"></div>

                  {/* First Row: Name and Brand */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📝 Equipment Name
                      </label>
                      <Field
                        name="name"
                        placeholder="e.g., John Deere Tractor 8R"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                          touched.name && errors.name
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 focus:border-green-500'
                        }`}
                      />
                      {touched.name && errors.name && (
                        <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                          ❌ {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Brand */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🏷️ Brand
                      </label>
                      <Field
                        name="brand"
                        placeholder="e.g., John Deere, CLAAS"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                          touched.brand && errors.brand
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 focus:border-green-500'
                        }`}
                      />
                      {touched.brand && errors.brand && (
                        <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                          ❌ {errors.brand}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Second Row: Price and Rent */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        💰 Equipment Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-600 font-semibold">$</span>
                        <Field
                          name="price"
                          type="number"
                          placeholder="0.00"
                          className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                            touched.price && errors.price
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 focus:border-green-500'
                          }`}
                        />
                      </div>
                      {touched.price && errors.price && (
                        <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                          ❌ {errors.price}
                        </p>
                      )}
                    </div>

                    {/* Rent Per Day */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📅 Rent Per Day
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-600 font-semibold">$</span>
                        <Field
                          name="rent"
                          type="number"
                          placeholder="0.00"
                          className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                            touched.rent && errors.rent
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 focus:border-green-500'
                          }`}
                        />
                      </div>
                      {touched.rent && errors.rent && (
                        <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                          ❌ {errors.rent}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Third Row: Category and Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📦 Category
                      </label>
                      <Field
                        as="select"
                        name="category"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                          touched.category && errors.category
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 focus:border-green-500'
                        }`}
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </Field>
                      {touched.category && errors.category && (
                        <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                          ❌ {errors.category}
                        </p>
                      )}
                    </div>

                    {/* Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ⚡ Equipment Type
                      </label>
                      <Field
                        as="select"
                        name="type"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                          touched.type && errors.type
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 focus:border-green-500'
                        }`}
                      >
                        <option value="">Select type</option>
                        {types.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </Field>
                      {touched.type && errors.type && (
                        <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                          ❌ {errors.type}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📄 Description
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Provide detailed information about the equipment (condition, features, maintenance history, etc.)"
                      className={`w-full px-4 py-3 h-32 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none ${
                        touched.description && errors.description
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 focus:border-green-500'
                      }`}
                    />
                    <div className="flex justify-between items-center mt-2">
                      {touched.description && errors.description && (
                        <p className="text-red-600 text-xs flex items-center gap-1">
                          ❌ {errors.description}
                        </p>
                      )}
                      <p className="text-gray-500 text-xs ml-auto">
                        {values.description.length}/500 characters
                      </p>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-blue-800 text-sm flex gap-2">
                      <span>ℹ️</span>
                      <span>Provide accurate details and high-quality images to get more rental requests. Clear photos increase visibility and trust.</span>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || isUploading || !imageUrl}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition transform hover:scale-[1.02] active:scale-95"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin">⏳</span>
                          Adding...
                        </span>
                      ) : (
                        '✨ Add Equipment'
                      )}
                    </button>
                    <button
                      type="reset"
                      onClick={() => {
                        setPreview("");
                        setImageUrl("");
                      }}
                      className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition"
                    >
                      Clear Form
                    </button>
                  </div>

                </Form>
              )}
            </Formik>
          </div>

        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Tips for Better Listings</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex gap-3">
              <span>✅</span>
              <span>Upload clear, high-quality images of your equipment from multiple angles</span>
            </li>
            <li className="flex gap-3">
              <span>✅</span>
              <span>Use clear, descriptive names that include brand and model</span>
            </li>
            <li className="flex gap-3">
              <span>✅</span>
              <span>Set competitive prices based on market rates and equipment condition</span>
            </li>
            <li className="flex gap-3">
              <span>✅</span>
              <span>Include maintenance history and current condition in description</span>
            </li>
            <li className="flex gap-3">
              <span>✅</span>
              <span>Highlight unique features and capabilities of your equipment</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default AddEquipment;
