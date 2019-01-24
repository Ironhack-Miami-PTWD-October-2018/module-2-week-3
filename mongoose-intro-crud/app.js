const express = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');

// import model to make it available in this file:
const Student = require('./models/student-model');

// connect with database:
//                                here you name your DB 🙌
//                                          |
mongoose.connect("mongodb://localhost/studentBook")


// we create our application here:
const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// CREATE new database instances:
Student.create({
    name: "Paula",
    course: "Web Dev",
    startedMonth: "October",
    startedYear: 2018,
    projects: [ 'game' ],
    previousExperience: true
})
.then( newStudent => {
    console.log("🎯 🎯 🎯 New student successfully created in DB: ", newStudent);
} )
.catch( err => {
    console.log("Error while creating new instance: ", err);
})


// ALTERNATIVE WAY TO CREATE INSTANCE IN THE DATABASE

const camiloInfo = new Student({
        name: "Camilo",
        course: "Web Dev",
        startedMonth: "December",
        startedYear: 2018,
        projects: [ 'game' ],
        previousExperience: true
})

camiloInfo.save()
    .then( newStudentInfo => {
        console.log("New student created: ", newStudentInfo)
    })
    .catch( err => {
        console.log("Error while saving new student: ", err)
    })




// RETRIEVE/ READ 

Student.find() // <==== .find() will ALWAYS give you an ARRAY back
.then( allStudentsFromDB => {
    allStudentsFromDB.forEach(student => {
        // console.log(student.name);
    })
})
.catch( err => console.log("Error while getting the data from the DB: ", err))

// .findById() will always give you an OBJECT back
Student.findById("5c491c32949dbf4cc1e331e7")
.then(theStudent => {
    console.log("Student is: ", theStudent.name)
})
.catch( err => {
    console.log("Error while getting a single student from DB: ", err);
} )

Student.findOne({ course: "UX" })
.then(theStudent => {
    console.log("Student is: ", theStudent.name)
})
.catch( err => {
    console.log("Error while getting a single student from DB: ", err);
})



// UPDATE
//                              findById          and      { update }                                                            
Student.findByIdAndUpdate("5c491c32949dbf4cc1e331e7", { name: "Paula S." })
.then( updatedStudent => {
    console.log("Updated student is: ", updatedStudent)
} )
.catch( err => { 
    console.log("Error while updating: ", err);
} )


// DELETE

Student.findByIdAndRemove("5c491c3340b9a04cc49b0671")
.then( student => { 
    console.log(`Student with id: ${student._id} is removed from the DB.`)
} )
.catch( err => {
    console.log("Error while removing: ", err);
} )

Student.findByIdAndDelete("5c491c32949dbf4cc1e331e7")
.then( student => { 
    console.log(`Student with id: ${student._id} is removed from the DB.`)
} )
.catch( err => {
    console.log("Error while removing: ", err);
} )


app.listen(3000, () => {
    console.log("Listening on 3000 ❗️️")
})