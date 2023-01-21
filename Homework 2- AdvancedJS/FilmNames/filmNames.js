$(function(){
    document.getElementById("btn").addEventListener("click", function(){
        $.ajax({
            url: "https://swapi.dev/api/films",
            success: function(response){
                console.log("Successful!!");
                console.log(response)
           
                printMovies(response);
            },
            error: function(response) {
                console.log(response.status)
            } 
        })
    })
})


//Same with fetch

/*document.getElementById("btn").addEventListener("click", function(){
    fetch("https://swapi.dev/api/films")
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        console.log(data);
        printMovies(data);
    })
})*/



function printMovies (object){

    let list = document.getElementById("list");

    for (i=0; i < object.results.length; i++){
        let film = document.createElement("li");
        
        film.innerText = object.results[i].title;
        list.appendChild(film); 
       
    }

}