const express = require('express');
const { addMentor, getMentors, assignStudent, getStudentsByMentorId } = require('../controllers/mentors.controllers')

const router = express.Router();

router.get('/mentors', getMentors)
router.get('/mentors/:mentorId/students', getStudentsByMentorId)
router.post('/mentors', addMentor)
router.put('/mentors', assignStudent)

module.exports = router;