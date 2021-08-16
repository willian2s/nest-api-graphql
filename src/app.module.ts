import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PSW || 'postgres',
      database: process.env.DB_NAME || 'nest-api',
      entities: [User],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile:
        process.env.NODE_ENV !== 'production'
          ? 'src/schemas/schema.gql'
          : 'dist/schemas/schema.gql',
      context: ({ req }) => ({ req }),
      playground: true,
      cors: {
        origin: '*',
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
