import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockDataAccountParams,
  mockJwtToken,
  mockUserAuthModel,
  mockUserDB,
} from '../common/Test/TestUtil';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockService = {
    findUserByEmail: jest.fn().mockReturnValue(mockUserDB),
  };
  const jwtMocks = {
    signAsync: jest.fn().mockReturnValue(mockJwtToken),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockService,
        },
        {
          provide: JwtService,
          useValue: jwtMocks,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When login', () => {
    it('should make login', async () => {
      const userAuth = await service.validateUser(mockDataAccountParams);
      expect(userAuth).toStrictEqual(mockUserAuthModel);
    });

    it('should return a exception whe doesnt login', async () => {
      const userAuth = service.validateUser({
        ...mockDataAccountParams,
        password: '123',
      });
      expect(userAuth).rejects.toThrow(UnauthorizedException);
      expect(mockService.findUserByEmail).toBeCalledTimes(2);
    });
  });
});
