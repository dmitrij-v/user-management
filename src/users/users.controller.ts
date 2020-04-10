import {
  Controller, Body, Param,
  Get, Post, Delete,
  HttpCode, BadRequestException, NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserWithOrgIdDto } from './dto/createUserWithOrgId.dto'
import { CreateUserWithOrgNameDto } from './dto/createUserWithOrgName.dto'
import { UserResponseDto } from './dto/userResponse.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/by-org-id')
  async createWithOrgId(@Body() createUserDto: CreateUserWithOrgIdDto): Promise<UserResponseDto> {
    const createdUser = await this.usersService.createWithOrgId(createUserDto);

    return createdUser.toDto();
  }

  @Post('/by-org-name')
  async createWithOrgName(@Body() createUserDto: CreateUserWithOrgNameDto): Promise<UserResponseDto> {
    const createdUser = await this.usersService.createWithOrgName(createUserDto);

    return createdUser.toDto();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserResponseDto> {
    if (!id) {
      throw new BadRequestException('Specify id!');
    }
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id=${id} does not exist`);
    }

    return user.toDto();
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteOne(@Param('id') id: number): Promise<boolean> {
    return this.usersService.deleteById(id);
  }

  @Get('/list')
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll({ withRoles: false });

    return users.map(u => u.toDto());
  }


}
