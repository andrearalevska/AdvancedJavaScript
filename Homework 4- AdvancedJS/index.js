fetch("https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json")
.then(response => response.json())
.then(data => {
    
    console.log("1.All female student names with an average grade of 5:");
    data.filter(element => element.gender === "Female" && element.averageGrade === 5).map (student => console.log(student.firstName));

    console.log("2.All male student full names who live in Skopje and are over 18 years old:");
    data.filter(element => element.gender === "Male" && element.city === "Skopje" && element.age > 18).map (student => console.log(student.firstName + " " + student.lastName));

    console.log("3.The average grades of all female students over the age of 24:");
    let femaleStudents = data.filter(element => element.gender === "Female" && element.age > 24);
    let grades = femaleStudents.map(element => element.averageGrade);
    let sum = grades.reduce((acc, curr) => acc += curr);
    let average = sum/grades.length;
    console.log(average);

    console.log("4.Sort the students according to Last name (ascending)");
    let ascendingData = data.map(element => element.lastName).sort((a,b) => a.localeCompare(b));
    console.log(ascendingData);

})

 

