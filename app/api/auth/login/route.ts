import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createToken, setAuthCookie } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { z } from "zod"

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = bodySchema.parse(body)
    const user = await prisma.user.findUnique({
      where: { email },
      include: { company: true },
    })
    if (!user) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect." },
        { status: 401 }
      )
    }
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect." },
        { status: 401 }
      )
    }
    const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean)
    const isAdmin = adminEmails.includes(user.email.toLowerCase()) || (user as { role?: string }).role === "admin"
    const token = await createToken({
      userId: user.id,
      email: user.email,
      companyId: user.companyId,
      role: isAdmin ? "admin" : "user",
    })
    await setAuthCookie(token)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: isAdmin ? "admin" : "user",
        company: { id: user.company.id, name: user.company.name, plan: user.company.plan },
      },
    })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides." },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    )
  }
}
