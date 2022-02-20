import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

let port = process.env.PORT;
if (port == null || port == '') {
  port = '8000';
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(parseInt(port));
}
bootstrap();
