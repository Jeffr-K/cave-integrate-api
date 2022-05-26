import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { setupSwaggerConfig } from './infrastructure/config/swagger/swagger.config';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  setupSwaggerConfig(app);
  await app.listen(process.env.SERVER_PORT, () => {
    console.log(`      
    ┌────────────────────────────────────────────────────────────────┐
      🌸 Name: Cave                                                        
      🌸 Port: ${process.env.SERVER_PORT}
      🌸 Address: http://localhost:${process.env.SERVER_PORT}/         
      🌸 Environment: ${process.env.NODE_ENV}                          
      🌸 Message: ${process.env.SERVER_BOOT_MESSAGE}..                 
    └────────────────────────────────────────────────────────────────┘
    `)
  });
}
bootstrap();
