import { Injectable } from "@nestjs/common";
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

  async createCustomer(data: Partial<Customer>) {
    const newCustomer = new this.customerModel(data);
    return newCustomer.save();
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
