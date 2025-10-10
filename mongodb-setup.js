// MongoDB Setup Script
// Run this in MongoDB Compass or MongoDB Shell

// Create database
use credit_system

// Create collections with indexes
db.createCollection("user_credits")
db.createCollection("site_creations") 
db.createCollection("credit_transactions")

// Create indexes for better performance
db.user_credits.createIndex({ "user_id": 1 }, { unique: true })
db.site_creations.createIndex({ "user_id": 1 })
db.site_creations.createIndex({ "created_at": -1 })
db.credit_transactions.createIndex({ "user_id": 1 })
db.credit_transactions.createIndex({ "created_at": -1 })

// Sample data for testing (optional)
db.user_credits.insertOne({
  user_id: "user_123",
  total_credits: 5,
  used_credits: 0,
  plan_type: "pro",
  created_at: new Date(),
  updated_at: new Date()
})

print("MongoDB collections created successfully!")
print("Collections: user_credits, site_creations, credit_transactions")
print("Indexes created for optimal performance")
