import ResetForm from "./ResetForm"

export default function ResetPage({ params }: { params: { token: string } }) {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Réinitialiser le mot de passe</h1>
      <ResetForm token={params.token} />
    </div>
  )
}
