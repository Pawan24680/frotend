
'use client'

import React from 'react'
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
  password: Yup.string().required('Password is required')
})

const Login = () => {
  const router = useRouter()

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    validationSchema: LoginSchema,

    onSubmit: (values, { setSubmitting, resetForm }) => {
      axios.post('http://localhost:5000/user/login', values)
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
    <div className="mt-10">
      <div className="max-w-lg mx-auto mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">

          {/* Header */}
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Login
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Don&apos;t have an account?
              <a
                href="/signup"
                className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 ms-1"
              >
                Sign up here
              </a>
            </p>
          </div>

          {/* Form */}
          <div className="mt-5">
            <form onSubmit={loginForm.handleSubmit}>
              <div className="grid gap-y-4">

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.email}
                    className="py-2.5 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                  />
                  {
                    loginForm.touched.email && loginForm.errors.email && (
                      <p className="text-xs text-red-600 mt-2">
                        {loginForm.errors.email}
                      </p>
                    )
                  }
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                    className="py-2.5 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                  />
                  {
                    loginForm.touched.password && loginForm.errors.password && (
                      <p className="text-xs text-red-600 mt-2">
                        {loginForm.errors.password}
                      </p>
                    )
                  }
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
                    />
                    <label htmlFor="remember" className="ms-2 text-sm dark:text-white">
                      Remember me
                    </label>
                  </div>

                  <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  disabled={loginForm.isSubmitting}
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {
                    loginForm.isSubmitting ? (
                      <l-tail-chase size="30" speed="1.75" color="white"></l-tail-chase>
                    ) : (
                      'Sign in'
                    )
                  }
                </button>

              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
