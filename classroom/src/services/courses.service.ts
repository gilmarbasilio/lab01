import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { Course } from '../http/graphql/models/course';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }
}
