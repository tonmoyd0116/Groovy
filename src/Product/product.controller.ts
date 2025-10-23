import { Controller,Get,HttpException, HttpStatus } from "@nestjs/common";    


@Controller('home')
export class ProductController {
    @Get()
    async getHome()  {
        return new Promise((resolve,reject)=>{

            setTimeout(()=>{
                const success : Boolean = Math.random() > 0.5;
                if(success){
                    resolve('Welcome to the home page of this Market !')
                }else{
                    reject('Failed to fetch home data !!')
                }
            },1000);          
        })
        .then((resolve)=>{
            console.log(`Inside reslolve ${resolve}`);
            return resolve;
        })
        .catch((reject)=>{
            console.log(`Insie error: ${reject}`)
             throw new HttpException(
                { status: HttpStatus.BAD_REQUEST, error: reject },
                HttpStatus.BAD_REQUEST
            );
        })
        .finally(()=>{
            console.log('Clean up work will be done in the finally blocks as it executes anyways!');
        })

    }

    @Get('check')
    async check(){
        return 'Just checking if the url is being hit or not';
    }
}