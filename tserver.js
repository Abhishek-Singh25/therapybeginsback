const express=require('express');
const app=express();
const cors=require('cors');
const mysql=require('mysql2');
require('dotenv').config();
const PORT=process.env.PORT || 5000;

app.use(cors({
    origin: "https://therapybeginsfront.onrender.com",
    methods: ["GET","POST","PUT","DELETE"]
}));
app.use(express.json());

const db=mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE
});
db.connect(err=>{
    if(err){
        console.error('error in database connection',err);
    }else{
        console.log('database connected');
    }
});
app.post('/appointments',(req,res)=>{
    const {name,email,phone,date,time,message}=req.body;
    const sql="INSERT INTO usersss(name,email,phone,date,time,message) VALUES(?,?,?,?,?,?)";
    db.query(sql,[name,email,phone,date,time,message],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({error: 'database error'});
        }
        res.status(201).json({message:`Appointment Confirmed for ${name} on ${date} at ${time}`});
    });
});
app.get('/appointments',(req,res)=>{
    db.query('SELECT * FROM usersss',(err,results)=>{
        if(err){
            return res.status(500).json({error:'database error'});
        }
        res.json(results);
    });
});
app.listen(PORT,()=>{
    console.log('Server Started');
})
