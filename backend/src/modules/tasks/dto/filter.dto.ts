import { IsIn, IsOptional, IsNumber } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['onUpdated', 'title', 'onCreated', 'id'], { message: 'Wrong sort parameter' })
  sortName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['ASC', 'DESC'], { message: 'Wrong sort direction' })
  sortDirection?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Prop take should be integer' })
  take?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Prop skip should be integer' })
  skip?: number;
}
