//Pages
let homePage = document.getElementById("homePage");
let beers = document.getElementById("beers");
let randomBeer = document.getElementById("randomBeer");


//Components
let navBar = document.getElementById("navBar");
let sortBy = document.getElementById("sortBy");
let pageSize = document.getElementById("pageSize");
let beerPostsContainer = document.getElementById("beerPostsContainer");
let fivePerPage = document.getElementById("fivePerPage");
let tenPerPage = document.getElementById("tenPerPage");
let twentyPerPage = document.getElementById("twentyPerPage");
let sortname = document.getElementById("sortname");
let alcPercentage = document.getElementById("alcPercentage");
let bitterness = document.getElementById("bitterness");
let mdBtn = document.getElementById("mdBtn");
let searchField = document.getElementById("searchField");
let randomContainer = document.getElementById("randomContainer");
let paginationList = document.getElementById("paginationList");

//Global variables
let baseUrl = "https://api.punkapi.com/v2";
let beerposts = [];
let pageCounter = 25;
let clickedPost = null;
let selectedFilter = null;
let clickedPage = 1;
let displayedBeers = [];


//Navigation links
let navHome = document.getElementById("navHome");
let navBeers = document.getElementById("navBeers");
let navRandom = document.getElementById("navRandom");


//Functions
function displayPage(show = [], hide = [], activate = [], deactivate = []) {
    show.forEach(element => element.style.display = "block");
    hide.forEach(element => element.style.display = "none");
    activate.forEach(element => element.classList.add("active"));
    deactivate.forEach(element => element.classList.remove("active"));
}

async function getContent(url, posts) {
    let response = await fetch(url);
    let data = await response.json();
    posts = data.map(bp => new Beer(bp.id, bp.image_url, bp.name, bp.tagline, bp.description, bp.abv, bp.ibu, bp.food_pairing));
    return posts;
}

function sortingFunc(_filter, posts) {
    if (_filter === null) posts;
    else if (_filter === "name") posts.sort((a, b) => a.beerName.localeCompare(b.beerName));
    else if (_filter === "alc") posts.sort((a, b) => a.beerAlcPercentage - b.beerAlcPercentage);
    else if (_filter === "bit") posts.sort((a, b) => a.beerBitterness - b.beerBitterness);
    return posts;
}

function displayBeers(posts, pageSize = pageCounter, _filter = null) {
    let showedPosts = posts;
    sortingFunc(_filter, posts);

    beerPostsContainer.innerHTML = "";

    for (let i = 0; i < pageSize; i++) {
        let bp = showedPosts[i];

        beerPostsContainer.innerHTML +=
            `<div class="card" h-25 style="width: 18rem;" id="element">
                <img src=${bp.beerPicture} class="card-img-top test" alt="...">
                <div class="card-body cardche">
                <div class="">
                    <h5 class="card-title">${bp.beerName.slice(0, 15)}</h5>
                    <p class="card-text">${bp.beerDescription.slice(0, 22) + " .."}</p>
                </div>
                <button  class="btn btn-primary mdBtn" id="${bp.beerId}">More Details</button>
                </div>
            </div>`;
    }

    let buttons = document.querySelectorAll('.mdBtn');

    buttons.forEach(button => {
        button.addEventListener('click', async (e) => {
            let beerId = Number(button.id);
            clickedPost = beerId;
            onMoreDetails(clickedPost, beerPostsContainer);
        });
    });
}

async function onMoreDetails(postId, container) {
    let array = await getContent(baseUrl + "/beers", beerposts);

    let beerPost = array.find(bp => bp.beerId === postId);

    container.innerHTML =
        `<div class="card" h-25 style="width: 68rem;" id="elementMD">
                 <img src= ${beerPost.beerPicture} class="card-img-top test" alt="...">
                 <div class="card-body cardche" id="textDiv">
                     <div class="">
                     <h5 class="card-title">${beerPost.beerName}</h5>
                     <p class="card-text">${beerPost.beerDescription}</p>
                     <hr/>
                     <p class="card-text"> ${beerPost.beerDetails}</p>
                     <p class="card-text">Alcohol Percentage: ${beerPost.beerAlcPercentage}</p>
                     <p class="card-text">Bitterness: ${beerPost.beerBitterness}</p>
                     <br/>
                     <p class="card-text"><b>Food Pairing</b>:<br/>${beerPost.beerFoodPairing}</p>
                     </div>                    
                 </div>
             </div>`;

    sortBy.style.display = "none";
    pageSize.style.display = "none";
    paginationList.style.display="none";

}

async function onSearch(term) {
    let array = await getContent(baseUrl + "/beers", beerposts);
    let filteredBeers = array.filter(post => post.beerName.toLowerCase().includes(term.toLowerCase()));

    displayPage([beers, navBar], [homePage, randomBeer], [navBeers], [navHome, navRandom]);
    displayBeers(filteredBeers, filteredBeers.length, null);
}

async function onRandomBeerClick() {
    let array = await getContent(baseUrl + "/beers", beerposts);
    let max = array[array.length - 1].beerId;
    let randomId = Math.floor(Math.random() * max) + 1;
    onMoreDetails(randomId, randomContainer);
}

function pagination(posts, postsPerPage) {
    let numberOfPages = posts.length / postsPerPage;
    paginationList.innerHTML = "";

    for (i = 1; i < numberOfPages + 1; i++) {
        paginationList.innerHTML += `<li class="pgNum" class="page-item"><a class="page-link" href="#">${i}</a></li>`;
    }

    let pages = document.querySelectorAll(".pgNum");
    pages.forEach((button) => button.addEventListener("click", function () {
        let liValue = button.textContent;
        clickedPage = parseInt(liValue);
        getDataPerClickedPage(clickedPage, postsPerPage, selectedFilter);
    }))
}

async function getDataPerClickedPage(pageNumber, postsPerPage, _filter) {
    let posts = await getContent(baseUrl + "/beers", beerposts);
    sortingFunc(_filter, posts);
    
    let showedposts = posts.slice((pageNumber * postsPerPage) - postsPerPage, (pageNumber * postsPerPage));
    displayedBeers = showedposts;
    
    displayBeers(displayedBeers, pageCounter, _filter);
}



//Event Listeners
navHome.addEventListener("click", function () {
    displayPage([homePage, navBar], [beers, randomBeer, pageSize, sortBy], [navHome], [navBeers, navRandom]);
})

navBeers.addEventListener("click", async function () {
    pageCounter = 25;
    let posts = await getContent(baseUrl + "/beers");
    displayPage([beers, navBar, sortBy, pageSize], [homePage, randomBeer], [navBeers], [navHome, navRandom]);
    displayBeers(posts, pageCounter);

})

navRandom.addEventListener("click", function () {
    displayPage([randomBeer, navBar,], [homePage, beers], [navRandom], [navBeers, navHome]);
    onRandomBeerClick();
})

sortname.addEventListener("click", async () => {
    selectedFilter = "name";
    let beerposts = await getContent(baseUrl + "/beers");
    displayBeers(beerposts, pageCounter, "name");
})

alcPercentage.addEventListener("click", async () => {
    selectedFilter = "alc";
    let beerposts = await getContent(baseUrl + "/beers");
    displayBeers(beerposts, pageCounter, "alc");
})

bitterness.addEventListener("click", async () => {
    selectedFilter = "bit";
    let beerposts = await getContent(baseUrl + "/beers");
    displayBeers(beerposts, pageCounter, "bit");
})

fivePerPage.addEventListener("click", async () => {
    pageCounter = 5;
    let beerposts = await getContent(baseUrl + "/beers");

    pagination(beerposts, pageCounter);
    getDataPerClickedPage(clickedPage, pageCounter, selectedFilter);
})

tenPerPage.addEventListener("click", async () => {
    pageCounter = 10;
    let beerposts = await getContent(baseUrl + "/beers");
    
    pagination(beerposts, pageCounter);
    getDataPerClickedPage(clickedPage, pageCounter, selectedFilter);
})

twentyPerPage.addEventListener("click", async () => {
    pageCounter = 20;
    let beerposts = await getContent(baseUrl + "/beers");
    
    pagination(beerposts, pageCounter);
    getDataPerClickedPage(clickedPage, pageCounter, selectedFilter);
})

searchField.addEventListener("input", (e) => onSearch(e.target.value));


//PostsObject
function Beer(beerId, beerPicture, beerName, beerDescription, beerDetails, beerAlcPercentage, beerBitterness, beerFoodPairing) {
    this.beerId = beerId,
        this.beerPicture = beerPicture,
        this.beerName = beerName,
        this.beerDescription = beerDescription,
        this.beerDetails = beerDetails,
        this.beerAlcPercentage = beerAlcPercentage,
        this.beerBitterness = beerBitterness,
        this.beerFoodPairing = beerFoodPairing
}


//Onload
displayPage([homePage, navBar], [beers, randomBeer, pageSize, sortBy], [navHome], [navBeers, navRandom]);