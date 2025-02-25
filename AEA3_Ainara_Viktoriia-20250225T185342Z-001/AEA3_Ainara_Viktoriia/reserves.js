
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());


const readData = () => {
    try {
        const data = fs.readFileSync("./reserves.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};



const writeData = (data) => {
    try {
        fs.writeFileSync("./reserves.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req,res)=>{
    console.log("Ok!");
});

app.get("/reserves",(req,res)=>{
    const data=readData();
    res.json(data.reserves);
});


//para consultar con id
app.get("/reserves/:id_noti",(req,res)=>{
    const data=readData();
    const id=parseInt(req.params.id);
    const reserva=data.reserves.find((reserva)=>reserva.id===id);
    res.json(reserva);
});


//para crear nueva notificacion
app.post("/reserves",(req,res)=>{
    const data=readData();
    const body=req.body;
    const newReserva={
    id:data.reserves.length+1,
    ...body,
    };
    data.reserves.push(newReserva);
    writeData(data);
    res.json(newReserva);
});

//para update 
app.put("/reserves/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const reservaIndex = data.reserves.findIndex((reserva) => reserva.id === id);
    data.reserves[reservaIndex] = {
    ...data.reserves[reservaIndex],
    ...body,
    };
    writeData(data);
    res.json({ message: "Reserva actualizada" });
});


//para eliminar
app.delete("/reserves/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const reservaIndex = data.reserves.findIndex((reserva) => reserva.id === id);
    data.reserves.splice(reservaIndex, 1);
    writeData(data);
    res.json({ message: "Reserva eliminada" });
});


//Funció per escoltar
app.listen(3001, ()=>{
    console.log("Server listing on port 3001");
});