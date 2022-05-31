export interface UserLoginRequestAdapter {
  id: string;
  email: string;
  username: string;
  password: string;
  provider: string;
  uid: string;
}