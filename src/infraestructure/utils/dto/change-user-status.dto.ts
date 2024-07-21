import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class ChangeUserStatusDto {
  @IsInt()
  @IsNotEmpty()
  status_id: number;

  @IsInt()
  @IsOptional()
  user_id: number;
}
