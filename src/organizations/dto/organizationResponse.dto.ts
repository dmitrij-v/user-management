import { UserResponseDto } from '../../users/dto/userResponse.dto';

export class OrganizationResponseDto {
  id: number;
  name: string;
  users: UserResponseDto[]|null;
}
