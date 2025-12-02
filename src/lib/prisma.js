import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

// Create the pg pool + adapter (required in Prisma 7+ for direct connections)
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// Hot-reload safe singleton (standard pattern in 2025 for both dev & prod)
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