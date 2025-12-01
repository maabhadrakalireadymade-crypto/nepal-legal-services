'use client'

import { useState } from 'react'
import { Building2, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    companyType: '',
    companyName: '',
    businessActivity: '',
    registeredAddress: '',
    contactPerson: '',
    email: '',
    phone: '',
    panNumber: '',
    numberOfDirectors: '',
    capitalAmount: '',
    additionalServices: [] as string[]
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCheckboxChange = (service: string) => {
    setFormData({
      ...formData,
      additionalServices: formData.additionalServices.includes(service)
        ? formData.additionalServices.filter(s => s !== service)
        : [...formData.additionalServices, service]
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing Nepal Legal Services. Our team will review your application and contact you within 24 hours.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Application ID: <span className="font-mono font-semibold">NLS-{Date.now()}</span>
          </p>
          <Link href="/" className="bg-nepal-blue text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-6 w-6 text-nepal-blue" />
            <Building2 className="h-8 w-8 text-nepal-blue" />
            <span className="text-2xl font-bold text-nepal-blue">Nepal Legal Services</span>
          </Link>
        </nav>
      </header>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Company Registration Form</h1>
          <p className="text-center text-gray-600 mb-8">Fill in the details below to start your company registration process</p>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Company Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Type <span className="text-red-500">*</span>
              </label>
              <select
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
              >
                <option value="">Select company type</option>
                <option value="private">Private Limited Company</option>
                <option value="public">Public Limited Company</option>
                <option value="partnership">Partnership Firm</option>
                <option value="sole">Sole Proprietorship</option>
              </select>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Proposed Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="Enter your company name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
              />
            </div>

            {/* Business Activity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Activity <span className="text-red-500">*</span>
              </label>
              <textarea
                name="businessActivity"
                value={formData.businessActivity}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe your business activities"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
              />
            </div>

            {/* Registered Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Registered Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="registeredAddress"
                value={formData.registeredAddress}
                onChange={handleChange}
                required
                placeholder="Enter registered office address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
              />
            </div>

            {/* Contact Person */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+977-XXXXXXXXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
              />
            </div>

            {/* Number of Directors & Capital */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Directors
                </label>
                <input
                  type="number"
                  name="numberOfDirectors"
                  value={formData.numberOfDirectors}
                  onChange={handleChange}
                  placeholder="e.g., 2"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Capital Amount (NPR)
                </label>
                <input
                  type="number"
                  name="capitalAmount"
                  value={formData.capitalAmount}
                  onChange={handleChange}
                  placeholder="e.g., 100000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
                />
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Additional Services
              </label>
              <div className="space-y-2">
                {['PAN Registration', 'VAT Registration', 'Trademark Registration', 'Bank Account Opening'].map((service) => (
                  <label key={service} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.additionalServices.includes(service)}
                      onChange={() => handleCheckboxChange(service)}
                      className="w-5 h-5 text-nepal-blue border-gray-300 rounded focus:ring-nepal-blue"
                    />
                    <span className="text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-nepal-red text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
            >
              Submit Application
            </button>

            <p className="text-sm text-gray-500 text-center">
              By submitting this form, you agree to our terms and conditions
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
