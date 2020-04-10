import { OrganizationResponseDto } from '../../organizations/dto/organizationResponse.dto';

export class UserResponseDto {
  id: number;
  orgId: number;
  name: string;
  login: string;
  roles: string[] | null;
  organization: OrganizationResponseDto|null;
}
