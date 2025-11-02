import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import * as argon2 from "argon2";

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

//  Adding argon2 for hashing purpose : Note that encryption is not same as hashing; the former one is reversible and the latter isn't
CustomerSchema.pre("save",async function(next){
  const customer = this as Customer;

  // if the password was modified then don't do anything and return the next
  if(!customer.isModified("password")) return next();

  try{
    const hash = await argon2.hash(customer.password,{
      type:argon2.argon2id,
      timeCost: 3,
      memoryCost:2**16,
      parallelism: 1,
    }); 

    // replace the password with the hash 
    customer.password = hash;

    // do the next steps
    next();
  }catch(err){
    next(err);
  }
});


CustomerSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

export interface CustomerModel extends Model<Customer> {
  findByEmail(email: string): Promise<Customer | null>;
}
