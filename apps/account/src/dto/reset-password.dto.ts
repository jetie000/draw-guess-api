import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsUppercase,
  Length,
} from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  @IsUppercase()
  code: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;
}
