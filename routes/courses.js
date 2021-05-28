const express = require('express');
const router = express.Router();
const Joi = require('joi')



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

router.get('/',(req,res)=>{
    res.send(courses);
});


router.get('/:id',(req,res)=>{
const course = courses.find(c => c.id=== parseInt(req.params.id))
if(!course) { res.send('Course with the given id was not found')}
res.send(course);
});


//POST Request
router.post('/',(req,res)=>{

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
router.put('/:id',(req,res) => {
    
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
router.delete('/:id',(req,res) => {
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
    
module.exports = router;