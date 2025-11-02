import { Controller, Get, Post, Param, Body, Delete, Put } from "@nestjs/common";
import { CustomerService } from "./customer.provider";
import { Customer } from "./schema/customer.schema";
import { RegisterCustomerDto } from "./dto/register-customer.dto";
@Controller("customers")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post("register")
  async register(@Body() registerDto : RegisterCustomerDto){
    return this.customerService.register(registerDto);
  }

  @Get()
  async findAll() {
    return this.customerService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.customerService.findById(id);
  }


  @Get("email/:email")
  async findByEmail(@Param("email") email: string) {
    return this.customerService.findByEmail(email);
  }

  @Put(":id")
  async updateById(@Param("id") id: string, @Body() body: Partial<Customer>) {
    return this.customerService.updateById(id, body);
  }


  @Delete(":id")
  async deleteById(@Param("id") id: string) {
    return this.customerService.deleteById(id);
  }
}
