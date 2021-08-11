import { CreateUserInput } from '../../user/dto/create-user.input';
import { UpdateUserInput } from '../../user/dto/update-user.input';
import { User } from './../../user/user.entity';

export const mockAddAccountParams: CreateUserInput = {
  name: 'Test User',
  email: 'user@email.com',
  password: '123456',
};

export const mockUpdateUserParams: UpdateUserInput = {
  email: 'email-updated@email.com',
};

export const mockUserModel: User = {
  id: '1',
  ...mockAddAccountParams,
};

export const mockUpdatedUserModel: User = {
  ...mockUserModel,
  email: 'email-updated@email.com',
};

export const mockUserArrayModel: User[] = [
  mockUserModel,
  {
    id: '2',
    name: 'Test User 2',
    email: 'email2@email.com',
    password: '123456',
  },
  {
    id: '3',
    name: 'Test User 3',
    email: 'email3@email.com',
    password: '123456',
  },
];
