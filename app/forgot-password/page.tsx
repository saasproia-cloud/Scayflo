"use client"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [resetLink, setResetLink] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setResetLink(null)
    try {
      const res = await fetch("/api/auth/forgot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error || "Erreur")
      } else {
        setMessage("Si l'email existe, un lien de réinitialisation a été envoyé.")
        if (data.resetLink) setResetLink(data.resetLink)
      }
    } catch (e) {
      setMessage("Erreur réseau")
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mot de passe oublié</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Envoyer le lien</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
      {resetLink && (
        <div className="mt-3 p-3 bg-gray-100 rounded">
          <p className="text-sm">[DEV] Reset link:</p>
          <pre className="text-xs break-all">{resetLink}</pre>
        </div>
      )}
    </div>
  )
}
