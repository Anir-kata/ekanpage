import { NotFoundException } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentEntity } from './student.entity';

describe('StudentsService', () => {
  const repository = {
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  let service: StudentsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new StudentsService(repository as never);
  });

  it('create maps nextSessionAt to Date', async () => {
    const dto = {
      fullName: 'John',
      level: 'Terminale',
      objective: 'Goal',
      sessionsDone: 1,
      sessionWeekday: 0,
      sessionTime: '10:00',
      notes: 'Notes',
    };
    const created = { id: '1', ...dto } as unknown as StudentEntity;

    repository.create.mockReturnValue(created);
    repository.save.mockResolvedValue(created);

    await expect(service.create(dto)).resolves.toEqual(created);
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...dto,
        nextSessionAt: expect.any(Date),
      }),
    );
  });

  it('create computes nextSessionAt from schedule', async () => {
    const dto = {
      fullName: 'John',
      level: 'Terminale',
      objective: 'Goal',
      sessionsDone: 1,
      sessionWeekday: 1,
      sessionTime: '18:30',
      notes: 'Notes',
    };
    const created = { id: '1', ...dto } as unknown as StudentEntity;

    repository.create.mockReturnValue(created);
    repository.save.mockResolvedValue(created);

    await expect(service.create(dto)).resolves.toEqual(created);
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        sessionWeekday: 1,
        sessionTime: '18:30',
        nextSessionAt: expect.any(Date),
      }),
    );
  });

  it('findAll returns paginated list', async () => {
    const list = [{ id: '1' }] as StudentEntity[];
    const qb = {
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([list, 1]),
    };
    repository.createQueryBuilder.mockReturnValue(qb);

    await expect(service.findAll({})).resolves.toEqual({
      items: list,
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    });
    expect(qb.orderBy).toHaveBeenCalledWith('student.createdAt', 'DESC');
    expect(qb.skip).toHaveBeenCalledWith(0);
    expect(qb.take).toHaveBeenCalledWith(10);
    expect(qb.where).not.toHaveBeenCalled();
  });

  it('findAll applies search filter when provided', async () => {
    const qb = {
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    };
    repository.createQueryBuilder.mockReturnValue(qb);

    await service.findAll({ search: 'term', page: 2, limit: 5 });

    expect(qb.skip).toHaveBeenCalledWith(5);
    expect(qb.take).toHaveBeenCalledWith(5);
    expect(qb.where).toHaveBeenCalledWith(
      'LOWER(student.fullName) LIKE :search OR LOWER(student.level) LIKE :search OR LOWER(student.objective) LIKE :search',
      { search: '%term%' },
    );
  });

  it('findOne returns student when found', async () => {
    const one = { id: '1' } as StudentEntity;
    repository.findOne.mockResolvedValue(one);

    await expect(service.findOne('1')).resolves.toEqual(one);
  });

  it('findOne throws when missing', async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(service.findOne('404')).rejects.toThrow(NotFoundException);
  });

  it('update recalculates nextSessionAt when updating fields', async () => {
    const existing = {
      id: '1',
      sessionWeekday: 0,
      sessionTime: '10:00',
      nextSessionAt: new Date('2026-01-01T00:00:00.000Z'),
    } as StudentEntity;
    repository.findOne.mockResolvedValue(existing);
    repository.save.mockResolvedValue(existing);

    await expect(service.update('1', { notes: 'updated' })).resolves.toEqual(
      existing,
    );
    expect(existing.nextSessionAt).toBeInstanceOf(Date);
    expect(repository.save).toHaveBeenCalled();
  });

  it('update applies schedule changes', async () => {
    const existing = {
      id: '1',
      sessionWeekday: 1,
      sessionTime: '08:00',
      nextSessionAt: null,
    } as StudentEntity;
    repository.findOne.mockResolvedValue(existing);
    repository.save.mockResolvedValue(existing);

    await service.update('1', { sessionWeekday: 3, sessionTime: '09:15' });
    expect(existing.sessionWeekday).toBe(3);
    expect(existing.sessionTime).toBe('09:15');
    expect(existing.nextSessionAt).toBeInstanceOf(Date);
  });

  it('remove deletes existing student', async () => {
    repository.delete.mockResolvedValue({ affected: 1 });

    await expect(service.remove('1')).resolves.toBeUndefined();
  });

  it('remove throws when student missing', async () => {
    repository.delete.mockResolvedValue({ affected: 0 });

    await expect(service.remove('404')).rejects.toThrow(NotFoundException);
  });

  it('computeNextSessionDate rolls to next week when same day time has passed', () => {
    const now = new Date('2026-03-15T12:00:00'); // Sunday
    const result = (service as unknown as {
      computeNextSessionDate: (weekday: number, time: string, now: Date) => Date;
    }).computeNextSessionDate(0, '10:00', now);

    expect(result.getDay()).toBe(0);
    expect(result.getHours()).toBe(10);
    expect(result.getMinutes()).toBe(0);
    expect(result.getTime()).toBeGreaterThan(now.getTime());
  });

  it('computeNextSessionDate handles weekday already passed', () => {
    const now = new Date('2026-03-18T09:00:00'); // Wednesday
    const result = (service as unknown as {
      computeNextSessionDate: (weekday: number, time: string, now: Date) => Date;
    }).computeNextSessionDate(1, '10:30', now); // Monday

    expect(result.getDay()).toBe(1);
    expect(result.getHours()).toBe(10);
    expect(result.getMinutes()).toBe(30);
    expect(result.getTime()).toBeGreaterThan(now.getTime());
  });
});
