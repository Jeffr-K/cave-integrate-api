import { UserCreateRequestAdapter } from './user.create-request.adapter';

export interface UserUpdateRequestAdapter extends UserCreateRequestAdapter {
  id: number;
}