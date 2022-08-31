const express=require('express');
const errorMiddleware=require('./middleware/error');

const user=require('./Routes/UserRoutes');

const app=express();

app.use(express.json());

const product=require('./Routes/productRoute');

app.use("/api/v1",product);

app.use('/api/v1',user);

app.use(errorMiddleware);

//middleware for error

module.exports=app;