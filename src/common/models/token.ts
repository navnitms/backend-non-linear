export interface TokenInput {
  email: string;
  id: string;
}

export interface TokenResponse {
  token: string;
  userId: string;
}
