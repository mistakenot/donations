import {Injectable, Type} from "@nestjs/common";
import {Database} from "sqlite3";
import {SqlClient} from "@shared";
import {validateSync} from "class-validator";
import {plainToClass} from "class-transformer"

@Injectable()
export class SqliteService implements SqlClient {
  private db: Database;

  async connect(filepath: string) {
    this.db = new Database(filepath);
  }

  async getSingleRow<T>(sql: string, resultType: Type<T>, parameters = {}): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, parameters, (error, row: unknown) => {
        if (error) {
          return reject(error);
        }

        if (!row) {
          return resolve(undefined);
        }

        const resultClass: T = plainToClass(resultType, row);
        validateSync(resultClass as Object);
        resolve(resultClass);
      })
    })
  }
}
