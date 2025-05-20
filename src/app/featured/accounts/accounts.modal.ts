export interface ILoginPayload {
  employeeId: string;
  password: string;
}

export interface IResetPasswordPayload {
  employeeId: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IForgotPasswordPayload {
  employeeId: string;
}
