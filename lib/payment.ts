// Payment Gateway Integration for Nepal
// Supports eSewa and Khalti

export interface PaymentConfig {
  gateway: 'esewa' | 'khalti'
  amount: number
  applicationId: string
  customerName: string
  customerEmail: string
  customerPhone: string
}

export interface EsewaConfig {
  merchantId: string
  merchantSecret: string
  successUrl: string
  failureUrl: string
}

export interface KhaltiConfig {
  publicKey: string
  secretKey: string
  successUrl: string
  failureUrl: string
}

// eSewa Payment Integration
export class EsewaPayment {
  private config: EsewaConfig

  constructor(config: EsewaConfig) {
    this.config = config
  }

  generatePaymentUrl(payment: PaymentConfig): string {
    const params = new URLSearchParams({
      amt: payment.amount.toString(),
      psc: '0',
      pdc: '0',
      txAmt: '0',
      tAmt: payment.amount.toString(),
      pid: payment.applicationId,
      scd: this.config.merchantId,
      su: this.config.successUrl,
      fu: this.config.failureUrl
    })

    // Production URL: https://esewa.com.np/epay/main
    // Test URL: https://uat.esewa.com.np/epay/main
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://esewa.com.np/epay/main'
      : 'https://uat.esewa.com.np/epay/main'

    return `${baseUrl}?${params.toString()}`
  }

  async verifyPayment(
    oid: string,
    amt: string,
    refId: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const params = new URLSearchParams({
        amt,
        rid: refId,
        pid: oid,
        scd: this.config.merchantId
      })

      const verifyUrl = process.env.NODE_ENV === 'production'
        ? 'https://esewa.com.np/epay/transrec'
        : 'https://uat.esewa.com.np/epay/transrec'

      const response = await fetch(`${verifyUrl}?${params.toString()}`)
      const text = await response.text()

      if (text.includes('Success')) {
        return { success: true, message: 'Payment verified successfully' }
      }

      return { success: false, message: 'Payment verification failed' }
    } catch (error) {
      console.error('eSewa verification error:', error)
      return { success: false, message: 'Payment verification error' }
    }
  }
}

// Khalti Payment Integration
export class KhaltiPayment {
  private config: KhaltiConfig

  constructor(config: KhaltiConfig) {
    this.config = config
  }

  async initiatePayment(payment: PaymentConfig): Promise<{
    success: boolean
    paymentUrl?: string
    pidx?: string
    error?: string
  }> {
    try {
      const response = await fetch('https://khalti.com/api/v2/epayment/initiate/', {
        method: 'POST',
        headers: {
          'Authorization': `Key ${this.config.secretKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          return_url: this.config.successUrl,
          website_url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          amount: payment.amount * 100, // Khalti uses paisa (1 NPR = 100 paisa)
          purchase_order_id: payment.applicationId,
          purchase_order_name: 'Company Registration Service',
          customer_info: {
            name: payment.customerName,
            email: payment.customerEmail,
            phone: payment.customerPhone
          }
        })
      })

      const data = await response.json()

      if (data.pidx) {
        return {
          success: true,
          paymentUrl: data.payment_url,
          pidx: data.pidx
        }
      }

      return {
        success: false,
        error: data.detail || 'Payment initiation failed'
      }
    } catch (error) {
      console.error('Khalti initiation error:', error)
      return {
        success: false,
        error: 'Payment initiation error'
      }
    }
  }

  async verifyPayment(pidx: string): Promise<{
    success: boolean
    data?: any
    error?: string
  }> {
    try {
      const response = await fetch('https://khalti.com/api/v2/epayment/lookup/', {
        method: 'POST',
        headers: {
          'Authorization': `Key ${this.config.secretKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pidx })
      })

      const data = await response.json()

      if (data.status === 'Completed') {
        return {
          success: true,
          data: {
            transactionId: data.transaction_id,
            amount: data.total_amount / 100, // Convert paisa to NPR
            status: data.status
          }
        }
      }

      return {
        success: false,
        error: 'Payment not completed'
      }
    } catch (error) {
      console.error('Khalti verification error:', error)
      return {
        success: false,
        error: 'Payment verification error'
      }
    }
  }
}

// Payment Gateway Factory
export function createPaymentGateway(gateway: 'esewa' | 'khalti') {
  if (gateway === 'esewa') {
    return new EsewaPayment({
      merchantId: process.env.ESEWA_MERCHANT_ID || '',
      merchantSecret: process.env.ESEWA_MERCHANT_SECRET || '',
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
      failureUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/failure`
    })
  } else {
    return new KhaltiPayment({
      publicKey: process.env.KHALTI_PUBLIC_KEY || '',
      secretKey: process.env.KHALTI_SECRET_KEY || '',
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
      failureUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/failure`
    })
  }
}
