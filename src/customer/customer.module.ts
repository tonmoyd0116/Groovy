import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerController } from "./customer.controller";
import { Customer,CustomerSchema } from "./schema/customer.schema";
import { CustomerService } from "./customer.provider";

@Module({
    imports:[MongooseModule.forFeature([{name:Customer.name, schema:CustomerSchema}]),],
    controllers:[CustomerController],
    providers:[CustomerService]
})

export class CustomerModule{}