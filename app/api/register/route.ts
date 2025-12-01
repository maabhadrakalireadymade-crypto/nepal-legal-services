import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['companyType', 'companyName', 'businessActivity', 'registeredAddress', 'contactPerson', 'email', 'phone']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Generate application ID
    const applicationId = `NLS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify admin team
    // 4. Create payment invoice if needed
    
    const registrationData = {
      ...body,
      applicationId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedCompletionDays: getEstimatedDays(body.companyType),
      totalFee: calculateFees(body)
    }

    // TODO: Save to database
    // await db.registrations.create(registrationData)
    
    // TODO: Send email notification
    // await sendEmail({
    //   to: body.email,
    //   subject: 'Company Registration Application Received',
    //   template: 'registration-confirmation',
    //   data: registrationData
    // })

    return NextResponse.json({
      success: true,
      data: {
        applicationId,
        message: 'Application submitted successfully',
        estimatedDays: registrationData.estimatedCompletionDays,
        totalFee: registrationData.totalFee,
        nextSteps: [
          'Our team will review your application within 24 hours',
          'You will receive a payment link via email',
          'Submit required documents as per our checklist',
          'Track your application status using the application ID'
        ]
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getEstimatedDays(companyType: string): number {
  const daysMap: Record<string, number> = {
    'private': 10,
    'public': 15,
    'partnership': 7,
    'sole': 5
  }
  return daysMap[companyType] || 10
}

function calculateFees(data: any): number {
  let baseFee = 0
  
  // Base registration fees (in NPR)
  const feeMap: Record<string, number> = {
    'private': 15000,
    'public': 25000,
    'partnership': 8000,
    'sole': 5000
  }
  
  baseFee = feeMap[data.companyType] || 15000
  
  // Additional service fees
  const additionalFees: Record<string, number> = {
    'PAN Registration': 2000,
    'VAT Registration': 3000,
    'Trademark Registration': 10000,
    'Bank Account Opening': 2500
  }
  
  if (data.additionalServices && Array.isArray(data.additionalServices)) {
    data.additionalServices.forEach((service: string) => {
      baseFee += additionalFees[service] || 0
    })
  }
  
  return baseFee
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const applicationId = searchParams.get('applicationId')
  
  if (!applicationId) {
    return NextResponse.json(
      { success: false, error: 'Application ID is required' },
      { status: 400 }
    )
  }
  
  // TODO: Fetch from database
  // const application = await db.registrations.findOne({ applicationId })
  
  return NextResponse.json({
    success: true,
    data: {
      applicationId,
      status: 'pending',
      message: 'Application is being processed'
    }
  })
}
