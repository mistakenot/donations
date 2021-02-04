import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from "@nestjs/graphql";
import {join} from 'path';
import { DonationsModule } from './donations/donations.module';
import { SqliteModule } from './sqlite/sqlite.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    DonationsModule,
    SqliteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
