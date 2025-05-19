import {
  Injectable,
  Inject,
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  createSlug,
  createTagArray,
  validateImage,
} from 'src/shared/utils/functions';
import {} from 'src/shared/utils/constants';
import { cloudinaryDto } from './dto/cloudinary.dto';
@Injectable()
export class PostService {
  constructor(
    @Inject('CLOUDINARY') private cloudinary: typeof Cloudinary,
    private prisma: PrismaService,
  ) {}

  async uploadToCloudinary(file: Express.Multer.File): Promise<cloudinaryDto> {
    return new Promise((resolve, reject) => {
      const stream = this.cloudinary.uploader.upload_stream(
        { folder: 'pins' },
        (error, result) => {
          if (error) {
            reject(new Error(error.message || 'Cloudinary upload error'));
          } else {
            resolve(result as cloudinaryDto);
          }
        },
      );
      stream.end(file.buffer);
    });
  }

  async createPost(
    userId: string,
    body: CreatePostDto,
    image: Express.Multer.File,
  ) {
    // Validate image input
    validateImage(image);

    if (!body?.title?.trim()) {
      throw new BadRequestException('Title is required');
    }

    const tagNames = body.tags ? createTagArray(body.tags) : [];
    console.log(tagNames);
    if (tagNames.length > 15) {
      throw new BadRequestException('Maximum 15 tags allowed');
    }
    return this.prisma.$transaction(async (prisma) => {
      try {
        const result = await this.uploadToCloudinary(image);

        await prisma.pin.create({
          data: {
            title: body.title,
            description: body.description || null,
            image_url: result.secure_url,
            user_id: userId,
            pin_tags: {
              create: tagNames.map((tagName) => ({
                tag: {
                  connectOrCreate: {
                    where: { name: tagName },
                    create: {
                      name: tagName,
                      slug: createSlug(tagName),
                      created_by: {
                        connect: { id: userId },
                      },
                    },
                  },
                },
              })),
            },
          },
          include: {
            pin_tags: {
              include: {
                tag: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                  },
                },
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                profile_img: true,
              },
            },
          },
        });

        return {
          statusCode: HttpStatus.CREATED,
          message: 'Post created successfully',
        };
      } catch (error) {
        throw new HttpException(
          error.message || 'Failed to create post',
          error.statusCode || HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  async getAllPosts(userId: string) {
    try {
      // 1. Get user's preferred tags
      const userWithTags = await this.prisma.user_tags.findMany({
        where: {
          user_id: userId,
        },
        select: {
          tag_id: true,
        },
      });
      const tagIds = userWithTags.map((ut) => ut.tag_id);
      const preferredPosts = await this.prisma.pin.findMany({
        where: {
          is_deleted: false,
          pin_tags: {
            some: {
              tag_id: { in: tagIds },
            },
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile_img: true,
            },
          },
          pin_tags: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      const remainingPosts = await this.prisma.pin.findMany({
        where: {
          is_deleted: false,
          NOT: {
            pin_tags: {
              some: {
                tag_id: { in: tagIds },
              },
            },
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile_img: true,
            },
          },
          pin_tags: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      return {
        message: 'Posts fetched successfully',
        preferredPosts,
        remainingPosts,
      };
    } catch (error) {
      console.error('Error fetching posts', error);
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPostById(postId: string) {
    try {
      const post = await this.prisma.pin.findUnique({
        where: {
          id: postId,
          is_deleted: false,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile_img: true,
            },
          },
          pin_tags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      });

      if (!post) {
        throw new HttpException('Pin not found', HttpStatus.NOT_FOUND);
      }

      const tagNames = post.pin_tags.map((pinTag) => pinTag.tag.name);
      const recommendations = await this.recommendPostsByTags(
        tagNames,
        post.id,
      );

      return {
        statusCode: 200,
        message: 'Post fetched successfully',

        currentPin: post,
        recommendedPins: recommendations,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getExplorePosts() {
    try {
      const tags = await this.prisma.tag.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
        },
        orderBy: {
          created_at: 'desc',
        },
        take: 5,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Tags fetched successfully',
        data: tags,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch tags',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editPostById({
    userId,
    postId,
    updateData,
  }: {
    userId: string;
    postId: string;
    updateData: UpdatePostDto;
  }) {
    try {
      const post = await this.prisma.pin.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new HttpException('Pin not found', HttpStatus.NOT_FOUND);
      }

      if (post.user_id !== userId) {
        throw new HttpException(
          'You are not authorized to edit this pin',
          HttpStatus.FORBIDDEN,
        );
      }

      if (!updateData.title && !updateData.description && !updateData.tags) {
        throw new HttpException(
          'At least one field must be updated',
          HttpStatus.NOT_FOUND,
        );
      }

      const tagNames = updateData.tags
        ? createTagArray(updateData.tags)
        : undefined;

      await this.prisma.pin.update({
        where: { id: postId },
        data: {
          title: updateData.title,
          description: updateData.description,
          updated_at: new Date(),
          ...(tagNames && {
            tags: {
              set: [],
              connectOrCreate: tagNames.map((tagName) => ({
                where: { name: tagName },
                create: {
                  name: tagName,
                  slug: createSlug(tagName),
                  created_by: {
                    connect: { id: userId },
                  },
                },
              })),
            },
          }),
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Post updated successfully',
      };
    } catch (error) {
      if (
        error instanceof HttpException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePostById({ postId, userId }: { postId: string; userId: string }) {
    try {
      const post = await this.prisma.pin.findUnique({
        where: { id: postId },
      });

      if (!post) throw new NotFoundException('Pin not found');

      if (post.user_id !== userId) {
        throw new HttpException(
          'You are not authorized to delete this post',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.prisma.pin.update({
        where: { id: postId },
        data: { is_deleted: true },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Post deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async restorePostById({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }) {
    try {
      const post = await this.prisma.pin.findFirst({
        where: {
          id: postId,
          is_deleted: true,
        },
      });

      if (!post) throw new NotFoundException('Deleted pin not found');

      if (post.user_id !== userId) {
        throw new HttpException(
          'You are not authorized to restore this pin',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.prisma.pin.update({
        where: { id: postId },
        data: { is_deleted: false },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Pin restored successfully',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async recommendPostsByTags(tags: string[], excludePost?: string) {
    try {
      if (!tags || tags.length === 0) return [];

      const recommendedPosts = await this.prisma.pin.findMany({
        where: {
          id: { not: excludePost },
          is_deleted: false,
          pin_tags: {
            some: {
              tag: {
                name: {
                  in: tags,
                },
              },
            },
          },
        },
        // take: 20,  optional
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile_img: true,
            },
          },
        },
      });

      return recommendedPosts;
    } catch (error) {
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchPinsByTag(tagQuery: string) {
    if (!tagQuery || !tagQuery.trim()) {
      throw new BadRequestException('Search query is required');
    }

    const searchTerm = tagQuery.toLowerCase().trim();
    console.log(searchTerm);
    try {
      const posts = await this.prisma.pin.findMany({
        where: {
          is_deleted: false,
          pin_tags: {
            some: {
              tag: {
                name: {
                  contains: searchTerm,
                },
              },
            },
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile_img: true,
            },
          },
          pin_tags: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Posts fetched successfully',
        data: posts,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Search failed',
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async toggleSavePost({ postId, userId }: { postId: string; userId: string }) {
    try {
      const alreadySaved = await this.prisma.saved_pin.findUnique({
        where: {
          user_id_pin_id: {
            user_id: userId,
            pin_id: postId,
          },
        },
      });

      if (alreadySaved) {
        await this.prisma.saved_pin.delete({
          where: {
            user_id_pin_id: {
              user_id: userId,
              pin_id: postId,
            },
          },
        });
        return {
          message: 'Post unsaved successfully',
          isSaved: false,
        };
      }

      const getPostAssociatedTags = await this.prisma.pin.findUnique({
        where: { id: postId },
        select: {
          pin_tags: {
            select: {
              tag_id: true,
            },
          },
        },
      });

      if (!getPostAssociatedTags) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.$transaction(async (prisma) => {
        // 1. Save the pin
        await prisma.saved_pin.create({
          data: {
            user_id: userId,
            pin_id: postId,
          },
        });

        await prisma.user_tags.createMany({
          data: getPostAssociatedTags.pin_tags.map(({ tag_id }) => ({
            user_id: userId,
            tag_id: tag_id,
          })),
          skipDuplicates: true,
        });

        return {
          message: 'Post saved successfully',
          isSaved: true,
        };
      });
    } catch (error) {
      if (
        error instanceof HttpException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to save post',
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkIfPostSaved({
    userId,
    postId,
  }: {
    postId: string;
    userId: string;
  }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          saved_pins: {
            where: { pin_id: postId },
            select: { pin_id: true },
          },
        },
      });

      if (!user) {
        throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
      }

      return user.saved_pins.length > 0;
    } catch (error) {
      throw new HttpException(
        error?.message || 'Unexpected error occurred',
        error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
