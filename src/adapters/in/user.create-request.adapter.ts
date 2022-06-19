export interface UserCreateRequestAdapter {
  username: string;
  password: string;
  email: string;
  address: string;
  phone: string;
  agreement: boolean;
  token: string;
}
