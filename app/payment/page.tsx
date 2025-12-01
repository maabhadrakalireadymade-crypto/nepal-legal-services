'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Wallet, Building2, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import Link from 'link'
import { useSearchParams } from 'next/navigation'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const applicationId = searchParams.get('applicationId')
  const amount = searchParams.get('amount')
  
  const [selectedGateway, setSelectedGateway] = useState<'esewa' | 'khalti' | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePayment = async () => {
    if (!selectedGateway) {
      setError('Please select a payment method')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gateway: selectedGateway,
          applicationId,
          amount: parseFloat(amount || '0'),
          customerName: 'Customer Name', // Get from session/context
          customerEmail: 'customer@email.com',
          customerPhone: '9800000000'
        })
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to payment gateway
        window.location.href = data.data.paymentUrl
      } else {
        setError(data.error || 'Payment initiation failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-nepal-blue" />
          <span className="text-2xl font-bold text-nepal-blue">Nepal Legal Services</span>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Complete Your Payment</h1>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="border-b pb-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Application ID:</span>
                <span className="font-mono font-semibold">{applicationId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount to Pay:</span>
                <span className="text-3xl font-bold text-nepal-blue">NPR {amount}</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

            <div className="space-y-4 mb-6">
              {/* eSewa */}
              <button
                onClick={() => setSelectedGateway('esewa')}
                className={`w-full p-6 border-2 rounded-xl transition flex items-center justify-between ${
                  selectedGateway === 'esewa'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
                    <Wallet className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">eSewa</h3>
                    <p className="text-sm text-gray-600">Digital wallet payment</p>
                  </div>
                </div>
                {selectedGateway === 'esewa' && (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                )}
              </button>

              {/* Khalti */}
              <button
                onClick={() => setSelectedGateway('khalti')}
                className={`w-full p-6 border-2 rounded-xl transition flex items-center justify-between ${
                  selectedGateway === 'khalti'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">Khalti</h3>
                    <p className="text-sm text-gray-600">Digital wallet & cards</p>
                  </div>
                </div>
                {selectedGateway === 'khalti' && (
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                )}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={!selectedGateway || loading}
              className="w-full bg-nepal-blue text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Proceed to Payment</span>
              )}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Secure payment powered by {selectedGateway === 'esewa' ? 'eSewa' : selectedGateway === 'khalti' ? 'Khalti' : 'Nepal Payment Gateway'}
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold mb-3">Payment Information</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ All payments are secure and encrypted</li>
              <li>✓ You will receive a payment confirmation email</li>
              <li>✓ Processing will begin immediately after payment</li>
              <li>✓ Refund available within 24 hours if service not started</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
