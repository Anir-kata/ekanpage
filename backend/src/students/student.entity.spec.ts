import { StudentEntity } from './student.entity';

describe('StudentEntity', () => {
  it('can be instantiated and assigned', () => {
    const entity = new StudentEntity();

    entity.id = 'id-1';
    entity.fullName = 'John Doe';
    entity.level = 'Terminale';
    entity.objective = 'Preparation bac';
    entity.sessionsDone = 2;
    entity.sessionWeekday = 0;
    entity.sessionTime = '10:00';
    entity.nextSessionAt = new Date('2026-03-20T18:00:00.000Z');
    entity.notes = 'Notes';
    entity.createdAt = new Date('2026-03-01T10:00:00.000Z');
    entity.updatedAt = new Date('2026-03-02T10:00:00.000Z');

    expect(entity.fullName).toBe('John Doe');
    expect(entity.sessionsDone).toBe(2);
    expect(entity.sessionWeekday).toBe(0);
    expect(entity.nextSessionAt?.toISOString()).toBe(
      '2026-03-20T18:00:00.000Z',
    );
  });
});
