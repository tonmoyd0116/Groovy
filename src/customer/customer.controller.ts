import { Controller, Get, Post, Param, Body, Delete, Put } from "@nestjs/common";
import { CustomerService } from "./customer.provider";
import { Customer } from "./schema/customer.schema";

@Controller("customers")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // 🔹 1️⃣ Create a new customer
  @Post()
  async createCustomer(@Body() body: Partial<Customer>) {
    return this.customerService.createCustomer(body);
  }

  // 🔹 2️⃣ Get all customers
  @Get()
  async findAll() {
    return this.customerService.findAll();
  }

  // 🔹 3️⃣ Find customer by ID
  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.customerService.findById(id);
  }

  // 🔹 4️⃣ Find customer by email
  @Get("email/:email")
  async findByEmail(@Param("email") email: string) {
    return this.customerService.findByEmail(email);
  }

  // 🔹 5️⃣ Update customer by ID
  @Put(":id")
  async updateById(@Param("id") id: string, @Body() body: Partial<Customer>) {
    return this.customerService.updateById(id, body);
  }

  // 🔹 6️⃣ Delete customer by ID
  @Delete(":id")
  async deleteById(@Param("id") id: string) {
    return this.customerService.deleteById(id);
  }
}
