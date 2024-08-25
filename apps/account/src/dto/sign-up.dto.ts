import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minSymbols: 0,
  })
  password: string;
}
