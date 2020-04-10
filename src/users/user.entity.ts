import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OrganizationEntity } from '../organizations/organization.entity';
import { UserResponseDto } from './dto/userResponse.dto';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'jsonb' })
  roles: string[];

  @ManyToOne(type => OrganizationEntity, organization => organization.users, {
    eager: true
  })
  organization: OrganizationEntity;

  toDto(orphanOrganization = false): UserResponseDto {
    const response = new UserResponseDto();

    response.id = this.id;
    response.name = this.name;
    response.login = this.login;
    if (response.organization || !orphanOrganization) {
      response.organization = this.organization.toDto(true);
    }

    return response;
  }
}
