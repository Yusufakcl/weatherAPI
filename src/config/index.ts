import dotenv from 'dotenv';
import {z} from 'zod';
dotenv.config();

const envSchema=z.object({
    PORT:z.string().default('4000'),
    NODE_ENV:z.enum(['development','production','test']).default('development'),
    DATABASE_URL:z.string(),
    REDIS_URL:z.string().optional(),
    WEATHER_API_KEY:z.string(),
    WEATHER_BASE_URL:z.string().default('https://weather.visualcrossing.com'),
    CACHE_TTL_SECONDS:z.string().default('43200')
});

const parsed=envSchema.safeParse(process.env);
if(!parsed.success){
    console.error('Missing/invalid env vars',parsed.error.format());
    process.exit(1);
}

export const config={
    PORT:Number(parsed.data.PORT),
    NODE_ENV:parsed.data.NODE_ENV,
    DATABASE_URL:parsed.data.DATABASE_URL,
    REDIS_URL:parsed.data.REDIS_URL,
    WEATHER_API_KEY:parsed.data.WEATHER_API_KEY,
    CACHE_TTL_SECONDS:Number(parsed.data.CACHE_TTL_SECONDS),
    WEATHER_BASE_URL:parsed.data.WEATHER_BASE_URL,
};