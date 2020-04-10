import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { CreateUserWithOrgIdDto } from './dto/createUserWithOrgId.dto'
import { CreateUserWithOrgNameDto } from './dto/createUserWithOrgName.dto'
import { OrganizationEntity } from '../organizations/organization.entity';

const selectFields = [
  'id' as keyof UserEntity,
  'name' as keyof UserEntity,
  'login' as keyof UserEntity,
  'organization' as keyof UserEntity,
];

const fieldsWithRoles = selectFields.concat('roles' as keyof UserEntity);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectRepository(OrganizationEntity)
    private organizationRepository: Repository<OrganizationEntity>,
  ) {}

  async createWithOrgId(userDto: CreateUserWithOrgIdDto): Promise<UserEntity> {
    const organization = await this.organizationRepository.findOne(userDto.orgId);

    if (!organization) {
      throw new BadRequestException('You must provide valid organization id');
    }

    const user = this.usersRepository.create({
      name: userDto.name,
      login: userDto.name,
      passwordHash: userDto.password + 'blabla', // TODO: hash password
      organization: organization,
      roles: userDto.roles,
    });

    return this.usersRepository.save(user);
  }

  async createWithOrgName(userDto: CreateUserWithOrgNameDto): Promise<UserEntity> {
    const existingOrganization = await this.organizationRepository.findOne({ name: userDto.orgName });
    let finalOrganization: OrganizationEntity;
    if (existingOrganization) {
      finalOrganization = existingOrganization;
    } else {
      finalOrganization = await this.organizationRepository.save({ name: userDto.orgName })
    }

    if (!finalOrganization) {
      throw new InternalServerErrorException('something went wrong');
    }

    const user = this.usersRepository.create({
      name: userDto.name,
      login: userDto.name,
      passwordHash: userDto.password + 'blabla', // TODO: hash password
      organization: finalOrganization,
      roles: userDto.roles,
    });

    return this.usersRepository.save(user);
  }

  async deleteById(id: number): Promise<boolean> {
    const deleteResult = await this.usersRepository.delete({ id });

    if (deleteResult.affected === 0) {
      throw new NotFoundException('No such user');
    }

    return;
  }

  findAll({ withRoles = true }): Promise<UserEntity[]> {
    return this.usersRepository.find({
      select: withRoles ? selectFields : fieldsWithRoles,
      relations: [ 'organization' ],
    });
  }

  findById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne({
      select: fieldsWithRoles,
      relations: [ 'organization' ],
      where: {
        id
      }
    });
  }
}
