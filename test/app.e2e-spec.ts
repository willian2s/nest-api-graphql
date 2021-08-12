import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  mockUserModel,
  mockUpdatedUserModel,
} from '../src/common/Test/TestUtil';
import {
  createUserMutation,
  deleteUser,
  updateUserMutation,
} from './common/mutations';
import {
  findUserByIdQuery,
  findUserByEmailQuery,
  findAllUsersQuery,
} from './common/querys';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let id: string;
  let email: string;

  describe('createUser', () => {
    it('should create a user', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: createUserMutation,
        })
        .expect(({ body }) => {
          const data = body.data.createUser;
          id = data.id;
          email = data.email;
          expect(data.email).toBe(mockUserModel.email);
          expect(data.name).toBe(mockUserModel.name);
        })
        .expect(200);
    });
  });

  describe('users', () => {
    it('should return all users', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: findAllUsersQuery,
        })
        .expect(({ body }) => {
          const data = body.data.users;
          expect(data).toHaveLength(2);
        })
        .expect(200);
    });
  });

  describe('userById', () => {
    it('should return a user by Id', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: findUserByIdQuery(id),
        })
        .expect(({ body }) => {
          const data = body.data.userById;
          expect(data.email).toBe(mockUserModel.email);
          expect(data.name).toBe(mockUserModel.name);
        })
        .expect(200);
    });
  });

  describe('userByEmail', () => {
    it('should return a user by email', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: findUserByEmailQuery(email),
        })
        .expect(({ body }) => {
          const data = body.data.userByEmail;
          expect(data.email).toBe(mockUserModel.email);
          expect(data.name).toBe(mockUserModel.name);
        })
        .expect(200);
    });
  });

  describe('updateUser', () => {
    it('should create a user', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: updateUserMutation(id),
        })
        .expect(({ body }) => {
          const data = body.data.updateUser;
          expect(data.email).toBe(mockUpdatedUserModel.email);
        })
        .expect(200);
    });
  });

  describe('deleteUser', () => {
    it('deleteUser', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: deleteUser(id),
        });
    });
  });
});
