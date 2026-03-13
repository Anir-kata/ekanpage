import { NotFoundException } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentEntity } from './student.entity';

describe('StudentsService', () => {
  const repository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
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
      nextSessionAt: '2026-03-20T18:00:00.000Z',
      notes: 'Notes',
    };
    const created = { id: '1', ...dto } as unknown as StudentEntity;

    repository.create.mockReturnValue(created);
    repository.save.mockResolvedValue(created);

    await expect(service.create(dto)).resolves.toEqual(created);
    expect(repository.create).toHaveBeenCalledWith({
      ...dto,
      nextSessionAt: new Date(dto.nextSessionAt),
    });
  });

  it('create supports null nextSessionAt', async () => {
    const dto = {
      fullName: 'John',
      level: 'Terminale',
      objective: 'Goal',
      sessionsDone: 1,
      notes: 'Notes',
    };
    const created = { id: '1', ...dto } as unknown as StudentEntity;

    repository.create.mockReturnValue(created);
    repository.save.mockResolvedValue(created);

    await expect(service.create(dto)).resolves.toEqual(created);
    expect(repository.create).toHaveBeenCalledWith({
      ...dto,
      nextSessionAt: null,
    });
  });

  it('findAll returns descending list', async () => {
    const list = [{ id: '1' }] as StudentEntity[];
    repository.find.mockResolvedValue(list);

    await expect(service.findAll()).resolves.toEqual(list);
    expect(repository.find).toHaveBeenCalledWith({
      order: { createdAt: 'DESC' },
    });
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

  it('update keeps nextSessionAt when undefined', async () => {
    const existing = {
      id: '1',
      nextSessionAt: new Date('2026-01-01T00:00:00.000Z'),
    } as StudentEntity;
    repository.findOne.mockResolvedValue(existing);
    repository.save.mockResolvedValue(existing);

    await expect(service.update('1', { notes: 'updated' })).resolves.toEqual(
      existing,
    );
    expect(repository.save).toHaveBeenCalled();
  });

  it('update sets nextSessionAt to parsed date', async () => {
    const existing = { id: '1', nextSessionAt: null } as StudentEntity;
    repository.findOne.mockResolvedValue(existing);
    repository.save.mockResolvedValue(existing);

    await service.update('1', { nextSessionAt: '2026-03-20T18:00:00.000Z' });
    expect(existing.nextSessionAt).toEqual(
      new Date('2026-03-20T18:00:00.000Z'),
    );
  });

  it('update sets nextSessionAt to null when empty string', async () => {
    const existing = {
      id: '1',
      nextSessionAt: new Date('2026-01-01T00:00:00.000Z'),
    } as StudentEntity;
    repository.findOne.mockResolvedValue(existing);
    repository.save.mockResolvedValue(existing);

    await service.update('1', { nextSessionAt: '' });
    expect(existing.nextSessionAt).toBeNull();
  });

  it('remove deletes existing student', async () => {
    repository.delete.mockResolvedValue({ affected: 1 });

    await expect(service.remove('1')).resolves.toBeUndefined();
  });

  it('remove throws when student missing', async () => {
    repository.delete.mockResolvedValue({ affected: 0 });

    await expect(service.remove('404')).rejects.toThrow(NotFoundException);
  });
});
