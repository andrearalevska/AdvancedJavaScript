document.getElementById("btn").addEventListener("click", function(){
    fetch("https://swapi.dev/api/vehicles/20")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        vehicleinfo(data);

    })
})

//Same with alax call

/*$(function(){
    document.getElementById("btn").addEventListener("click", function(){
        $.ajax({
            url:"https://swapi.dev/api/vehicles/20",
            success: function(response){
                console.log("Successful!!!");
                console.log(response);

                vehicleinfo(response);
            },
            error: function(response){
                console.log(response.status);
            }
        })        
    })
})*/

function vehicleinfo (info){
    let header = document.getElementById("header");
    let result = document.getElementById("result");

    header.innerText = info.name;
    vehicleArray = [];
    vehicleArray.push(info.model, info.manufacturer, info.crew, info.passengers, info.vehicle_class);

    for(n=0; n< vehicleArray.length; n++){
        let column = document.createElement("td");
        column.innerText = vehicleArray[n];
        result.appendChild(column);
        document.getElementById("btn").style.visibility = "hidden";
    }
}