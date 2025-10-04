import { CityRepository } from "../repositories/cityRepository";
import { WeatherRequestLogRepository } from "../repositories/weatherRequsestLogRepository";

export const WeatherService={
    getCityByCode:async (code:string) =>{
        return CityRepository.findByCode(code.toUpperCase());
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