import { IsDefined, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsDefined()
  email: string;

  @IsDefined()
  @IsString()
  senha: string;
}
