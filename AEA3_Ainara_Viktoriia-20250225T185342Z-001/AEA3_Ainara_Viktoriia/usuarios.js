import express from "express";
import fs, { read } from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./usuari.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData=(data)=>{
    try{
        fs.writeFileSync("./usuari.json",JSON.stringify(data));

    }catch(error){
        console.log(error);
    }
};

app.get("/",(req,res)=>{
    res.send("Todo correcto");
});
//Ver usuarios GET
app.get("/usuaris",(req,res)=>{
    const data=readData();
    res.json(data.usuaris)
});

//Ver usuario por id GET
app.get("/usuaris/:id",(req,res)=>{
    const data=readData();
    const id=parseInt(req.params.id);
    const user=data.usuaris.find((usuari)=>usuari.id===id);
    res.json(user);
});

//Crear usuario
//Hacemos que la app cree un post (publicar)
app.post("/usuaris",(req,res)=>{
    const data=readData();
    const body=req.body;
    //Creamos nuevo usuario
    const nuevoUsuario={
        //Generamos el siguiente id de forma automática
        id:data.usuaris.length+1,
        //y le ponemos el resto de información
        ...body,    
    };
    //
    data.usuaris.push(nuevoUsuario);
    //
    writeData(data);

    res.json(nuevoUsuario);
})

//MODIFICAR || PUT
app.put("/usuaris/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const userIndex = data.usuaris.findIndex((usuari) => usuari.id === id);
    data.usuaris[userIndex] = {
        ...data.usuaris[userIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Usuari modificat correctament" });
});

//PARA ELIMINAR || DELETE
app.delete("/usuaris/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const userIndex = data.usuaris.findIndex((usuari)=> usuari.id===id);
    data.usuaris.splice(userIndex, 1);
    writeData(data);
    res.json({ message: "Usuari eliminat correctament" });
});

//PARA ESCUCHAR
app.listen(3001,()=>{
    console.log("Server listing on port 3001");
});
