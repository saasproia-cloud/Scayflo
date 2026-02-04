import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { createToken, setAuthCookie } from "@/lib/auth"

const bodySchema = z.object({ token: z.string().min(1), password: z.string().min(6) })

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, password } = bodySchema.parse(body)

    const reset = await prisma.passwordReset.findUnique({ where: { token } , include: { user: true }})
    if (!reset || reset.used || reset.expiresAt < new Date()) {
      return NextResponse.json({ error: "Token invalide ou expiré." }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await prisma.user.update({ where: { id: reset.userId }, data: { passwordHash } })

    await prisma.passwordReset.update({ where: { id: reset.id }, data: { used: true } })

    // Auto-login after reset
    const tokenJWT = await createToken({
      userId: reset.user.id,
      email: reset.user.email,
      companyId: reset.user.companyId,
      role: (reset.user as { role?: string }).role ?? "user",
    })
    await setAuthCookie(tokenJWT)

    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 })
    }
    console.error(e)
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ error: String(e) }, { status: 500 })
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
