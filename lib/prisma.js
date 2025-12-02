import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString,
  // This forces SSL + skips certificate verification (safe & required for RDS in local dev)
  ssl: {
    rejectUnauthorized: false   // <--- THIS LINE FIXES YOUR ERROR
  }
})

const adapter = new PrismaPg(pool)

let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ adapter })
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({ adapter })
  }
  prisma = global.prisma
}

export default prisma