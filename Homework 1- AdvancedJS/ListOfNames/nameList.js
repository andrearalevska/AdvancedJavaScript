let btn = document.getElementById("btn");
let list = document.getElementById("list");

let names = ["Andrea", "Petar", "Petko", "Trpe", "Zoran"]

btn.addEventListener ("click", function(){
    for (i=0; i< names.length; i++){
    let item = document.createElement("li");
    item.innerText = names[i];
    list.appendChild(item);
    }
})
