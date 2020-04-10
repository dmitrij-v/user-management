import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { OrganizationResponseDto } from './dto/organizationResponse.dto';

@Entity()
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => UserEntity, user => user.organization)
  users: UserEntity[];

  toDto(orphanUsers = false): OrganizationResponseDto {
    const response = new OrganizationResponseDto();
    response.id = this.id;
    response.name = this.name;

    if (!orphanUsers) {
      response.users = this.users.map(u => u.toDto(true));
    }

    return response;
  }
}
