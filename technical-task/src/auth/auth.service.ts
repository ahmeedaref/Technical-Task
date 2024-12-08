import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users';
import { UserDocument } from 'src/schemas/users-schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dataDto: CreateUserDto) {
    try {
      const { email } = dataDto;
      const user = await this.UserModel.findOne({ email });
      if (user) {
        throw new BadRequestException('Email is exists');
      }
      const passwordHash = await bcrypt.hash(dataDto.password, 10);
      dataDto.password = passwordHash;
      const User = new this.UserModel(dataDto);
      return await User.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async findUser(data: CreateUserDto) {
    const { email } = data;
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('email not found');
    }
    return user;
  }

  async login(data: CreateUserDto) {
    const { email } = data;
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('email not found');
    }
    const passworedCompare = await bcrypt.compare(data.password, user.password);
    if (!passworedCompare) {
      throw new BadRequestException('wrong password');
    }
    const paylod = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const accesstoken = this.jwtService.sign(paylod, {
      secret: this.configService.get<string>('ACCESSTOKEN'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
    });
    return { message: 'Logged successfully', accesstoken };
  }
}
