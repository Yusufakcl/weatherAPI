import {PrismaClient} from '@prisma/client'
import { config } from '../config'

const prismaClientSingleton=() =>{
    return new PrismaClient({
        datasources:{
            db:{url:config.DATABASE_URL}
        },
        log:process.env.NODE_ENV === 'development' ?['query','error','warn']:['error']
    });


};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma=global as unknown as {prisma:PrismaClientSingleton | undefined};

export const prisma=globalForPrisma.prisma ?? prismaClientSingleton();

if(process.env.NODE_ENV !== 'production'){
    globalForPrisma.prisma=prisma;
}

