const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();
require("./database");
const authRoutes = require("./routes/user");
const dietRoutes = require("./routes/dieta");
const rutinaRoutes = require("./routes/rutina");

//conexion a la DB de mongodb por medio de atlas
// mongoose.connect('mongodb+srv://root:toor@cluster0.vnmaf.mongodb.net/myapp?retryWrites=true&w=majority')
// .then(db => console.log('Conectado a la DB'))
// .catch(err => console.log(err));

app.use('/public', express.static(path.join(__dirname,'../uploads/img/')))
//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Rutas
app.use("/api", authRoutes);
app.use("/api", require("./routes/nota"));
app.use("/api", dietRoutes);
app.use("/api", rutinaRoutes);


//carga de archivos
// app.use(express.static('uploads'))
// Middleware para Vue.js router modo history
const history = require("connect-history-api-fallback");
app.use(history());
//Middleware estatico
//app.use(express.static(path.join(__dirname, "public")));
//para ver si esta funcionando el servidor
// app.get('/',(req,res)=>{
//     res.send('Hello World');
// });

//Iniciar servidor en puerto
app.set("puerto", process.env.PORT || 3000);
app.listen(app.get("puerto"), () => {
  console.log("Servidor ok en puerto: " + app.get("puerto"));
});
