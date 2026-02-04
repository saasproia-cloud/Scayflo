import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.DEBUG_EMAIL || 'admin@example.com'
  const user = await prisma.user.findUnique({ where: { email } })
  console.log('Found user:', !!user, user?.id)
  if (!user) {
    console.log('No user found, exiting')
    return
  }
  const token = crypto.randomBytes(16).toString('hex')
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60)
  const reset = await prisma.passwordReset.create({ data: { userId: user.id, token, expiresAt } })
  console.log('Created reset:', reset)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
