import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compare, hash } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UpdateRoleAuthDto } from './dto/update-role-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtAuthService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const findUser = await this.userModel.findOne({ email });
    if (!findUser) throw new HttpException('USER NOT FOUND', 404);

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { id: findUser._id, name: findUser.name };
    const token = this.jwtAuthService.sign(payload);

    return {
      user: findUser,
      token,
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const plainTextToHash = await hash(password, 10);
    registerAuthDto = { ...registerAuthDto, password: plainTextToHash };
    return this.userModel.create(registerAuthDto);
  }

  async updateRole(updateRolesAuthDto: UpdateRoleAuthDto) {
    const { roles, _id } = updateRolesAuthDto;

    return this.userModel.findByIdAndUpdate(
      _id,
      { roles: roles },
      { new: true },
    );
  }
}
