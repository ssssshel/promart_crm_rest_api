import { IsString, IsEmail, IsOptional, IsInt, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(1, 255)
  first_name?: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  last_name?: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  middle_name?: string;

  @IsEmail()
  @IsOptional()
  @Length(1, 255)
  email?: string;

  // @IsString()
  // @IsOptional()
  // @Length(8, 255)
  // password_hash?: string;

  @IsInt()
  @IsOptional()
  role_id?: number;
}
