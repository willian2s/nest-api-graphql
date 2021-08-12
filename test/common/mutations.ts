import {
  mockAddAccountParams,
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

export const deleteUser = (id: string) => `
mutation {
  deleteUser(id: "${id}")
}`;
