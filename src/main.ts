import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
      skipMissingProperties: true,
    }),
  );

  const origin = '*';
  const corsOptions = {
    origin: origin,
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
    // credentials: origin !== '*',
    allowedHeaders:
      'Content-Type, Authorization, X-Requested-With, Accept, X-XSRF-TOKEN, secret, recaptchavalue',
  };
  app.use(cors(corsOptions));

  await app.listen(3007);
}
bootstrap();
