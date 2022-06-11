import { IsIn, IsOptional, IsNumber } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FilterUsersDto {
  @Field(type => String, { nullable: true })
  @IsOptional()
  @IsIn(['onUpdated', 'onCreated'], { message: 'Wrong sort parameter' })
  sortName?: string;

  @Field(type => String, { nullable: true })
  @IsOptional()
  @IsIn(['ASC', 'DESC'], { message: 'Wrong sort direction' })
  sortDirection?: string;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Prop take should be integer' })
  take?: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Prop skip should be integer' })
  skip?: number;
}
