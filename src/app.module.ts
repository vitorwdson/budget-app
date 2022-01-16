import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,

    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ res }) => res,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
