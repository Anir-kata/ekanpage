import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { ListStudentsQueryDto } from './list-students-query.dto';

describe('ListStudentsQueryDto', () => {
  it('transforms page and limit string values to numbers', () => {
    const dto = plainToInstance(ListStudentsQueryDto, {
      page: '2',
      limit: '10',
      search: 'test',
    });
    expect(dto.page).toBe(2);
    expect(dto.limit).toBe(10);
    expect(dto.search).toBe('test');
  });

  it('keeps optional fields undefined when not provided', () => {
    const dto = plainToInstance(ListStudentsQueryDto, {});
    expect(dto.page).toBeUndefined();
    expect(dto.limit).toBeUndefined();
    expect(dto.search).toBeUndefined();
  });
});
