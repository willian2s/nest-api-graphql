export const findUserByIdQuery = (id: string): string => `
  query {
    userById(id: "${id}") {
      id
      name
      email
    }
  }`;

export const findUserByEmailQuery = (email: string): string => `
  query {
    userByEmail(email: "${email}") {
      id
      name
      email
    }
  }`;

export const findAllUsersQuery = `
  query {
    users {
      id
      name
      email
    }
  }`;
