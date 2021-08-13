import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty({ message: 'Invalid E-mail' })
  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Field({ nullable: true })
  password?: string;
}
