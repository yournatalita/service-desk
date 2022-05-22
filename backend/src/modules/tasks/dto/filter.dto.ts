import { IsIn, IsOptional, IsNumber } from 'class-validator';
import { CreateTaskInput } from '../../../graphql.schema';

export class FilterDto extends CreateTaskInput {
  @IsOptional()
  @IsIn(['onUpdated', 'title', 'onCreated', "id"], { message: 'Wrong sort parameter' })
  sortName?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'], { message: 'Wrong sort direction' })
  sortDirection?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Prop take should be integer' })
  take?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Prop skip should be integer' })
  skip?: number;
}
