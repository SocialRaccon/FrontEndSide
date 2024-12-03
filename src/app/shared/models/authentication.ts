export interface AuthenticationDTO {
  email: string;
  password: string;
  newPassword: string;
}

export interface PasswordRecoveryDTO {
  email: string;
}
