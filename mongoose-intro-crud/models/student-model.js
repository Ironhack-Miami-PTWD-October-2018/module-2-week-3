const mongoose = require('mongoose');
// we use Schema class given by mongoose
const Schema = mongoose.Schema;

// based on that schema we create a blueprint for our students collection
const studentSchema = new Schema({
    name:{ 
        type: String,
        required: true
    },
    image: { type: String, default: 'images/avatar.png'},
    course: { type: String } ,
    startedMonth: { type: String } ,
    startedYear: { type: Number },
    projects: [ String ],
    previousExperience: Boolean,
    created: {
        type: Date,
        default: Date.now
    }
})


const Student = mongoose.model("Student", studentSchema);

// we export the model to make it accessible in other files
module.exports = Student;
