import { Address } from '../../modules/user/domain/entities/address.entity';

export interface UserCreateRequestAdapter {
  username: string;
  password: string;
  email: string;
  address: Address;
  phone: string;
  agreement: boolean;
  token: string;
}
