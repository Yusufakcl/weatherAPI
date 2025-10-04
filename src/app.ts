import express from 'express';
import healthRouter from './routes/health';
import weatherRouter from './routes/weather';

const app=express();
app.use(express.json());

app.use('/health',healthRouter);
app.use('/weather',weatherRouter);

app.use((err:any,req:any,res:any,next:any)=>{
    console.error(err);
    res.status(err.status || 500).json({error:err.message || 'Internal Error'});

});

export default app;