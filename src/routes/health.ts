import { Router } from "express";

const router=Router();
router.get('/',(req,res)=>{
    res.json({
        status:'ok',
        timeStamp:new Date().toISOString()
    })
})

export default router;