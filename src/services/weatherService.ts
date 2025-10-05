import { City } from "@prisma/client";
import { CurrentWeather, fetchCurrentWeather } from "../clients/visualCrossingClient";
import { CityRepository } from "../repositories/cityRepository";
import { WeatherRequestLogRepository } from "../repositories/weatherRequsestLogRepository";
import { redis } from "../cache/redisClient";
import { config } from "../config";
import { httpError } from "../utils/httpError";

export const WeatherService={
    getCityByCode:async (code:string) =>{
        return CityRepository.findByCode(code.toUpperCase());
    },

    getCurrentWeatherForCity:async (city:City):Promise<{weather:CurrentWeather;source:'cache'|'provider'}> =>{
        const key=`weather:city:${city.code}`;
        const cached=await redis.get(key);
        if(cached){
            return {weather:JSON.parse(cached),source:'cache'};
        }

        try{
            const weather=await fetchCurrentWeather(city.latitude,city.longitude);
            await redis.set(key,JSON.stringify(weather),'EX',config.CACHE_TTL_SECONDS);
            return {weather,source:'provider'};
        }catch(e){
            throw httpError(502,'Weather provider error');
        }
    },


    logRequest: async (
        cityId:number,
        success:boolean,
        opts?:{clientIp?:string,statusCode?:number,error?:string}
    ) =>{
        return WeatherRequestLogRepository.log({
            cityId,
            success,
            clientIp:opts?.clientIp,
            statusCode:opts?.statusCode,
            error:opts?.error

        })
    }
}