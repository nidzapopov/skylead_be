import { IsString, IsNotEmpty, IsDefined, IsEnum, IsMongoId } from 'class-validator';
export default class CreateTask{
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsDefined()
    @IsEnum(['todo', 'in_progress', 'done'], { message: "Status must be 'todo', 'in_progress', or 'done'." })
    public status: 'todo' | 'in_progress' | 'done';

    @IsNotEmpty()
    @IsDefined()
    @IsMongoId({ message: "User ID must be a valid MongoDB ObjectId." })
    public userId: string;
}
