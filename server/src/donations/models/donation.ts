import {Field, ObjectType, Int} from "@nestjs/graphql";
import {IsNumber} from "class-validator";

@ObjectType()
export class Donation {
  @IsNumber()
  @Field(type => String)
  readonly ecRef: string;

  @Field(type => String)
  value; string;

  @Field(type => String)
  acceptedDate: string;

  @Field(type => String)
  accountingUnitName: string;

  @Field(type => String)
  accountingUnitAsCentralParty: string;

  @Field(type => Boolean)
  isSponsorship: boolean;

  @Field(type => String)
  donationType: string;
  @Field(type => String)
  natureOfDonation: string;
  @Field(type => String)
  purposeOfVisit: string;
  @Field(type => String)
  donationAction: string;
  @Field(type => String)
  receivedDate: number;
  @Field(type => String)
  reportedDate: number;
  @Field(type => String)
  isReportedPrePoll: number;
  @Field(type => String)
  reportingPeriodName: number;
  @Field(type => String)
  isBequest: boolean;
  @Field(type => String)
  isAggregation: boolean;
  @Field(type => String)
  regulatedEntityId: number;
  @Field(type => String)
  accountingUnitId: string;
  @Field(type => String)
  donorId: number;
  @Field(type => String)
  campaignName: string;
  @Field(type => String)
  registerName: string;
  @Field(type => String)
  isIrishSource: boolean;
}
