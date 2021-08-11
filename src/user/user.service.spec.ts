import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockAddAccountParams,
  mockUpdateUserParams,
  mockUpdatedUserModel,
  mockUserModel,
  mockUserArrayModel,
} from '../common/Test/TestUtil';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const mockRepository = {
    find: jest.fn().mockReturnValue(mockUserArrayModel),
    findOne: jest.fn().mockReturnValue(mockUserModel),
    create: jest.fn().mockReturnValue(mockUserModel),
    save: jest.fn().mockReturnValue(mockUserModel),
    update: jest.fn().mockReturnValue(mockUpdatedUserModel),
    delete: jest.fn().mockReturnValue({ affected: 1 }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When findAllUsers', () => {
    it('should be list all users', async () => {
      const users = await service.findAllUsers();
      expect(users).toBe(mockUserArrayModel);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When findUserById', () => {
    it('should find a existing user by id', async () => {
      const userFound = await service.findUserById('1');
      expect(mockRepository.findOne).toHaveBeenCalledWith(mockUserModel.id);
      expect(userFound).toBe(mockUserModel);
    });

    it('should return a exception when doesnt to find a user by id', async () => {
      mockRepository.findOne.mockReturnValue(null);
      const userNotFound = service.findUserById('2');
      expect(userNotFound).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith('2');
    });
  });

  describe('When findUserByEmail', () => {
    it('should find a existing user by email', async () => {
      mockRepository.findOne.mockReturnValue(mockUserModel);
      const userFound = await service.findUserByEmail(mockUserModel.email);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: mockUserModel.email },
      });
      expect(userFound).toBe(mockUserModel);
    });

    it('should return a exception when doesnt find a user by email', async () => {
      mockRepository.findOne.mockReturnValue(null);
      const userNotFound = service.findUserByEmail(mockUserModel.email);
      expect(userNotFound).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: mockUserModel.email },
      });
    });
  });

  describe('When createUser', () => {
    it('should create a user', async () => {
      const user = await service.createUser(mockAddAccountParams);
      expect(mockRepository.create).toBeCalledWith(mockAddAccountParams);
      expect(mockRepository.save).toBeCalledTimes(1);
      expect(user).toBe(mockUserModel);
    });

    it('should return a exception when doesnt create a user', async () => {
      mockRepository.save.mockReturnValue(null);
      const user = service.createUser(mockAddAccountParams);
      expect(user).rejects.toThrow(InternalServerErrorException);
      expect(mockRepository.create).toBeCalledTimes(2);
      expect(mockRepository.save).toBeCalledTimes(2);
    });
  });

  describe('When updateUser', () => {
    it('Should update a user', async () => {
      mockRepository.findOne.mockReturnValue(mockUserModel);
      mockRepository.create.mockReturnValue({
        ...mockUserModel,
        ...mockUpdateUserParams,
      });
      const userFound = await service.findUserById(mockUserModel.id);
      const resultUser = await service.updateUser(mockUserModel.id, {
        ...userFound,
        ...mockUpdateUserParams,
      });
      expect(mockRepository.findOne).toHaveBeenCalledWith(mockUserModel.id);
      expect(resultUser).toStrictEqual(mockUpdatedUserModel);
    });
  });

  describe('When deleteUser', () => {
    it('should delete a existing user', async () => {
      mockRepository.findOne.mockReturnValue(mockUserModel);
      const deletedUser = await service.deleteUser('1');
      expect(deletedUser).toBe(true);
      expect(mockRepository.findOne).toHaveBeenCalledWith(mockUserModel.id);
      expect(mockRepository.delete).toBeCalledWith(mockUserModel);
    });

    it('should not delete a inexisting user', async () => {
      mockRepository.findOne.mockReturnValue(mockUserModel);
      mockRepository.delete.mockReturnValue(null);
      const deletedUser = await service.deleteUser('2');
      expect(deletedUser).toBe(false);
      expect(mockRepository.findOne).toHaveBeenCalledWith(mockUserModel.id);
      expect(mockRepository.delete).toBeCalledWith(mockUserModel);
    });
  });
});
