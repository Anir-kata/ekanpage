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

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @Length(2, 150)
  fullName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  level?: string;

  @IsOptional()
  @IsString()
  @Length(2, 255)
  objective?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sessionsDone?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(6)
  sessionWeekday?: number;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  sessionTime?: string;

  @IsOptional()
  @IsDateString()
  nextSessionAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
