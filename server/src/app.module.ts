import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from "@nestjs/graphql";
import {join} from 'path';
import { DonationsModule } from './donations/donations.module';
import { SqliteModule } from './sqlite/sqlite.module';
import { DonateeModule } from './donatee/donatee.module';
import { DonorModule } from './donor/donor.module';
import {ServeStaticModule} from "@nestjs/serve-static";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'views')
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, 'schema.gql')
    }),
    DonationsModule,
    SqliteModule,
    DonateeModule,
    DonorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
