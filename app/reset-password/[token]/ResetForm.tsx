"use client"
import { useState } from "react"

export default function ResetForm({ token }: { token: string }) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    if (password.length < 6) return setMessage("Le mot de passe doit contenir au moins 6 caractères")
    if (password !== confirmPassword) return setMessage("Les mots de passe ne correspondent pas")

    try {
      const res = await fetch("/api/auth/reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password }) })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error || "Erreur")
      } else {
        setMessage("Mot de passe modifié avec succès. Vous êtes connecté.")
      }
    } catch (e) {
      setMessage("Erreur réseau")
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nouveau mot de passe</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Confirmer le mot de passe</label>
        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="mt-1 block w-full border rounded px-3 py-2" required />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Réinitialiser</button>
      {message && <p className="mt-3">{message}</p>}
    </form>
  )
}
