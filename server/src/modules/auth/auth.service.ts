import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const isValid = await bcrypt.compare(pass, user.password);
      if (!isValid)
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        error.HttpStatus || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(userData: LoginDto) {
    try {
      const user = await this.validateUser(userData.email, userData.password);
      if (!user) {
        throw new HttpException('user not found', HttpStatus.NO_CONTENT);
      }
      const payload = {
        sub: user.id,
        userId: user.id,
      };
      console.log(payload);
      return {
        message: 'user logged in successfully',
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        error.HttpStatus || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserProfile(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          profile_img: true,
        },
      });

      if (!user) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        error.HttpStatus || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signUp(userData: SignupDto) {
    try {
      console.log(userData.email, userData.dateOfBirth, userData.password);
      const existingUser = await this.prisma.user.findUnique({
        where: { email: userData.email },
      });
      // console.log(existingUser);

      if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const username = userData.email.split('@')[0];
      const isoDate = new Date(userData.dateOfBirth).toISOString();
      await this.prisma.user.create({
        data: {
          name: username.toLowerCase().replace(/[^a-z0-9]/g, ''),
          email: userData.email,
          password: hashedPassword,
          dob: isoDate,
        },
      });
      return {
        message: 'User created successfully',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        error.HttpStatus || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token);

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await this.prisma.user.update({
        where: { email: payload.email },
        data: { password: hashedPassword },
      });
      console.log('reset password functioned successfully');
      return {
        message: 'Password changes successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
