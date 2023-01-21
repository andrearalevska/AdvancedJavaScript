function randomBgColor (){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let bgColor = `rgb(${r}, ${g}, ${b})`;

    document.body.style.background = bgColor;
    
    let colorName = document.getElementById("colorName");
    colorName.innerText = `rgb(${r}, ${g}, ${b})`;
    colorName.style.fontSize = "50px";
    colorName.style.fontWeight= "bold"
}

randomBgColor()

