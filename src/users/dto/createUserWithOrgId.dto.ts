import { IsString, IsInt, IsArray } from 'class-validator';

export class CreateUserWithOrgIdDto {
  @IsInt()
  orgId: number;

  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsArray()
  roles: string[];
}
