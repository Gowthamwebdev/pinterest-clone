import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          first_name: true,
          last_name: true,
          profile_img: true,
          bio: true,
          created_pins: {
            where: { is_deleted: false },
            select: {
              id: true,
              title: true,
              description: true,
              pin_tags: {
                select: {
                  tag: {
                    select: {
                      id: true,
                      name: true,
                      slug: true,
                    },
                  },
                },
              },
              user_id: true,
            },
          },
          saved_pins: {
            select: {
              pin: {
                select: {
                  id: true,
                  title: true,
                  image_url: true,
                  pin_tags: {
                    select: {
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
              },
            },
          },
        },
      });

      if (!user) {
        throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new HttpException(
        error?.message || 'Unexpected error occurred',
        error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCreatedPosts(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          created_pins: {
            where: { is_deleted: false },
            select: {
              id: true,
              title: true,
              description: true,
              image_url: true,
              pin_tags: {
                select: {
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
          },
        },
      });

      if (!user) {
        throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
      }

      return user.created_pins;
    } catch (error) {
      throw new HttpException(
        error?.message || 'Unexpected error occurred',
        error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSavedPosts(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          saved_pins: {
            select: {
              pin: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  image_url: true,
                  pin_tags: {
                    select: {
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
              },
            },
          },
        },
      });

      if (!user) {
        throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
      }

      return user.saved_pins.map((saved) => saved.pin);
    } catch (error) {
      throw new HttpException(
        error?.message || 'Unexpected error occurred',
        error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(userId: string, updateData: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
      }

      if (updateData.name && updateData.name !== user.name) {
        const existingUser = await this.prisma.user.findUnique({
          where: { name: updateData.name },
        });

        if (existingUser && existingUser.id !== userId) {
          throw new HttpException(
            'Username already taken',
            HttpStatus.FORBIDDEN,
          );
        }
      }
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          name: updateData.name,
          first_name: updateData.first_name,
          last_name: updateData.last_name,
          bio: updateData.bio,
          dob: updateData.dob,
          language: updateData.language,
          region: updateData.region,
          updated_at: new Date(),
        },
      });
      return 'Data updated successfully';
    } catch (error) {
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserTags(userId: string) {
    try {
      const userTags = await this.prisma.user_tags.findMany({
        where: {
          user_id: userId,
        },
        include: {
          tag: {
            select: {
              id: true,
              name: true,
              pin_tags: {
                select: {
                  pin: {
                    select: {
                      image_url: true,
                    },
                  },
                },
                take: 1,
                orderBy: {
                  pin: {
                    created_at: 'desc',
                  },
                },
              },
            },
          },
        },
      });
      if (!userTags) {
        throw new HttpException('no tags found', HttpStatus.NOT_FOUND);
      }
      return userTags;
    } catch (error) {
      throw new HttpException(
        error.message || 'Unexpected error occurred',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUserTag(tagId: string, userId: string) {
    try {
      const userTag = await this.prisma.user_tags.findUnique({
        where: {
          user_id_tag_id: {
            tag_id: tagId,
            user_id: userId,
          },
        },
      });

      if (!userTag) {
        throw new HttpException(
          'Tag not found or does not belong to user',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.user_tags.delete({
        where: {
          user_id_tag_id: {
            tag_id: tagId,
            user_id: userId,
          },
        },
      });
      return 'Tag removed successfully';
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete tag',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
