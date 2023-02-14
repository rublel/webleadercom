import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as path from 'path';
import { INestApplication, Logger } from '@nestjs/common';
import * as fs from 'fs';
import helmet from 'helmet';
import * as ip from 'ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // generateSwaggerApi(
  //   app,
  //   'api/docs',
  //   'WLC CRM | API Docs',
  //   'CRM API',
  //   'CRM for WLC',
  //   '1.0.0',
  // );
  app.use(helmet());
  await app.listen(process.env.PORT || 3000);
  Logger.verbose(
    `Server running on http://${ip.address()}:${process.env.PORT || 3000}`,
    'Bootstrap',
  );
}

bootstrap();

// function generateSwaggerApi(
//   app: INestApplication,
//   route: string,
//   siteTitle: string,
//   title: string,
//   description: string,
//   version: string,
// ) {
//   const prdServer = 'https://webleadercomprd.herokuapp.com';

//   const appDocumentSwagger = new DocumentBuilder()
//     .setTitle(title)
//     .setDescription(description)
//     .setVersion(version)
//     .addServer(prdServer, 'Production Server')
//     .build();

//   const document = SwaggerModule.createDocument(app, appDocumentSwagger);
//   SwaggerModule.setup(route, app, document, {
//     customSiteTitle: siteTitle,
//   });
//   const fileName = path.resolve(process.cwd(), 'docs', 'swagger.json');
//   fs.writeFileSync(fileName, JSON.stringify(document));
// }
