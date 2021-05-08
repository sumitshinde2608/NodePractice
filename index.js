const express = require ('express');
const app = express();

const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},
]
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

// app.post('/api/courses',(req,res)=>{

// })


app.listen(4000, () => console.log('On port 4000'));    