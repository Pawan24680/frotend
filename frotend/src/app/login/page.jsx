'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { tailChase } from 'ldrs'

// register loader once
tailChase.register()

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

const Login = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    validationSchema: LoginSchema,

    onSubmit: (values, { setSubmitting, resetForm }) => {
      axios.post('http://localhost:5000/user/authenticate', values)
        .then((res) => {
          toast.success('Login successful')
          resetForm()
          router.push('/') // change to dashboard if needed
        })
        .catch((err) => {
          console.log(err)
          toast.error('Invalid email or password')
          setSubmitting(false)
        })
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-green-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🌾</span>
            <span className="text-3xl font-bold text-white">AgriRent</span>
          </div>
          <p className="text-green-100 text-sm">Rent Agricultural Equipment Easily</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-8">
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-green-100 text-sm mt-1">Login to your AgriRent account</p>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8">
            <form onSubmit={loginForm.handleSubmit} className="space-y-5">
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  📧 Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  value={loginForm.values.email}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                    loginForm.touched.email && loginForm.errors.email
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 focus:border-green-500'
                  }`}
                />
                {loginForm.touched.email && loginForm.errors.email && (
                  <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                    ❌ {loginForm.errors.email}
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
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    value={loginForm.values.password}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                      loginForm.touched.password && loginForm.errors.password
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
                {loginForm.touched.password && loginForm.errors.password && (
                  <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                    ❌ {loginForm.errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded accent-green-600"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-green-600 hover:text-green-700 font-medium transition"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                disabled={loginForm.isSubmitting}
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition transform hover:scale-[1.02] active:scale-95"
              >
                {loginForm.isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <l-tail-chase size="20" speed="1.75" color="white"></l-tail-chase>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  '🚀 Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="relative pt-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="py-2 px-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition flex items-center justify-center gap-2 text-sm font-medium text-gray-700"
                >
                  <span>👤</span> Google
                </button>
                <button
                  type="button"
                  className="py-2 px-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition flex items-center justify-center gap-2 text-sm font-medium text-gray-700"
                >
                  <span>📘</span> Facebook
                </button>
              </div>

            </form>
          </div>

          {/* Sign Up Link */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-gray-700 text-sm">
              Don&apos;t have an account?
              <a
                href="/signup"
                className="text-green-600 hover:text-green-700 font-bold ml-1 transition"
              >
                Sign up here
              </a>
            </p>
          </div>

        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-green-100 text-xs">
          <p>By signing in, you agree to our Terms & Privacy Policy</p>
        </div>

      </div>
    </div>
  )
}

export default Login
