import { MinLength, IsNumber, IsIn, IsOptional } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';
import { TaskEnums, StatusType } from '../tasks.enums';

@InputType()
export class EditTaskDto {
  @Field(type => ID)
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @MinLength(1, { message: 'Min 1 character' })
  title: string;

  @Field({ nullable: true })
  @MinLength(1, { message: 'Min 1 character' })
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(TaskEnums.STATUS_ARRAY, { message: 'Wrong Status Key' })
  status?: StatusType;
}
