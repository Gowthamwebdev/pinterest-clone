import {
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Body,
  Request,
  Delete,
} from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/posts/created')
  async getCreatedPosts(@Param('id') id: string) {
    return this.userService.getCreatedPosts(id);
  }

  @Get(':id/posts/saved')
  async getSavedPosts(@Param('id') id: string) {
    return this.userService.getSavedPosts(id);
  }

  @Delete('tags/:tagId')
  async deleteUserTag(@Param('tagId') tagId, @Request() req) {
    return this.userService.deleteUserTag(tagId, req.user.userId);
  }
  @Get('tags')
  async getUserTags(@Request() req) {
    return this.userService.getUserTags(req.user.userId);
  }
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.userService.updateUser(req.user.userId, updateUserDto);
  }
}
