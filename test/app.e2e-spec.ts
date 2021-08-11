import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  mockAddAccountParams,
  mockUserModel,
} from '../src/common/Test/TestUtil';

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

  describe('createUser', () => {
    const createUserObject = JSON.stringify(mockAddAccountParams).replace(
      /\"([^(\")"]+)\":/g,
      '$1:',
    );

    const createUserMutation = `
    mutation {
      createUser(data: ${createUserObject}) {
        id
        name
        email
      }
    }`;

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
          expect(data.email).toBe(mockUserModel.email);
          expect(data.name).toBe(mockUserModel.name);
        })
        .expect(200);
    });
  });
});
