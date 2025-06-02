import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (!users.length)
      throw new HttpException('users.not.found', HttpStatus.NOT_FOUND);

    return users;
  }

  async findByUserId(id: number): Promise<User> {
    const getUser = await this.userRepository.findOne({
      where: { id },
      relations: ['components'],
    });

    if (!getUser) {
      throw new HttpException('user.not.found', HttpStatus.CONFLICT);
    }

    return getUser;
  }

  async createUser(userDTO: CreateUserDTO): Promise<CreateUserDTO> {
    // const getUser = await this.findAllUsers();
    // const userAlreadyExists = getUser.find(
    //   (item) => item.email === userDTO.email,
    // );

    // if (userAlreadyExists) {
    //   throw new HttpException('email.in.use', HttpStatus.CONFLICT);
    // }

    const hashPassword = bcrypt.hashSync(userDTO.password, 10);
    userDTO.password = hashPassword;

    return await this.userRepository.save(userDTO);
  }

  async authUser(data: { email: string; password: string }): Promise<any> {
    const { email, password } = data;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException('invalid.credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('invalid.credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.id, email: user.email };

    const token = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }

  async updateUser(id: number, userDTO: Partial<CreateUserDTO>): Promise<User> {
    const user = await this.findByUserId(id);

    if (!user) {
      throw new HttpException('invalid.credentials', HttpStatus.UNAUTHORIZED);
    }

    if (userDTO.password) {
      userDTO.password = bcrypt.hashSync(userDTO.password, 10);
    }

    await this.userRepository.update(id, userDTO);

    return this.findByUserId(id);
  }

  async delete(id: number): Promise<void> {
    const getUser = await this.findByUserId(id);
    await this.userRepository.delete(getUser.id);
  }

  async FindByName(name: string): Promise<User> {
    const getUser = await this.userRepository.findOne({
      where: { name: ILike(`${name}`) },
    });


    if (!getUser) {
      throw new HttpException('user.not.found', HttpStatus.NOT_FOUND);
    }

    return getUser;
  }
}
