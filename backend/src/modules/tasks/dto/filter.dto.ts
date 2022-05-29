import { IsIn, IsOptional, IsNumber } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { StatusType, TaskEnums } from '../tasks.enums';

@InputType()
export class FilterDto {
  @Field(type => String, { nullable: true })
  @IsOptional()
  @IsIn(['onUpdated', 'title', 'onCreated', 'id'], { message: 'Wrong sort parameter' })
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

  @Field(type => Int, { nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Prop skip should be integer' })
  projectId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(TaskEnums.STATUS_ARRAY, { message: 'Wrong Status Key' })
  status?: StatusType;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(Object.keys(TaskEnums.STATUS_STATES), { message: 'Wrong Status Key' })
  statusState?: StatusType;
}
