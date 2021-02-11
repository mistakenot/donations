import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/graphql (POST) can execute a simple query', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set("Content-Type", "application/json")
      .send({"operationName":null,"variables":{},"query":"{\n  donor(donorId: 1) {\n    donorName\n  }\n}\n"})
      .expect(200)
      .expect('{"data":{"donor":{"donorName":"Agents Training Trust"}}}\n');
  });
});
