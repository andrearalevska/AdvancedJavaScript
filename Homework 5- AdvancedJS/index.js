async function displayBorders (code){
    
    let country = await fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(response => response.json());
    
    console.log(`Country: ${country[0].name.common}`)
    console.log(country[0]);
    console.log(`Neighbours of: ${country[0].name.common} `)
    neighbours = country[0].borders;
    
    for(neighbour of neighbours){
        
        let border = await fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`).then(response => response.json());
        
        console.log(`${border[0].name.common} :`)
        console.log(border[0])
    }
}



//displayBorders("MKD");
//displayBorders('ALB');
displayBorders('SRB');
//displayBorders('CRO');


