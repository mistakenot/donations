import {Field, Int, ObjectType} from "@nestjs/graphql";
import {IsInt, IsOptional, IsString} from "class-validator";
import {Donation} from "./donation";

@ObjectType()
export class Donor {
  @IsInt()
  @Field(type => Int)
  readonly donorId: number;

  @IsString()
  @Field(type => String)
  readonly donorName: string;

  @IsString()
  @Field(type => String)
  readonly donorStatus: string;

  @IsString()
  @IsOptional()
  @Field(type => String)
  readonly companyRegistrationNumber?: number;

  @IsString()
  @Field(type => String)
  readonly postcode: string;

  @Field(type => [Donation])
  readonly donations: Donation[];
}
