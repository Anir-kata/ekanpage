import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentEntity } from './student.entity';

describe('StudentsController', () => {
  let controller: StudentsController;
  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as unknown as StudentsService;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new StudentsController(service);
  });

  it('create delegates to service', async () => {
    const dto = {
      fullName: 'John',
      level: 'Terminale',
      objective: 'Goal',
      sessionsDone: 1,
      nextSessionAt: '2026-03-20T18:00:00.000Z',
      notes: 'Notes',
    };
    const created = { id: '1', ...dto } as unknown as StudentEntity;
    (service.create as jest.Mock).mockResolvedValue(created);

    await expect(controller.create(dto)).resolves.toEqual(created);
  });

  it('findAll delegates to service', async () => {
    const list = [{ id: '1' }] as StudentEntity[];
    (service.findAll as jest.Mock).mockResolvedValue(list);

    await expect(controller.findAll()).resolves.toEqual(list);
  });

  it('findOne delegates to service', async () => {
    const one = { id: '1' } as StudentEntity;
    (service.findOne as jest.Mock).mockResolvedValue(one);

    await expect(controller.findOne('1')).resolves.toEqual(one);
  });

  it('update delegates to service', async () => {
    const updated = { id: '1', sessionsDone: 2 } as StudentEntity;
    (service.update as jest.Mock).mockResolvedValue(updated);

    await expect(controller.update('1', { sessionsDone: 2 })).resolves.toEqual(updated);
  });

  it('remove delegates to service', async () => {
    (service.remove as jest.Mock).mockResolvedValue(undefined);

    await expect(controller.remove('1')).resolves.toBeUndefined();
  });
});
