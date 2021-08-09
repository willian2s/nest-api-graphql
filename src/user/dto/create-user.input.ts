import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  email: string;
}
