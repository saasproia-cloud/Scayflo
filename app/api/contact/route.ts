import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(1),
  demoRequest: z.boolean().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = bodySchema.parse(body)
    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company ?? null,
        phone: data.phone ?? null,
        message: data.message,
        demoRequest: data.demoRequest ?? false,
      },
    })
    return NextResponse.json({ ok: true })
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
