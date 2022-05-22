import { MinLength } from 'class-validator';
import { CreateTaskInput } from '../../../graphql.schema';

export class CreateTaskDto extends CreateTaskInput {
  @MinLength(1, { message: 'Min 1 character' })
  title: string;
  @MinLength(1, { message: 'Min 1 character' })
  description: string;
}
