import { IsUUID } from 'class-validator';

export class UuidDto {
  @IsUUID('all')
  id: string;
}
