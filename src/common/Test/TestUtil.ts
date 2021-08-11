import { User } from '../../user/user.entity';

export default class TestUtil {
  static giveMeAValidUser(): User {
    const user = new User();
    user.email = 'valid@mail.com';
    user.name = 'jhon Doe';
    user.id = '1';
    return user;
  }
}
