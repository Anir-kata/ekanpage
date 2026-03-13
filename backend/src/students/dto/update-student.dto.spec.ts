import { UpdateStudentDto } from './update-student.dto';

describe('UpdateStudentDto', () => {
  it('can be instantiated with optional fields', () => {
    const dto = new UpdateStudentDto();

    dto.fullName = 'Jane Doe';
    dto.sessionsDone = 3;
    dto.sessionWeekday = 6;
    dto.sessionTime = '09:30';

    expect(dto.fullName).toBe('Jane Doe');
    expect(dto.sessionsDone).toBe(3);
    expect(dto.sessionWeekday).toBe(6);
    expect(dto.level).toBeUndefined();
  });
});
