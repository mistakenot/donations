import {Global, Module, OnApplicationBootstrap} from '@nestjs/common';
import {SqliteService} from "./sqlite.service";
import {InjectSqlClient, SqlClient, UseSqlClient, Repository} from "@shared";

const provideSqlClient = UseSqlClient(SqliteService);

@Global()
@Module({
  providers: [provideSqlClient, Repository],
  exports: [provideSqlClient, Repository]
})
export class SqliteModule implements OnApplicationBootstrap {
  constructor(@InjectSqlClient() private readonly sqliteService: SqlClient) {}

  async onApplicationBootstrap() {
    await this.sqliteService.connect("db/database.sqlite")
  }
}
