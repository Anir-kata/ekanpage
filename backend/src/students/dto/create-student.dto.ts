import {
  Matches,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @Length(2, 150)
  fullName: string;

  @IsString()
  @Length(2, 100)
  level: string;

  @IsString()
  @Length(2, 255)
  objective: string;

  @IsInt()
  @Min(0)
  sessionsDone: number;

  @IsInt()
  @Min(0)
  @Max(6)
  sessionWeekday: number;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  sessionTime: string;

  @IsOptional()
  @IsDateString()
  nextSessionAt?: string;

  @IsString()
  notes: string;
}
