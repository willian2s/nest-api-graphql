import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  @Field()
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Invalid E-mail' })
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Field()
  password: string;
}
