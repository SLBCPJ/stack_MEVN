import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
const app = express();
//conexion a la DB de mongodb por medio de atlas
mongoose.connect('mongodb+srv://root:toor@cluster0.vnmaf.mongodb.net/myapp?retryWrites=true&w=majority')
.then(db => console.log('Conectado a la DB'))
.catch(err => console.log(err)); 

//middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Rutas
app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/rutina'));
app.use('/api', require('./routes/dieta'));
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
//Middleware estatico
app.use(express.static(path.join(__dirname,'public')));
//para ver si esta funcionando el servidor
// app.get('/',(req,res)=>{
//     res.send('Hello World');
// });


//puerto
app.set('puerto',process.env.PORT || 3000);
app.listen(app.get('puerto'),()=>{
    console.log('Servidor ok en puerto: '+ app.get('puerto'));
});
