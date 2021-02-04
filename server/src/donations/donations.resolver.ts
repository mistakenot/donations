import {Args, Int, Query, Resolver} from "@nestjs/graphql";
import {Donation} from "./models/donation";
import {InjectSqlClient, SqlClient} from "@shared";
import {NotFoundException} from "@nestjs/common";

@Resolver(of => Donation)
export class DonationsResolver {
  constructor(@InjectSqlClient() private readonly sqlClient: SqlClient) {}

  @Query(returns => Donation)
  async donation(@Args('id', { type: () => String }) id: string): Promise<Donation> {
    const result = await this.sqlClient.getSingleRow(
      "select * from donation where ecRef = $id", Donation, { $id: id });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }
}
