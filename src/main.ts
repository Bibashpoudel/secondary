import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { AppModule } from './app.module';

import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.set('trust proxy', 1); // trust first proxy
  // app.use(
  //   session({
  //     secret: process.env.SESSION_KEY,
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: { maxAge: 3600000 },
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const swaggerConfig = new DocumentBuilder()
    .setTitle(' market ')
    .setDescription(
      'This will be the sass product with multiple domain according to categories',
    )
    .setVersion('1.0')
    .addTag('Sass')

    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  const PORT = process.env.PORT || 5001;
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(PORT, () => {
    console.log(`server is running in port http://localhost:${PORT}`);
  });
}
bootstrap();
