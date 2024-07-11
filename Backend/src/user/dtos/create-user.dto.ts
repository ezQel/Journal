import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
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
