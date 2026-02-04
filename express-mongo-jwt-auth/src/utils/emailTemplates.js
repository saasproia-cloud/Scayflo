export const welcomeEmailTemplate = (userName, verificationLink) => `
  <h1>Welcome to Our Service, ${userName}!</h1>
  <p>Thank you for registering. Please verify your email by clicking the link below:</p>
  <a href="${verificationLink}">Verify Email</a>
`;

export const passwordResetEmailTemplate = (userName, resetLink) => `
  <h1>Password Reset Request</h1>
  <p>Hello ${userName},</p>
  <p>We received a request to reset your password. You can reset it by clicking the link below:</p>
  <a href="${resetLink}">Reset Password</a>
`;

export const accountActivationEmailTemplate = (userName, activationLink) => `
  <h1>Activate Your Account</h1>
  <p>Hi ${userName},</p>
  <p>To activate your account, please click the link below:</p>
  <a href="${activationLink}">Activate Account</a>
`;