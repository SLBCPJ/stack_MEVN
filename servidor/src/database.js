const mongoose = require('mongoose');
const options = { useNewUrlParser: true, useUnifiedTopology: true };
//conexion a la DB de mongodb por medio de atlas
mongoose
  .connect(process.env.DB_STRING, options)
  .then((db) => console.log("Connected to MongoDb:", db.connection.name))
  .catch((error) => console.log(error));

module.exports=mongoose