import { NextRequest, NextResponse } from 'next/server'
import { createPaymentGateway } from '@/lib/payment'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gateway, applicationId, amount, customerName, customerEmail, customerPhone } = body

    if (!gateway || !applicationId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!['esewa', 'khalti'].includes(gateway)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment gateway' },
        { status: 400 }
      )
    }

    const paymentGateway = createPaymentGateway(gateway)

    if (gateway === 'esewa') {
      const paymentUrl = paymentGateway.generatePaymentUrl({
        gateway,
        amount,
        applicationId,
        customerName,
        customerEmail,
        customerPhone
      })

      return NextResponse.json({
        success: true,
        data: {
          gateway: 'esewa',
          paymentUrl,
          message: 'Redirect to eSewa for payment'
        }
      })
    } else {
      // Khalti
      const result = await paymentGateway.initiatePayment({
        gateway,
        amount,
        applicationId,
        customerName,
        customerEmail,
        customerPhone
      })

      if (result.success) {
        return NextResponse.json({
          success: true,
          data: {
            gateway: 'khalti',
            paymentUrl: result.paymentUrl,
            pidx: result.pidx,
            message: 'Redirect to Khalti for payment'
          }
        })
      } else {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        )
      }
    }
  } catch (error) {
    console.error('Payment initiation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
