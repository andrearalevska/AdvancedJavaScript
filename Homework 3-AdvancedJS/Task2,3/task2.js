
let currentPage = 1;
let table = document.getElementById("table");

function callApi (link){
     fetch(link)
     .then (function(response){
        return response.json(); 
     })
     .then (function(data){
         printPlanets(data);

     })
 }



 function printPlanets (apidata) {
 
    for (n = 0; n < 10; n++) {
        
        let planet = apidata.results[n];
        let planetName = planet.name;
        let population = planet.population;
        let climate = planet.climate;
        let gravity = planet.gravity;

        let row = table.insertRow();
        let nameCell = row.insertCell(0);
        let populationCell = row.insertCell(1);
        let climateCell = row.insertCell(2);
        let gravityCell = row.insertCell(3);
        
        nameCell.innerHTML = planetName;
        populationCell.innerHTML = population;
        climateCell.innerHTML = climate;
        gravityCell.innerHTML = gravity;
    }


}

let next = document.getElementById("next");
let previous = document.getElementById("previous");
let btn = document.getElementById("btn")

btn.addEventListener("click", function(){
    callApi("https://swapi.dev/api/planets/?page=1");
    btn.style.visibility = "hidden";
    next.style.visibility = "visible";

})

next.addEventListener("click", function(){
    previous.style.visibility = "visible";
    table.innerHTML="";
    table.innerHTML= "<tr>" +
    "<th>" + "Name" + "</th>"+
    "<th>" + "Population" + "</th>"+
    "<th>" + "Climate" + "</th>"+
    "<th>" + "Gravity" + "</th>"+
    "</tr>";
    currentPage +=1;
    callApi("https://swapi.dev/api/planets/?page=" + currentPage );

    if (currentPage == 6){
        next.style.visibility = "hidden";
    }

})

previous.addEventListener("click" , function(){
    next.style.visibility = "visible";
    table.innerHTML="";
    table.innerHTML= "<tr>" +
    "<th>" + "Name" + "</th>"+
    "<th>" + "Population" + "</th>"+
    "<th>" + "Climate" + "</th>"+
    "<th>" + "Gravity" + "</th>"+
    "</tr>";
    currentPage -= 1;
    callApi("https://swapi.dev/api/planets/?page=" + currentPage );

    if (currentPage == 1){
        previous.style.visibility = "hidden";
    }

})
