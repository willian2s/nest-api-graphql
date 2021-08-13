import { hashPasswordTransform } from './crypto';

describe('Crypto', () => {
  it('Shoud encrypt password', () => {
    const hash = hashPasswordTransform.to('123456');
    const newHash = hashPasswordTransform.from(hash);

    expect(newHash).toEqual(expect.any(String));
  });
});
