const express = require ('express');
const Logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const Joi = require('joi')

app.use(express.json());   //Global Middleware
app.use(express.urlencoded({ extended:true}));
app.use(express.static('public'))
app.use(helmet());

if(app.get('env')=== 'development'){
app.use(morgan('tiny'))
console.log("Morgan Enabled ...")
}



app.use(Logger);

app.use(function(req,res,next){
    console.log('Authenticating...');
    next();
});


const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},
]

const CourseValidate = (course) => {
    const schema = {
        name : Joi.string().min(3).required(),
    }

    return (Joi.validate(course, schema));

}


//GET Requests
app.get('/', (req,res) => {
    res.send('Hello World');
}); 

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});


app.get('/api/courses/:id',(req,res)=>{
const course = courses.find(c => c.id=== parseInt(req.params.id))
if(!course) { res.send('Course with the given id was not found')}
res.send(course);
});


//POST Request
app.post('/api/courses',(req,res)=>{

    const { error } = CourseValidate(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course)
})

//PUT Requests
app.put('/api/courses/:id',(req,res) => {
    
    //checking if id exits
    const course = courses.find(c => c.id=== parseInt(req.params.id))
    if(!course) { res.status(404).send('Course with the given id was not found')
        return;
        }

    //validating input
    const { error } = CourseValidate(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    //Updating the course
    course.name = req.body.name;
    res.send(course)
    }
)

 //DELETE Requests
app.delete('/api/courses/:id',(req,res) => {
    //checking if id exits
    const course = courses.find(c => c.id=== parseInt(req.params.id))
    if(!course) { res.status(404).send('Course with the given id was not found')
        return;
        }

    //deleting the course 
    const index = courses.indexOf(course);
    courses.splice(index,1);

    //returning to the client
    res.send(course);
})
    


app.listen(4000, () => console.log('On port 4000'));    