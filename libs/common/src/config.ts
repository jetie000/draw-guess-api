import { IsString } from 'class-validator';

export class Config {
  @IsString()
  public readonly DATABASE_URL: string;

  @IsString()
  public readonly JWT_SECRET: string;

  @IsString()
  public readonly JWT_REFRESH_SECRET: string;

  @IsString()
  public readonly POSTGRES_PASSWORD: string;

  @IsString()
  public readonly POSTGRES_DB: string;
}
