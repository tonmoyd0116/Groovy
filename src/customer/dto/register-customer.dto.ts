import { IsEmail, MinLength ,IsNotEmpty, Matches } from "class-validator";

export class RegisterCustomerDto{
    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/,{
        message:"Phone number must be of 10 digits",
    })
    phoneNumber:string

    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{
        message:"Your password does not contain the right format"
    })
    password : string;

    @IsEmail({},{message:"Invalid message format"})
    email : string

}