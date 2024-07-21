import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase())
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 0,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
  })
  readonly password: string;
}
