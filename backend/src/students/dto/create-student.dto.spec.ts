import { CreateStudentDto } from './create-student.dto';

describe('CreateStudentDto', () => {
  it('can be instantiated', () => {
    const dto = new CreateStudentDto();

    dto.fullName = 'John Doe';
    dto.level = 'Terminale';
    dto.objective = 'Preparation bac';
    dto.sessionsDone = 1;
    dto.sessionWeekday = 0;
    dto.sessionTime = '10:00';
    dto.nextSessionAt = '2026-03-20T18:00:00.000Z';
    dto.notes = 'Notes';

    expect(dto.fullName).toBe('John Doe');
    expect(dto.sessionsDone).toBe(1);
  });
});
