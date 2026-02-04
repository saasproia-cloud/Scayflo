import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createToken, setAuthCookie } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { z } from "zod"

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6, "Au moins 6 caractères"),
  companyName: z.string().min(1, "Nom de l'entreprise requis"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, companyName } = bodySchema.parse(body)
    const existing = await prisma.user.findUnique({
      where: { email },
    })
    if (existing) {
      return NextResponse.json(
        { error: "Un compte existe déjà avec cet email." },
        { status: 400 }
      )
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const company = await prisma.company.create({
      data: {
        name: companyName,
        plan: "free",
      },
    })
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        companyId: company.id,
        role: "user",
      } as { email: string; passwordHash: string; name: string; companyId: string; role?: string },
      include: { company: true },
    })
    const token = await createToken({
      userId: user.id,
      email: user.email,
      companyId: user.companyId,
      role: (user as { role?: string }).role ?? "user",
    })
    await setAuthCookie(token)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: (user as { role?: string }).role ?? "user",
        company: { id: user.company.id, name: user.company.name, plan: user.company.plan },
      },
    })
  } catch (e) {
    if (e instanceof z.ZodError) {
      const msg = e.errors.map((x) => x.message).join(", ")
      return NextResponse.json({ error: msg }, { status: 400 })
    }
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    )
  }
}
