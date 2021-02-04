import {Global, Module, OnApplicationBootstrap} from '@nestjs/common';
import {SqliteService} from "./sqlite.service";
import {InjectSqlClient, SqlClient, UseSqlClient} from "@shared";

const provideSqlClient = UseSqlClient(SqliteService);

@Global()
@Module({
  providers: [provideSqlClient],
  exports: [provideSqlClient]
})
export class SqliteModule implements OnApplicationBootstrap {
  constructor(@InjectSqlClient() private readonly sqliteService: SqlClient) {}

  async onApplicationBootstrap() {
    await this.sqliteService.connect("db/database.sqlite")
  }
}
