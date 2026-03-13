import { IsDateString, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

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

  @IsOptional()
  @IsDateString()
  nextSessionAt?: string;

  @IsString()
  notes: string;
}
