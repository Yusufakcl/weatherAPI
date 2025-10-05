import { Router } from "express";
import { WeatherService } from "../services/weatherService";
import { error } from "console";

const router=Router();

router.get('/:cityCode',async (req,res,next)=>{
    let city:any=null;
    try{
        const code=String(req.params.cityCode).toUpperCase();
        city=await WeatherService.getCityByCode(code);
        if(!city){
            return res.status(404).json({error:`City nor found`});
        }

        const {weather,source}=await WeatherService.getCurrentWeatherForCity(city);
        await WeatherService.logRequest(city.id,true,{clientIp:req.ip,statusCode:200});
        return res.json({city,weather,cache:source==='cache'});
    }catch(err:any){
        if(city){
            await WeatherService.logRequest(city.id,false,
                {clientIp:req.ip,
                statusCode:err?.status || 500,
                error:err?.message || 'External provider error'});
        }
        next(err);
    }
})

export default router;