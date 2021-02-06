import {Field, ObjectType, Int, Float} from "@nestjs/graphql";
import {IsBoolean, IsDate, IsDateString, IsIn, IsInt, IsNumber, IsString} from "class-validator";
import {Donor} from "./donor";
import {Donatee} from "./donatee";

@ObjectType()
export class Donation {
  @IsString()
  @Field(type => String)
  readonly ecRef: string;

  @IsNumber()
  @Field(type => Float)
  readonly value; number;

  @IsDateString()
  @Field(type => String)
  readonly acceptedDate: string;

  @IsString()
  @Field(type => String)
  readonly accountingUnitName: string;

  @IsString()
  @Field(type => String)
  readonly accountingUnitAsCentralParty: string;

  @IsBoolean()
  @Field(type => Boolean)
  readonly isSponsorship: boolean;

  @IsString()
  @Field(type => String)
  readonly donationType: string;

  @IsString()
  @Field(type => String)
  readonly natureOfDonation: string;

  @IsString()
  @Field(type => String)
  readonly purposeOfVisit: string;

  @IsString()
  @Field(type => String)
  readonly donationAction: string;

  @IsDateString()
  @Field(type => String, { nullable: true })
  readonly receivedDate: string | null;

  @IsDateString()
  @Field(type => String, { nullable: true })
  readonly reportedDate: string | null;

  @IsBoolean()
  @Field(type => Boolean)
  readonly isReportedPrePoll: boolean;

  @IsString()
  @Field(type => String)
  readonly reportingPeriodName: string;

  @IsBoolean()
  @Field(type => Boolean)
  readonly isBequest: boolean;

  @IsBoolean()
  @Field(type => Boolean)
  readonly isAggregation: boolean;

  @IsInt()
  @Field(type => Int)
  readonly regulatedEntityId: number;

  @IsString()
  @Field(type => String)
  readonly accountingUnitId: string;

  @IsInt()
  @Field(type => Int)
  readonly donorId: number;

  @IsString()
  @Field(type => String)
  readonly campaignName: string;

  @IsString()
  @Field(type => String)
  readonly registerName: string;

  @IsBoolean()
  @Field(type => Boolean)
  readonly isIrishSource: boolean;

  @Field(type => Donor)
  readonly donor: Donor;

  @Field(type => Donatee)
  readonly donatee: Donatee;
}
