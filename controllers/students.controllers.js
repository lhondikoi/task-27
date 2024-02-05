const Student = require('../models/students.model')
const Mentor = require('../models/mentors.model')

const getStudents = async (req, res) => {
    try {
        let students = await Student.find()
        if (students) {
            return res.status(200).send({
                msg: "Successfully retrieved list of students.",
                data: students
            })
        }
        return res.status(500).send({
            msg: "Failed to fetch data."
        })
    }
    catch(e) {
        res.status(500).send({
            msg: "Internal Server Error"
        })
    }
}

const getMentorsByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params
        
        const student = await Student
        .findOne({ _id: studentId })
        .populate('mentors')
        .exec()
        
        if (student) {
            return res.status(200).send({
                data: {
                    studentName: student.name,
                    mentors: student.mentors.map(mentor => mentor.name)
                }
            })
        }

        return res.status(500).send({
            msg: "There was an error fetching the list of mentors for the student."
        })


    } catch(e) {
        res.status(500).send({
            msg: "Internal Server Error"
        })
    }
}

const addStudent = async (req, res) => {
    try {
        const { studentName } = req.body;
        const newStudent = new Student({
            name: studentName
        })
        newStudent.save()
        .then(data => {
            res.status(201).send({
                msg: "Student has been created successfully!",
                data: data
        })})
        .catch(e => {
            res.status(500).send({
                msg: "There was an error creating the student."
            })
        })
    } catch(e) {
        res.status(500).send({
            msg: "Internal Server Error"
        })
    }
}

const assignMentor = async (req, res) => {
    try {
        const payload = req.body;

        const mentor = await Mentor.findOne({ _id: payload.mid }).exec()
        const student = await Student.findOne({ _id: payload.sid }).exec()
        
        if (student && mentor) {
            // check if mentor is already assigned to student
            // https://futurestud.io/tutorials/mongodb-how-to-compare-objectids-in-node-js
            const studentHasMentor = student.mentors.find(mentorId => mentorId.equals(mentor._id))
            const mentorHasStudent = mentor.students.find(studentId => studentId.equals(student._id))

            if (studentHasMentor || mentorHasStudent) {
                return res.status(400).send({
                    msg: "Mentor is already assigned to student."
                })    
            }
            
            mentor.students.push(student._id)
            student.mentors.push(mentor._id)
            mentor.save()
            student.save()
            return res.status(200).send({
                msg: "Successfully assigned mentor to student."
            })
        }
        return res.status(500).send({
            msg: "There was an error assigning the mentor to the student."
        })
    } catch(e) {
        res.status(500).send({
            msg: "Internal Server Error"
        })
    }
}

module.exports = {
    getStudents,
    addStudent,
    assignMentor,
    getMentorsByStudentId
}