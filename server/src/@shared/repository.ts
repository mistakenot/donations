import {Injectable, NotFoundException} from "@nestjs/common";
import {Donation} from "./donation";
import {InjectSqlClient, SqlClient} from "./sql";
import {Donor} from "./donor";
import {Donatee} from "./donatee";

@Injectable()
export class Repository {
  constructor(@InjectSqlClient()private readonly sqlClient: SqlClient) {}

  async getDonation($ecrRef: string): Promise<Donation> {
    const result = await this.sqlClient.getSingleRow(
      "select * from donation where ecRef = $ecrRef", Donation, {$ecrRef});

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async getDonor($donorId: number): Promise<Donor> {
    const result = await this.sqlClient.getSingleRow(
      "select * from donor where donorId = $donorId", Donor, {$donorId});

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async getDonatee($regulatedEntityId: number): Promise<Donatee> {
    const result = await this.sqlClient.getSingleRow(
      "select * from donatee where regulatedEntityId = $regulatedEntityId", Donatee, {$regulatedEntityId});

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async getDonationsByDonateeId($regulatedEntityId: string): Promise<Donation[]> {
    return await this.sqlClient.getAllRows(
      "select * from donation where regulatedEntityId = $regulatedEntityId",
      Donation,
      {$regulatedEntityId});
  }

  async getDonationsByDonorId($donorId: number): Promise<Donation[]> {
    return await this.sqlClient.getAllRows(
      "select * from donation where donorId = $donorId",
      Donation,
      {$donorId});
  }
}
