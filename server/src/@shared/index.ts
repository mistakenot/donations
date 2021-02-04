import {Inject, Type} from "@nestjs/common";

/**
 * Base interface for implementing a SQL connection.
 */
export interface SqlClient {
  connect(connectionString: string): Promise<void>;
  getSingleRow<T>(sql: string, resultType: Type<T>, parameters: Object): Promise<T | undefined>;
}

const token = "SQL_CLIENT";

export const UseSqlClient = (type: Type<SqlClient>) => ({
  provide: token,
  useClass: type
})

export const InjectSqlClient = () => Inject(token);
