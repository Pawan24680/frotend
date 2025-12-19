'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { TailChase } from 'ldrs/react'
import 'ldrs/react/TailChase.css'
import { useRouter } from 'next/navigation';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[0-9]/, 'Must contain a number')
    .matches(/[@$!%*#?&]/, 'Must contain a special character (@$!%*#?&)'),
  confirmPassword: Yup.string().required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      axios.post('http://localhost:5000/user/add', values)
        .then((result) => {
          toast.success('Account created successfully!');
          resetForm();
          router.push('/login');
        }).catch((err) => {
          console.log(err);
          toast.error(err.response?.data?.message || 'Error creating account');
          setSubmitting(false);
        });
    },
    validationSchema: SignupSchema
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-green-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🌾</span>
            <span className="text-3xl font-bold text-white">AgriRent</span>
          </div>
          <p className="text-green-100 text-sm">Create Your Account Today</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-8">
            <h1 className="text-2xl font-bold text-white">Get Started</h1>
            <p className="text-green-100 text-sm mt-1">Join thousands of farmers on AgriRent</p>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8">
            
            {/* Google Signup Button */}
            <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition">
              <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
              </svg>
              Sign up with Google
            </button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-medium">Or continue with email</span>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={signupForm.handleSubmit} className="space-y-5">
              
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  👤 Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  value={signupForm.values.name}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                    signupForm.touched.name && signupForm.errors.name
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 focus:border-green-500'
                  }`}
                />
                {signupForm.touched.name && signupForm.errors.name && (
                  <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                    ❌ {signupForm.errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  📧 Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  value={signupForm.values.email}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                    signupForm.touched.email && signupForm.errors.email
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 focus:border-green-500'
                  }`}
                />
                {signupForm.touched.email && signupForm.errors.email && (
                  <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                    ❌ {signupForm.errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  🔒 Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter a strong password"
                    onChange={signupForm.handleChange}
                    onBlur={signupForm.handleBlur}
                    value={signupForm.values.password}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                      signupForm.touched.password && signupForm.errors.password
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-green-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {signupForm.touched.password && signupForm.errors.password && (
                  <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                    ❌ {signupForm.errors.password}
                  </p>
                )}
                {/* Password Requirements */}
                {signupForm.values.password && (
                  <div className="mt-3 text-xs space-y-1">
                    <p className={signupForm.values.password.length >= 6 ? 'text-green-600' : 'text-gray-600'}>
                      ✓ At least 6 characters
                    </p>
                    <p className={/[A-Z]/.test(signupForm.values.password) ? 'text-green-600' : 'text-gray-600'}>
                      ✓ One uppercase letter
                    </p>
                    <p className={/[a-z]/.test(signupForm.values.password) ? 'text-green-600' : 'text-gray-600'}>
                      ✓ One lowercase letter
                    </p>
                    <p className={/[0-9]/.test(signupForm.values.password) ? 'text-green-600' : 'text-gray-600'}>
                      ✓ One number
                    </p>
                    <p className={/[@$!%*#?&]/.test(signupForm.values.password) ? 'text-green-600' : 'text-gray-600'}>
                      ✓ One special character (@$!%*#?&)
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  🔐 Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="Re-enter your password"
                    onChange={signupForm.handleChange}
                    onBlur={signupForm.handleBlur}
                    value={signupForm.values.confirmPassword}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                      signupForm.touched.confirmPassword && signupForm.errors.confirmPassword
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 focus:border-green-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
                  <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                    ❌ {signupForm.errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="mt-1 w-4 h-4 border-gray-300 rounded accent-green-600 cursor-pointer"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-green-600 hover:text-green-700 font-medium">Terms and Conditions</a> and <a href="#" className="text-green-600 hover:text-green-700 font-medium">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                disabled={signupForm.isSubmitting}
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition transform hover:scale-[1.02] active:scale-95"
              >
                {signupForm.isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <TailChase size="20" speed="1.75" color="white" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  '🌱 Create Account'
                )}
              </button>

            </form>

          </div>

          {/* Sign In Link */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-gray-700 text-sm">
              Already have an account?
              <a
                href="/login"
                className="text-green-600 hover:text-green-700 font-bold ml-1 transition"
              >
                Sign in here
              </a>
            </p>
          </div>

        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-green-100 text-xs">
          <p>By signing up, you agree to our Terms & Privacy Policy</p>
        </div>

      </div>
    </div>
  )
}

export default Signup;