import { IsInt, IsNotEmpty } from 'class-validator';

export class ChangeUserStatusDto {
  @IsInt()
  @IsNotEmpty()
  status_id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
