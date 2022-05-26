export interface UserLoginRequestAdapter {
  email: string;
  password: string;
  provider: string;
  uid: string;
}