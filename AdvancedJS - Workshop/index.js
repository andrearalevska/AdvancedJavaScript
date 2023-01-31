let person = document.getElementById("person");
let spaceShip = document.getElementById("spaceship")
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let table = document.getElementById("table")
let currentPage = 1;
let selectedAPI = "";


function callApiPerson (link){
        fetch(link)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            generateTablePerson (data);
        })
        

} 

function generateTablePerson (info){
    let thead = table.createTHead();
    let row = thead.insertRow();
    let heading1 = row.insertCell(0);
    let heading2 = row.insertCell(1);
    let heading3 = row.insertCell(2);
    let heading4 = row.insertCell(3);
    let heading5 = row.insertCell(4);
    let heading6 = row.insertCell(5);

    heading1.innerText = "Name";
    heading2.innerText = "Height";
    heading3.innerText = "Mass";
    heading4.innerText = "Gender";
    heading5.innerText = "Birth Year";
    heading6.innerText = "Appearances";

    for(n=0; n<10; n++){
        let character = info.results[n];
        let characterName = character.name;
        let characterHeight = character.height;
        let characterMass = character.mass;
        let characterGender = character.gender;
        let characterBirthYear = character.birth_year;
        let characterMovies = character.films.length;

        let table = document.getElementById("table");
        let row = table.insertRow();
        let nameCell= row.insertCell(0);
        let heightCell= row.insertCell(1);
        let massCell = row.insertCell(2);
        let genderCell = row.insertCell(3);
        let birthYearCell= row.insertCell(4);
        let appearencesCell = row.insertCell(5);

        nameCell.innerHTML = characterName;
        heightCell.innerHTML = characterHeight;
        massCell.innerHTML = characterMass;
        genderCell.innerHTML = characterGender;
        birthYearCell.innerHTML = characterBirthYear;
        appearencesCell.innerHTML = characterMovies;

    }
}

person.addEventListener("click", function(){
    currentPage = 1;
    selectedAPI= "person";
    table.innerHTML="";
    next.style.visibility = "visible";
    previous.style.visibility = "hidden";
    callApiPerson("https://swapi.dev/api/people/?page=1");
       
})


function callApiShip(url){
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        generateTableSpaceShip (data);
    })
}
  

function generateTableSpaceShip (info){
    
    let thead = table.createTHead();
    let row = thead.insertRow();
    let heading1 = row.insertCell(0);
    let heading2 = row.insertCell(1);
    let heading3 = row.insertCell(2);
    let heading4 = row.insertCell(3);
    let heading5 = row.insertCell(4);
    let heading6 = row.insertCell(5);

    heading1.innerText = "Name";
    heading2.innerText = "Model";
    heading3.innerText = "Manufacturer";
    heading4.innerText = "Cost";
    heading5.innerText = "People Capacity";
    heading6.innerText = "Class";


    for(n=0; n<10; n++){
        let ship = info.results[n];
        let shipName = ship.name;
        let shipModel = ship.model;
        let shipManufacturer = ship.manufacturer;
        let shipCost= ship.cost_in_credits;
        let shipCapacity = capacity(ship.crew, ship.passengers);
        let shipClass = ship.starship_class; 

        let table = document.getElementById("table");
        let row = table.insertRow();
        let nameCell= row.insertCell(0);
        let modelCell= row.insertCell(1);
        let manufacturerCell = row.insertCell(2);
        let costCell = row.insertCell(3);
        let capacityCell= row.insertCell(4);
        let classCell = row.insertCell(5);

        nameCell.innerHTML = shipName;
        modelCell.innerHTML = shipModel;
        manufacturerCell.innerHTML = shipManufacturer;
        costCell.innerHTML = shipCost
        capacityCell.innerHTML = shipCapacity;
        classCell.innerHTML = shipClass;
    }
}

spaceShip.addEventListener("click", function(){
    currentPage = 1;
    selectedAPI = "spaceShip";
    table.innerHTML="";
    callApiShip("https://swapi.dev/api/starships/?page=1")
    next.style.visibility = "visible";
    previous.style.visibility = "hidden";
    
})

next.addEventListener("click", function(){
    currentPage++;
    previous.style.visibility= "visible";
    table.innerHTML="";

    if(selectedAPI === "person"){
        callApiPerson("https://swapi.dev/api/people/?page=" + currentPage);

        if(currentPage === 9){
            next.style.visibility = "hidden";
        }
    }
    
    else if(selectedAPI === "spaceShip"){
        callApiShip("https://swapi.dev/api/starships/?page=" + currentPage)
        
        if(currentPage === 4){
            next.style.visibility = "hidden";
        }
    }

})

previous.addEventListener("click", function(){
    currentPage--;
    next.style.visibility= "visible";
    table.innerHTML="";
    
    if(selectedAPI === "person"){
        callApiPerson("https://swapi.dev/api/people/?page=" + currentPage);
    }
    
    else if(selectedAPI === "spaceShip"){
        callApiShip("https://swapi.dev/api/starships/?page=" + currentPage)
        
        if(currentPage === 1){
            previous.style.visibility = "hidden";
        }    
    }

})


function capacity (crew, passengers) {
    let result = 0;
   
  if(crew.includes(",")){
        if(passengers === "n/a" || passengers === "unknown"){
            result = parseInt(crew.replaceAll(",","")) + 0;
        }
        else if(passengers.includes(",")){
            result = parseInt(crew.replaceAll(",","")) + parseInt(passengers.replaceAll(",",""));
        }
        else {
            result = parseInt(crew.replaceAll(",","")) + parseInt(passengers);
        }
    }
    else if(passengers.includes(",")){
        if(crew === "n/a" || crew === "unknown"){
            result = parseInt(passengers.replaceAll(",","")) + 0;
        }
        else if(crew.includes(",")){
            result = parseInt(crew.replaceAll(",","")) + parseInt(passengers.replaceAll(",",""));
        }
        else {
            result = parseInt(passengers.replaceAll(",","")) + parseInt(crew);
        }
    }
    else if (crew.includes("-")){
        result = parseInt(crew.split("-").pop()) + parseInt(passengers);
    }
    else if (passengers.includes("-")){
        result = parseInt(passengers.split("-").pop()) + parseInt(crew);
    }
    else if(crew === "n/a" || crew === "unknown"){
        result = 0 + parseInt(passengers);
    }
    else if(passengers === "n/a" || passengers === "unknown"){
        result = 0 + parseInt(crew);
    }
    else {
        result = parseInt(crew) + parseInt(passengers); 
    }
    return result;
}