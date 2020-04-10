import { IsString, IsInt, IsArray } from 'class-validator';

export class CreateUserWithOrgNameDto {
  @IsString()
  orgName: string;

  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsArray()
  roles: string[];
}
