import { IsDefined, IsOptional, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsDefined()
  codigo: number;

  @IsDefined()
  email: string;

  @IsDefined()
  @IsString()
  senha: string;
}
