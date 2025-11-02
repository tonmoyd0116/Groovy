import { Injectable , BadRequestException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./schema/customer.schema";
import type { CustomerModel } from "./schema/customer.schema";

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
    const {password:_,...result} = newCustomer.toObject();
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
