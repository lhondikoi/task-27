const express = require('express');
const { addStudent, getStudents, assignMentor, getMentorsByStudentId } = require('../controllers/students.controllers')

const router = express.Router();

router.get('/students', getStudents)
router.get('/students/:studentId/mentors', getMentorsByStudentId)

router.post('/students', addStudent)
router.put('/students', assignMentor)

module.exports = router;