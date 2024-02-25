import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    email: string;

    @ApiProperty()
    password: string;
}


export class LoginDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    email: string;

    @ApiProperty()
    password: string;

}
