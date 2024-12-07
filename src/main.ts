import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin API for managing restaurants and sensors')
    .setVersion('1.0')
    .addTag('admin')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  const isTest = process.env.NODE_ENV != 'Production';
  await app.listen(port).then(() => {
    if (isTest) {
      console.log(`server: http://localhost:${port}`);
      console.log(`swagger: http://localhost:${port}/api`);
    }
  });
}
bootstrap();
