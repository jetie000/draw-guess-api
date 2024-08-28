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

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number',
    }
  )
  password: string;
}
