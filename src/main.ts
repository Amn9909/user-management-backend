import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from "@nestjs/swagger"
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule,  { cors: true});
  app.setGlobalPrefix("user_mngmnt");

  const config = new DocumentBuilder()
  .setTitle('HORECA1 Rest API')
  .setDescription('Horeca1 backend services ' )
  .addBearerAuth()
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('user_mngmnt/api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.APP_PORT || 3002);
}
bootstrap();
