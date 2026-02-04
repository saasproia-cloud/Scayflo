import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const bodySchema = z.object({ plan: z.enum(["free", "premium"]) })

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session || (session as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
  }
  const { id } = await params
  const body = await _request.json().catch(() => ({}))
  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "plan requis: free ou premium" }, { status: 400 })
  }
  const company = await prisma.company.update({
    where: { id },
    data: { plan: parsed.data.plan },
  })
  return NextResponse.json({ id: company.id, plan: company.plan })
}
