import {Get,Controller} from '@nestjs/common'

@Controller('seller')
export class SellerController{
    @Get('health-check')
    healthCheck(){
        return 'This is a health check for Seller';
    }
}