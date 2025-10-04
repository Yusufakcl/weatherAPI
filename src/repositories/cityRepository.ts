import {prisma} from '../db/prismaClient';

export const CityRepository={
    findByCode:(code:string)=>prisma.city.findUnique({where:{code}}),

    listAll:()=>prisma.city.findMany({orderBy:{name:"asc"}}),
    
    create:(data:{code:string,name:string,country:string,latitude:number,longitude:number})=>
        prisma.city.upsert({
            where:{code:data.code},
            update:{name:data.name,country:data.country,latitude:data.latitude,longitude:data.longitude},
            create:data,
    }),
};