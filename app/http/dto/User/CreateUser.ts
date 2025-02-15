import { IsString, IsNotEmpty, IsDefined } from 'class-validator';
export default class CreateUser{
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    public firstName: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    public lastName: string;
}
