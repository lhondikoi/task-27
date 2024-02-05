const Mentor = require('../models/mentors.model')
const Student = require('../models/students.model')

const getMentors = async (req, res) => {
    try {
        let mentors = await Mentor.find()
        if (mentors) {
            return res.status(200).send({
                msg: "Successfully retrieved list of mentors.",
                data: mentors
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

const addMentor = async (req, res) => {
    try {
        const { mentorName } = req.body
        const newMentor = new Mentor({
            name: mentorName
        })
        newMentor.save()
        .then(data => {
            res.status(201).send({
                msg: "Mentor has been created successfully!",
                data: data
        })})
        .catch(e => {
            res.status(500).send({
                msg: "There was an error creating the mentor."
            })
        })
    } catch(e) {
        res.status(500).send({
            msg: "Internal Server Error"
        })
    }
}

const assignStudent = async (req, res) => {
    try {
        const payload = req.body;

        const student = await Student.findOne({ _id: payload.sid }).exec()
        const mentor = await Mentor.findOne({ _id: payload.mid }).exec()
        
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
                msg: "Successfully assigned student to mentor."
            })
        }
        return res.status(500).send({
            msg: "There was an error assigning the student to the mentor."
        })
    } catch(e) {
        res.status(500).send({
            msg: "Internal Server Error"
        })
    }
}

const getStudentsByMentorId = async (req, res) => {
    try {
        const { mentorId } = req.params
        
        const mentor = await Mentor
        .findOne({ _id: mentorId })
        .populate('students')
        .exec()
        
        if (mentor) {
            return res.status(200).send({
                data: {
                    mentorName: mentor.name,
                    students: mentor.students.map(student => student.name)
                }
            })
        }

        return res.status(500).send({
            msg: "There was an error fetching the list of students for the mentor."
        })


    } catch(e) {
        res.status(500).send({
            msg: "Internal Server Error"
        })
    }
}


module.exports = {
    getMentors,
    addMentor,
    assignStudent,
    getStudentsByMentorId
}