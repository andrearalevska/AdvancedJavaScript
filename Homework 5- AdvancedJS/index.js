async function fetchData(cntry){
    let response =  await fetch("https://restcountries.com/v3.1/alpha/" + cntry);
    let data = response.json();
    return data;

}

async function displayBorders(cntry){
    let country = await fetchData(cntry);
    let borders = country[0].borders;
    let name = country[0].name.common;
    console.log(`Neighbours of ${name}:`);
    console.log(borders);
}

displayBorders('MKD');
displayBorders('ALB');
displayBorders('SRB');
displayBorders('CRO');



