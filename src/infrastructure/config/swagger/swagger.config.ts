import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions, SwaggerCustomOptions } from '@nestjs/swagger';

export const options: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey, methodKey) => methodKey
};



export const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
  
  },
  customSiteTitle: "My API docs"
}


// export const swaggerConfig:  = {
//   const config = new DocumentBuilder()
//   .setTitle('Cats example')
//   .setDescription('The cats API description')
//   .setVersion('1.0')
//   .addTag('cats')
//   .build();
// const document = SwaggerModule.createDocument(app, config);

// SwaggerModule.setup('api', app, document);
// }