let color = document.getElementById("color");
let fontSize = document.getElementById("fontSize");
let items = document.getElementById("items");
let submit = document.getElementById("submit");
let list = document.getElementById("list");

console.log(items.value)

submit.addEventListener("click", function(){
    event.preventDefault();

    let itemarray = items.value.split(",");

    let result = document.createElement("ul");
    result.style.color = color.value;
    result.style.fontSize = fontSize.value + "px";

    for(i=0; i < itemarray.length; i++){
        let item = document.createElement("li"); 
        item.innerText= itemarray[i] 
        result.appendChild(item);
    }
    list.appendChild(result);

})



