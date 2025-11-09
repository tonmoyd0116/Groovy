import { IsEmail, IsString, MinLength } from "class-validator";
// This is how we create a DTO for a Login Feature- [pretty basics] 
export class LoginCustomerDto{
    @IsEmail()
    email : string

    @IsString()
    @MinLength(8)
    password:string;
}