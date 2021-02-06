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

  async listDonations(page: number, orderBy: string): Promise<Donation[]> {
    const orderByValue = (orderBy === "value" ? "value desc" : "ecRef");
    return await this.sqlClient.getAllRows(
      `select * from donation order by ${orderByValue} limit $limit offset $skip`, Donation,
      { $limit: 20, $skip: 20 * page });
  }

  async getDonor($donorId: number): Promise<Donor> {
    const result = await this.sqlClient.getSingleRow(
      "select * from donor where donorId = $donorId", Donor, {$donorId});

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async listDonors(args: Partial<ListDonorsArgs> = {}): Promise<Donor[]> {
    const {page, isCompany} = {page: 0, isCompany: false, ...args};
    return await this.sqlClient.getAllRows(
      `select * from donor ${isCompany ? "where companyRegistrationNumber != ''" : ""} order by donorId limit $limit offset $skip`,
      Donor, { $limit: 20, $skip: 20 * page });
  }

  async getDonatee($regulatedEntityId: number): Promise<Donatee> {
    const result = await this.sqlClient.getSingleRow(
      "select * from donatee where regulatedEntityId = $regulatedEntityId", Donatee, {$regulatedEntityId});

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async listDonatees(page = 0, regulatedDonateeType: string = ""): Promise<Donatee[]> {
    const where = (regulatedDonateeType === "atype" ? "atype" : "");

    return await this.sqlClient.getAllRows(
      `select * from donatee ${where} order by regulatedEntityId limit $limit offset $skip`, Donatee,
      { $limit: 20, $skip: 20 * page });
  }

  async getDonationsByDonateeId($regulatedEntityId: number): Promise<Donation[]> {
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

interface ListDonorsArgs {
  page: number;
  isCompany: boolean;
}
