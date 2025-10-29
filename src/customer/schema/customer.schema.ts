import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ required: true, unique: true, minLength: 10 })
  phoneNumber: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, minLength: 8 })
  password: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

// ✅ Custom static method
CustomerSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

// ✅ Custom model interface
export interface CustomerModel extends Model<Customer> {
  findByEmail(email: string): Promise<Customer | null>;
}
