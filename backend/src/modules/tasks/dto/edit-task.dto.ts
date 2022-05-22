import { MinLength, IsNumber } from 'class-validator';
import { EditTaskInput } from '../../../graphql.schema';

export class EditTaskDto extends EditTaskInput {
  @IsNumber()
  id: number;
  @MinLength(1, { message: 'Min 1 character' })
  title: string;
  @MinLength(1, { message: 'Min 1 character' })
  description: string;
}
