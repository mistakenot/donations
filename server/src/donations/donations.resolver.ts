import {Args, Int, Query, Resolver} from "@nestjs/graphql";
import {Donation} from "./models/donation";
import {InjectSqlClient, SqlClient} from "@shared";
import {NotFoundException} from "@nestjs/common";

@Resolver(of => Donation)
export class DonationsResolver {
  constructor(@InjectSqlClient() private readonly sqlClient: SqlClient) {}

  @Query(returns => Donation)
  async donation(@Args('id', { type: () => Int }) id: number) {
    const result = await this.sqlClient.getSingleRow<Donation>(
      "select * from donation where id = $id", Donation, { $id: id });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }
}
