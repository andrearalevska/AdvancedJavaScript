let color = document.getElementById("color");
let fontSize = document.getElementById("fontSize");
let text = document.getElementById("text");
let submit = document.getElementById("submit");
let begining = document.getElementById("begining")

submit.addEventListener("click", function(){
    event.preventDefault();

    let header = document.createElement("h1");
    header.style.textAlign = "center";
    header.style.color = color.value;
    header.style.fontSize = fontSize.value + "px";
    header.innerText = text.value;

    begining.appendChild(header);
})