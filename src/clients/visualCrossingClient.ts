import { config } from "../config"
import axios from "axios"

export type CurrentWeather={
    temp: number,
    humidity:number,
    windSpeed:number,
    conditions:string,
    icon:string,
    observedAt:number
}

export async function fetchCurrentWeather(lat:number,lon:number):Promise<CurrentWeather>{
    const url=`${config.WEATHER_BASE_URL}/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}` ;

    try{
        const {data}=await axios.get(url,{
            timeout:8000,
            params:{
                unitGroup:'metric',
                key:config.WEATHER_API_KEY,
                include:'current',
                contentType:'json',
                elements:'temp,humidity,windspeed,conditions,icon,datetimeEpoch'
            },
        });
        const currentConditions=data?.currentConditions;
        if(!currentConditions){
            throw new Error('Hava durumu sağlayıcından geçersiz veya boş yanıt alındı');
        }
        return{
            temp:currentConditions.temp,
            humidity:currentConditions.humidity,
            windSpeed:currentConditions.windspeed,
            conditions:currentConditions.conditions,
            icon:currentConditions.icon,
            observedAt:currentConditions.datetimeEpoch
        };
    }catch(error:any){
        const location=`(${lat},${lon})`;     
        console.error(`[visualCrossingClient] ${location} için hava durumu alınırken hata oluştu:`, error.message)
        throw new Error(`Dış sağlayıcıdan ${location} için hava durumu verisi alınamadı.`);
    }
}