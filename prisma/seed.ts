import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = bcrypt.hashSync('admin1234', 10)

  // Create a test company + admin user if not exists
  let company = await prisma.company.findFirst({ where: { name: 'Demo Company' } })
  if (!company) {
    company = await prisma.company.create({ data: { name: 'Demo Company', plan: 'premium' } })
  }

  const adminEmail = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',')[0] : 'admin@example.com'

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: 'Admin',
        role: 'admin',
        companyId: company.id,
      },
    })
    console.log('Admin user created:', adminEmail)
  } else {
    console.log('Admin user already exists:', adminEmail)
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
