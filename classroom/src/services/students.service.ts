import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  listAllStudents(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }

  getStudentByAuthUserId(authUserId: string): Promise<Student> {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }
}
