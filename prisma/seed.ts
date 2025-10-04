import {PrismaClient} from '@prisma/client'

const prisma=new PrismaClient();

const cities = [
    { code: 'IST', name: 'Istanbul', country: 'TR', latitude: 41.0082, longitude: 28.9784 },
    { code: 'ANK', name: 'Ankara',  country: 'TR', latitude: 39.9334, longitude: 32.8597 },
    { code: 'IZM', name: 'Izmir',   country: 'TR', latitude: 38.4237, longitude: 27.1428 },
    { code: 'BUR', name: 'Bursa',   country: 'TR', latitude: 40.1950, longitude: 29.0600 },
    { code: 'ANT', name: 'Antalya', country: 'TR', latitude: 36.8969, longitude: 30.7133 },
  ];

async function main(){
    for (const c of cities){
        await prisma.city.upsert({
            where:{code:c.code},
            update:{name:c.name,country:c.country,latitude:c.latitude,longitude:c.longitude},
            create:c,
        })
    }
    console.log(`seeded ${cities.length} cities.`);
}

main().catch((e)=>{
    console.error(e);
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
});