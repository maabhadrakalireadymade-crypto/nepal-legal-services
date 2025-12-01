import { NextRequest, NextResponse } from 'next/server'
import { createPaymentGateway } from '@/lib/payment'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gateway, ...verificationData } = body

    if (!gateway) {
      return NextResponse.json(
        { success: false, error: 'Gateway not specified' },
        { status: 400 }
      )
    }

    const paymentGateway = createPaymentGateway(gateway)
    let verificationResult

    if (gateway === 'esewa') {
      const { oid, amt, refId } = verificationData
      if (!oid || !amt || !refId) {
        return NextResponse.json(
          { success: false, error: 'Missing eSewa verification parameters' },
          { status: 400 }
        )
      }
      verificationResult = await paymentGateway.verifyPayment(oid, amt, refId)
    } else {
      // Khalti
      const { pidx } = verificationData
      if (!pidx) {
        return NextResponse.json(
          { success: false, error: 'Missing Khalti pidx' },
          { status: 400 }
        )
      }
      verificationResult = await paymentGateway.verifyPayment(pidx)
    }

    if (verificationResult.success) {
      // Update payment status in database
      const applicationId = gateway === 'esewa' ? verificationData.oid : verificationData.purchase_order_id
      
      // TODO: Update database
      // await db.updateRegistration(applicationId, {
      //   paymentStatus: 'paid',
      //   paidAmount: amount
      // })
      
      // await db.createPayment({
      //   applicationId,
      //   amount,
      //   method: gateway,
      //   transactionId: verificationResult.data?.transactionId,
      //   status: 'completed'
      // })

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        data: verificationResult.data
      })
    } else {
      return NextResponse.json(
        { success: false, error: verificationResult.message || verificationResult.error },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
