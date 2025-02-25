import express from "express";
import fs, { read } from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./recurs.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData=(data)=>{
    try{
        fs.writeFileSync("./recurs.json",JSON.stringify(data));

    }catch(error){
        console.log(error);
    }
};

//Ver recursos GET
app.get("/recursos",(req,res)=>{
    const data=readData();
    res.json(data.recursos)
});



//Ver recurso por id GET
app.get("/recursos/:id",(req,res)=>{
    const data=readData();
    const id=parseInt(req.params.id);
    const recurs=data.recursos.find((recurso)=>recurso.id===id);
    res.json(recurs);
});

//Crear recurso
//Hacemos que la app cree un post (publicar)
app.post("/recursos",(req,res)=>{
    const data=readData();
    const body=req.body;
    //Creamos nuevo usuario
    const nuevoRecurso={
        //Generamos el siguiente id de forma automática
        id:data.recursos.length+1,
        //y le ponemos el resto de información
        ...body,    
    };
    //
    data.recursos.push(nuevoRecurso);
    //
    writeData(data);

    res.json(nuevoRecurso);
})

//MODIFICAR || PUT
app.put("/recursos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const recursIndex = data.recursos.findIndex((recurso) => recurso.id === id);
    data.recursos[recursIndex] = {
        ...data.recursos[recursIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Usuari modificat correctament" });
});

//PARA ELIMINAR || DELETE
app.delete("/recursos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const recursIndex = data.recursos.findIndex((recurso)=> recurso.id===id);
    data.recursos.splice(recursIndex, 1);
    writeData(data);
    res.json({ message: "Usuari eliminat correctament" });
});

//PARA ESCUCHAR
app.listen(3001,()=>{
    console.log("Server listing on port 3001");
});