import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './customer/customer.controller';
import { SellerController } from './seller/seller.controller';
import { CustomerModule } from './customer/customer.module';
@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017/groovydb",{
    dbName:'groovydb',
  }),CustomerModule],
  controllers: [AppController,SellerController],
  providers: [AppService],
})
export class AppModule {}
