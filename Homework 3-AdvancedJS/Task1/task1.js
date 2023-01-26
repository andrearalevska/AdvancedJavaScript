let changeColor = (element, color) => {
    if(color.value == ""){
        element.style.color = "black";
    } else {
        element.style.color = color.value;
    }
}

let changeSize = (element, size) => {
    if(size.value == ""){
        element.style.fontSize = "24px";
    } else {
        element.style.fontSize = size.value + "px";
    }
}

let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    event.preventDefault()
    let header = document.getElementById("header");
    let fontSize = document.getElementById("fontSize");
    let fontColor = document.getElementById("fontColor");
    changeColor(header, fontColor);
    changeSize (header, fontSize);
})
