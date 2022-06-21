import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwaggerConfig = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Cave backend api')
    .setDescription('Document for cave apis.')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};
