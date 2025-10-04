import { Router } from "express";
import { WeatherService } from "../services/weatherService";
import { error } from "console";

const router=Router();

router.get('/:cityCode',async (req,res,next)=>{
    try{
        const code=String(req.params.cityCode).toUpperCase();
        const city=await WeatherService.getCityByCode(code)
        if(!city){
            return res.status(400).json({error:'City not found'});
        }

        
        await WeatherService.logRequest(city.id,true,{clientIp:req.ip,statusCode:200});

        return res.json({city})
    }catch(err){
        next(err);
    }
})

export default router;