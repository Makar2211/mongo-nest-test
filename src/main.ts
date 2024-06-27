import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
		.setTitle('API')
		.setDescription('API NEST MONGODB')
		.setVersion('1.0')
		.addTag('API')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.listen(8000);
}
bootstrap();
