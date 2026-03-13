import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { ListStudentsQueryDto } from './dto/list-students-query.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './student.entity';

export type StudentsPage = {
  items: StudentEntity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentsRepository: Repository<StudentEntity>,
  ) {}

  async create(dto: CreateStudentDto): Promise<StudentEntity> {
    const student = this.studentsRepository.create({
      ...dto,
      nextSessionAt: dto.nextSessionAt ? new Date(dto.nextSessionAt) : null,
    });

    return this.studentsRepository.save(student);
  }

  async findAll(query: ListStudentsQueryDto): Promise<StudentsPage> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const search = query.search?.trim();

    const qb = this.studentsRepository
      .createQueryBuilder('student')
      .orderBy('student.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search) {
      qb.where(
        'LOWER(student.fullName) LIKE :search OR LOWER(student.level) LIKE :search OR LOWER(student.objective) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  }

  async findOne(id: string): Promise<StudentEntity> {
    const student = await this.studentsRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student ${id} not found`);
    }

    return student;
  }

  async update(id: string, dto: UpdateStudentDto): Promise<StudentEntity> {
    const student = await this.findOne(id);

    Object.assign(student, {
      ...dto,
      nextSessionAt:
        dto.nextSessionAt === undefined
          ? student.nextSessionAt
          : dto.nextSessionAt
            ? new Date(dto.nextSessionAt)
            : null,
    });

    return this.studentsRepository.save(student);
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentsRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Student ${id} not found`);
    }
  }
}
