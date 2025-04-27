import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class UpdateUserAdminDto extends UpdateUserDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  role: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  access: string;

  @IsOptional()
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
