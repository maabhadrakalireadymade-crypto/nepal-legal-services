'use client'

import { Building2, FileText, Scale, Shield, CheckCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const services = [
    {
      icon: Building2,
      title: 'Company Registration',
      description: 'Register Private Ltd, Public Ltd, Partnership, or Sole Proprietorship companies',
      link: '/services/company-registration'
    },
    {
      icon: FileText,
      title: 'Legal Documentation',
      description: 'MOA, AOA, Partnership Deeds, and all legal documents',
      link: '/services/legal-docs'
    },
    {
      icon: Scale,
      title: 'Tax Registration',
      description: 'PAN, VAT, and tax compliance services',
      link: '/services/tax-registration'
    },
    {
      icon: Shield,
      title: 'Trademark & IP',
      description: 'Trademark registration and intellectual property protection',
      link: '/services/trademark'
    }
  ]

  const features = [
    'Fast processing within 7-15 days',
    'Expert legal consultation',
    'Affordable pricing',
    'Complete documentation support',
    'Government liaison services',
    'Post-registration support'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-nepal-blue" />
            <span className="text-2xl font-bold text-nepal-blue">Nepal Legal Services</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="#services" className="text-gray-700 hover:text-nepal-blue">Services</Link>
            <Link href="#about" className="text-gray-700 hover:text-nepal-blue">About</Link>
            <Link href="#contact" className="text-gray-700 hover:text-nepal-blue">Contact</Link>
          </div>
          <Link href="/register" className="bg-nepal-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
          Company Registration &<br />Legal Services in Nepal
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Professional, fast, and reliable company registration and legal documentation services. 
          Start your business journey with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="bg-nepal-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition flex items-center justify-center">
            Register Your Company
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="#services" className="bg-white text-nepal-blue border-2 border-nepal-blue px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition">
            Explore Services
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={service.link} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <service.icon className="h-12 w-12 text-nepal-blue mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-nepal-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Simple 4-Step Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '1', title: 'Choose Service', desc: 'Select the service you need' },
            { step: '2', title: 'Submit Documents', desc: 'Upload required documents online' },
            { step: '3', title: 'We Process', desc: 'Our experts handle everything' },
            { step: '4', title: 'Get Registered', desc: 'Receive your certificates' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-nepal-red text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Phone className="h-12 w-12 text-nepal-blue mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+977-1-XXXXXXX</p>
            </div>
            <div className="text-center">
              <Mail className="h-12 w-12 text-nepal-blue mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@nepallegal.com</p>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 text-nepal-blue mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-600">Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Nepal Legal Services. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Professional Company Registration & Legal Services</p>
        </div>
      </footer>
    </div>
  )
}
