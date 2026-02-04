export async function sendResetEmail(to: string, resetLink: string) {
  // Basic placeholder: in production use SendGrid / Nodemailer / SMTP provider
  if (process.env.NODE_ENV !== "production") {
    console.log(`[DEV] Envoyer email de reset à ${to}: ${resetLink}`)
    return
  }

  // Production: attempt to send, fallback to logging
  try {
    // TODO: integrate real email provider here (SendGrid, SMTP, etc.)
    console.log(`Send reset email to ${to}: ${resetLink}`)
  } catch (e) {
    console.error("Failed to send reset email", e)
  }
}
