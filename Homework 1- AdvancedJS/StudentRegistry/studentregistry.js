let studentForm = document.getElementById("studentForm");

let students = [];

function Student(first, last, age, email) {
    this.firstName = first;
    this.lastName = last;
    this.studentsAge = age;
    this.studentsEmail = email;
}

function showStudents(studentsArr) {
    for (let student of studentsArr) {
        console.log(`Name:${student.firstName} ${student.lastName} Age:${student.studentsAge} Email:${student.studentsEmail}`);
        firstName.value = '';
        lastName.value = '';
        age.value = '';
        email.value = '';
    }
}

let submitBtn = studentForm.getElementsByTagName("button")[0];

submitBtn.addEventListener('click', function() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;

    let newStudent = new Student(firstName, lastName, age, email);
    
    students.push(newStudent);

    showStudents(students);
})