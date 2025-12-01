// Database configuration and connection
// Supports PostgreSQL, MongoDB, or MySQL

export interface Registration {
  id: string
  applicationId: string
  companyType: string
  companyName: string
  businessActivity: string
  registeredAddress: string
  contactPerson: string
  email: string
  phone: string
  panNumber?: string
  numberOfDirectors?: number
  capitalAmount?: number
  additionalServices: string[]
  status: 'pending' | 'processing' | 'completed' | 'rejected'
  totalFee: number
  paidAmount: number
  paymentStatus: 'unpaid' | 'partial' | 'paid'
  documents: Document[]
  createdAt: Date
  updatedAt: Date
  estimatedCompletionDate?: Date
  completedAt?: Date
  notes?: string
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
  uploadedAt: Date
  status: 'pending' | 'approved' | 'rejected'
}

export interface Payment {
  id: string
  applicationId: string
  amount: number
  method: 'esewa' | 'khalti' | 'bank_transfer' | 'cash'
  transactionId?: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  createdAt: Date
  completedAt?: Date
}

// PostgreSQL Example using Prisma
/*
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
*/

// MongoDB Example using Mongoose
/*
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nepal-legal'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB
*/

// Supabase Example
/*
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
*/

// For now, using in-memory storage (replace with actual database)
class InMemoryDB {
  private registrations: Map<string, Registration> = new Map()
  private payments: Map<string, Payment> = new Map()

  async createRegistration(data: Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>): Promise<Registration> {
    const registration: Registration = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.registrations.set(registration.id, registration)
    return registration
  }

  async getRegistration(applicationId: string): Promise<Registration | null> {
    for (const reg of this.registrations.values()) {
      if (reg.applicationId === applicationId) {
        return reg
      }
    }
    return null
  }

  async updateRegistration(id: string, data: Partial<Registration>): Promise<Registration | null> {
    const existing = this.registrations.get(id)
    if (!existing) return null
    
    const updated = { ...existing, ...data, updatedAt: new Date() }
    this.registrations.set(id, updated)
    return updated
  }

  async createPayment(data: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment> {
    const payment: Payment = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    }
    this.payments.set(payment.id, payment)
    return payment
  }

  async getPaymentsByApplication(applicationId: string): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(p => p.applicationId === applicationId)
  }
}

export const db = new InMemoryDB()
