import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());


const readData = () => {
    try {
        const data = fs.readFileSync("./notificacions.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};



const writeData = (data) => {
    try {
        fs.writeFileSync("./notificacions.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req,res)=>{
    console.log("Ok!");
});

app.get("/notificacions",(req,res)=>{
    const data=readData();
    res.json(data.notificacions);
});


//para consultar con id
app.get("/notificacions/:id_noti",(req,res)=>{
    const data=readData();
    const id_noti=parseInt(req.params.id_noti);
    const notificacion=data.notificacions.find((notificacion)=>notificacion.id_noti===id_noti);
    res.json(notificacion);
});


//para crear nueva notificacion
app.post("/notificacions",(req,res)=>{
    const data=readData();
    const body=req.body;
    const newNoti={
    id:data.notificacions.length+1,
    ...body,
    };
    data.notificacions.push(newNoti);
    writeData(data);
    res.json(newNoti);
});

//para update 
app.put("/notificacions/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const notifiIndex = data.notificacions.findIndex((notificacion) => notificacion.id === id);
    data.notificacions[notifiIndex] = {
    ...data.notificacions[notifiIndex],
    ...body,
    };
    writeData(data);
    res.json({ message: "Notifications actualizada" });
});


//para eliminar
app.delete("/notificacions/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notifiIndex = data.notificacions.findIndex((notificacion) => notificacion.id === id);
    data.notificacions.splice(notifiIndex, 1);
    writeData(data);
    res.json({ message: "Notifications eliminada" });
});


//Funció per escoltar
app.listen(3001, ()=>{
    console.log("Server listing on port 3001");
});
