import {
  mockAddAccountParams,
  mockDataAccountParams,
  mockUpdateUserParams,
} from '../../src/common/Test/TestUtil';

const createUserObject = JSON.stringify(mockAddAccountParams).replace(
  /\"([^(\")"]+)\":/g,
  '$1:',
);
export const createUserMutation = `
mutation {
  createUser(data: ${createUserObject}) {
    id
    name
    email
  }
}`;

const updateUserObject = JSON.stringify(mockUpdateUserParams).replace(
  /\"([^(\")"]+)\":/g,
  '$1:',
);
export const updateUserMutation = (id: string): string => `
  mutation {
    updateUser(data: ${updateUserObject}, id: "${id}") {
      id
      name
      email
    }
  }`;

const loginObject = JSON.stringify(mockDataAccountParams).replace(
  /\"([^(\")"]+)\":/g,
  '$1:',
);
export const LoginMutation = `
  mutation {
    login(data: ${loginObject}) {
      user {
        id
        name
        email
      }
      token
    }
  }`;

export const deleteUser = (id: string) => `
mutation {
  deleteUser(id: "${id}")
}`;
