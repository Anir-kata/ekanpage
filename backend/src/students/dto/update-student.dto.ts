import { IsDateString, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

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
	@IsDateString()
	nextSessionAt?: string;

	@IsOptional()
	@IsString()
	notes?: string;
}
