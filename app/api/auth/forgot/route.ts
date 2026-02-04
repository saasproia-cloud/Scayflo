import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendResetEmail } from "@/lib/email"
import crypto from "crypto"
import { z } from "zod"

const bodySchema = z.object({ email: z.string().email() })

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = bodySchema.parse(body)

    const user = await prisma.user.findUnique({ where: { email } })

    // Always respond OK to avoid email enumeration
    if (!user) {
      return NextResponse.json({ ok: true })
    }

    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    })

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/reset-password/${token}`

    try {
      await sendResetEmail(user.email, resetLink)
    } catch (err) {
      console.error("Failed to send reset email", err)
      // Don't fail the request for email provider errors; return OK to avoid enumeration
      if (process.env.NODE_ENV !== "production") {
        return NextResponse.json({ ok: true, resetLink, sendError: String(err) })
      }
      return NextResponse.json({ ok: true })
    }

    // In development, return the link to make testing easier
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, resetLink })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 })
    }
    console.error(e)
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ error: String(e) }, { status: 500 })
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
