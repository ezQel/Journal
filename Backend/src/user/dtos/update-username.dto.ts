import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUsernameDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;
}
