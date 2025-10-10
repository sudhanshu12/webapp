import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI!
const client = new MongoClient(uri)

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db('credit_system')

    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

// MongoDB Collections
export const COLLECTIONS = {
  USER_CREDITS: 'user_credits',
  SITE_CREATIONS: 'site_creations',
  CREDIT_TRANSACTIONS: 'credit_transactions'
} as const

// MongoDB Types
export interface UserCredits {
  _id?: string
  user_id: string
  total_credits: number
  used_credits: number
  plan_type: 'free' | 'pro' | 'enterprise'
  created_at: Date
  updated_at: Date
}

export interface SiteCreation {
  _id?: string
  user_id: string
  site_name: string
  credits_used: number
  created_at: Date
  status: 'completed' | 'failed'
}

export interface CreditTransaction {
  _id?: string
  user_id: string
  type: 'deduct' | 'add' | 'purchase'
  amount: number
  description: string
  created_at: Date
}
