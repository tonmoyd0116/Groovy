import { Injectable , BadRequestException, UnauthorizedException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./schema/customer.schema";
import type { CustomerModel } from "./schema/customer.schema";
import { LoginCustomerDto } from "./dto/login-customer";
import * as argon2 from "argon2";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: CustomerModel
  ) {}

  async findByEmail(email: string) {
    return this.customerModel.findByEmail(email);
  }

  async findAll() {
    return this.customerModel.find().exec();
  }

  async login(loginDto:LoginCustomerDto):Promise<{
    message:string;
    customer : {id:string;email:string}
  }> {
      const {email,password} = loginDto;

      const customer = await this.customerModel.findByEmail(email);
      if(!customer) throw new UnauthorizedException("Your Email is not found.");
      // I will now extract the password from the loginDto
      // hash it using argon2id 
      // store it in a variable and compare it with the 
      // password stored in the mongodb
      const isPasswordValid = await argon2.verify(customer.password, password);

      if(!isPasswordValid) throw new UnauthorizedException("Sorry Password is incorrect, No access for you");

      return{
        message : "Yay! welcome back",
        customer :{
          id : customer.id.toString(),
          email : customer.email,
        }
      }
  }

  async register(customerData:{
    phoneNumber : string,
    email : string,
    password : string,
  }){
    const {phoneNumber,email,password} = customerData;
    // check if email exists or not
    const existing = await this.customerModel.findOne({email});
    if(existing){
      throw new BadRequestException("Customer already exists");
    }

    // we are creating a new customer object here 
    const newCustomer = new this.customerModel({
      phoneNumber,
      email,
      password
    });

    await newCustomer.save();

    // now for json response we will not share the password in that response
    // Why ? 
    // --> it could be leaked via logs, or browser inspection tools 
    const {password:_, ...result} = newCustomer.toObject();
    return result; 
  }

  async findById(id: string) {
    return this.customerModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.customerModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, data: Partial<Customer>) {
    return this.customerModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
