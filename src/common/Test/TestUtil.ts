import { AuthInput } from 'src/auth/dto/auth.input';
import { AuthType } from 'src/auth/dto/auth.type';
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

export const mockDataAccountParams: AuthInput = {
  email: 'user@email.com',
  password: '123456',
};

export const mockUserDB: User = {
  id: '1',
  name: 'Test User',
  email: 'user@email.com',
  password: '$2b$10$IGnHsuqlypxLFmUpyhpVL.v6ezTtya4o3epAAgeYWWLcazSWMdrDa',
};

export const mockUserAuthModel: AuthType = {
  user: mockUserDB,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJzdWIiOjEsImlhdCI6MTYyODg1NzQyMSwiZXhwIjoxNjI4ODU3NTQxfQ.uWdAeF8vHT8htCPvwI5SYs3PjqaRPzuDseox2F8TrJg',
};

export const mockJwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJzdWIiOjEsImlhdCI6MTYyODg1NzQyMSwiZXhwIjoxNjI4ODU3NTQxfQ.uWdAeF8vHT8htCPvwI5SYs3PjqaRPzuDseox2F8TrJg';

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
