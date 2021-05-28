const express = require ('express');
const Logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const courses = require('./routes/courses')
const home = require('./routes/home')
const config= require('config')

app.use(express.json());   //Global Middleware
app.use(express.urlencoded({ extended:true}));
app.use(express.static('public'))
app.use(helmet());
app.use(('/api/courses'),courses)
app.use(('/'),home)



console.log(`App Name : ${config.get('name')}`)
console.log(`Mail Server : ${config.get('mail.host')}`)
// console.log(`Mail Password : ${config.get('mail.password')}`)



if(app.get('env')=== 'development'){
app.use(morgan('tiny'))
console.log("Morgan Enabled ...")
}

app.use(Logger);



//GET Requests
app.get('/', (req,res) => {
    res.send('Hello World');
}); 



app.listen(4000, () => console.log('On port 4000'));    