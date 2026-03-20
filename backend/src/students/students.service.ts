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

export type PublicStudent = {
  id: string;
  displayName: string;
  level: string;
  objective: string;
  sessionsDone: number;
  nextSessionAt: Date | null;
  notes: string;
};

export type PublicStudentsPage = {
  items: PublicStudent[];
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
    const sessionWeekday = dto.sessionWeekday ?? 0;
    const sessionTime = dto.sessionTime ?? '10:00';

    const student = this.studentsRepository.create({
      ...dto,
      sessionWeekday,
      sessionTime,
      nextSessionAt: this.computeNextSessionDate(sessionWeekday, sessionTime),
    });

    return this.studentsRepository.save(student);
  }

  private syncPastSessions(student: StudentEntity, now: Date = new Date()): boolean {
    if (!student.nextSessionAt) {
      return false;
    }

    let hasChanges = false;
    const current = new Date(now);
    const maxIterations = 520;
    let iteration = 0;

    while (student.nextSessionAt && student.nextSessionAt <= current) {
      student.sessionsDone = (student.sessionsDone ?? 0) + 1;

      const nextSession = new Date(student.nextSessionAt);
      nextSession.setDate(nextSession.getDate() + 7);
      student.nextSessionAt = nextSession;

      hasChanges = true;
      iteration += 1;

      if (iteration >= maxIterations) {
        break;
      }
    }

    return hasChanges;
  }

  private computeNextSessionDate(
    weekday: number,
    time: string,
    now: Date = new Date(),
  ): Date {
    const [hours, minutes] = time.split(':').map((value) => Number(value));
    const current = new Date(now);
    const target = new Date(now);

    target.setHours(hours, minutes, 0, 0);

    let daysToAdd = weekday - current.getDay();
    if (daysToAdd < 0) {
      daysToAdd += 7;
    }

    if (daysToAdd === 0 && target <= current) {
      daysToAdd = 7;
    }

    target.setDate(current.getDate() + daysToAdd);
    return target;
  }

  private buildFindAllQuery(query: ListStudentsQueryDto) {
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

    return { qb, page, limit };
  }

  async findAll(query: ListStudentsQueryDto): Promise<StudentsPage> {
    const { qb, page, limit } = this.buildFindAllQuery(query);

    const [items, total] = await qb.getManyAndCount();

    const updatedItems = items.filter((item) => this.syncPastSessions(item));
    if (updatedItems.length > 0) {
      await Promise.all(
        updatedItems.map(async (item) => {
          await this.studentsRepository.save(item);
        }),
      );
    }

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  }

  async findAllPublic(query: ListStudentsQueryDto): Promise<PublicStudentsPage> {
    const { qb, page, limit } = this.buildFindAllQuery(query);
    const [items, total] = await qb.getManyAndCount();

    return {
      items: items.map((item) => ({
        id: item.id,
        displayName: `Eleve ${item.id.slice(0, 8)}`,
        level: item.level,
        objective: item.objective,
        sessionsDone: item.sessionsDone,
        nextSessionAt: item.nextSessionAt,
        notes: item.notes ?? '',
      })),
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

    if (this.syncPastSessions(student)) {
      await this.studentsRepository.save(student);
    }

    return student;
  }

  async update(id: string, dto: UpdateStudentDto): Promise<StudentEntity> {
    const student = await this.findOne(id);

    Object.assign(student, dto);
    const sessionWeekday = student.sessionWeekday ?? 0;
    const sessionTime = student.sessionTime ?? '10:00';
    student.nextSessionAt = this.computeNextSessionDate(
      sessionWeekday,
      sessionTime,
    );

    return this.studentsRepository.save(student);
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentsRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Student ${id} not found`);
    }
  }
}
