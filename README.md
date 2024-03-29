# List of endpoints

```
BASE_URL = "https://mentor-api-8rt8.onrender.com"
```

### Student Management Endpoints

Method | URI | Description
------------|-----|-------
GET | http://{BASE_URL}/api/v1/students | Fetch all students
GET | http://{BASE_URL}/api/v1/students/{studentId}/mentors | Fetch all mentors assigned to a particular student
POST | http://{BASE_URL}/api/v1/students | Create a new student
PUT |  http://{BASE_URL}/api/v1/students | Assign a mentor to a student

### Mentor Management Endpoints

Method | URI | Description
------------|-----|-------
GET | http://{BASE_URL}/api/v1/mentors | Fetch all mentors
GET | http://{BASE_URL}/api/v1/mentors/{mentorId}/students | Fetch all students assigned to a particular mentor
POST | http://{BASE_URL}/api/v1/mentors | Create a new mentor
PUT | http://{BASE_URL}/api/v1/mentors | Assign a student to a mentor