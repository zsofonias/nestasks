import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindOneParamsDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}
