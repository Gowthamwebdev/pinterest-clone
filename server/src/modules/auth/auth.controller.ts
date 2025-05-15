import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Public } from 'src/shared/decorators/public.decorator';
import { MailerService } from 'src/modules/mailer/mailer.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailerService: MailerService,
  ) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.getUserProfile(req.user.userId);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.mailerService.sendPasswordResetEmail(email);
    return { message: 'A reset email has been sent to your mail address' };
  }

  @Public()
  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  async resetPassword(@Body() token, @Body('newPassword') newPassword: string) {
    const result = await this.authService.resetPassword(token, newPassword);
    if (!result) throw new BadRequestException('Invalid or expired token');
    return { message: 'Password successfully reset' };
  }
}
