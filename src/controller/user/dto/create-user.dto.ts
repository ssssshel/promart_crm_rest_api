import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  last_name: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  middle_name?: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 255)
  email: string;

  // @IsString()
  // @IsNotEmpty()
  // @Length(8, 255)
  // password_hash?: string;

  @IsInt()
  @IsNotEmpty()
  role_id: number;
}