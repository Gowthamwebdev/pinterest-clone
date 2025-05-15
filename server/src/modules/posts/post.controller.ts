import {
  Controller,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(
    @Request() req,
    @UploadedFile() image: Express.Multer.File,
    @Body() createPinDto: CreatePostDto,
  ) {
    return this.postService.createPost(req.user.userId, createPinDto, image);
  }

  @Get()
  async getAllPosts(@Request() req) {
    return await this.postService.getAllPosts(req.user.userId);
  }

  @Get('search')
  async searchPinsByTag(@Query() queryDto: SearchQueryDto) {
    console.log(queryDto.query);
    return this.postService.searchPinsByTag(queryDto.query);
  }

  @Get('explore')
  async getExplorePosts() {
    return await this.postService.getExplorePosts();
  }

  @Get(':postId')
  async getPostById(@Param('postId') postId: string) {
    return await this.postService.getPostById(postId);
  }

  @Put(':postId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editPostById(
    @Request() req,
    @Param('postId') postId: string,
    @Body() updateData: UpdatePostDto,
  ) {
    return await this.postService.editPostById({
      userId: req.user.userId,
      postId,
      updateData,
    });
  }

  @Delete(':postId')
  async deletePostById(@Request() req, @Param('postId') postId: string) {
    return await this.postService.deletePostById({
      userId: req.user.userId,
      postId,
    });
  }

  @Post(':postId/restore')
  async restorePostById(@Request() req, @Param('postId') postId: string) {
    return await this.postService.restorePostById({
      userId: req.user.userId,
      postId,
    });
  }

  @Post(':postId/save')
  async savePostForUser(@Request() req, @Param('postId') postId: string) {
    return this.postService.toggleSavePost({
      userId: req.user.userId,
      postId,
    });
  }

  @Get(':postId/is-saved')
  async isPostSaved(@Request() req, @Param('postId') postId: string) {
    return this.postService.checkIfPostSaved({
      userId: req.user.userId,
      postId,
    });
  }
}
