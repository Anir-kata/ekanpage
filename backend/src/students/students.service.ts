import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './student.entity';

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

  async findAll(): Promise<StudentEntity[]> {
    return this.studentsRepository.find({
      order: { createdAt: 'DESC' },
    });
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
