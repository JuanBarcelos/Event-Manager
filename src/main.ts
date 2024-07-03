import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Event-Manager')
    .setDescription(
      `
      Event Manager is a platform for managing and participating in cultural events 
      such as concerts, art exhibitions, workshops, and other types of cultural events. 
      Organizers can create and manage events, while organizers can create and manage events. 
      Attendees can register and rate events.
    `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
