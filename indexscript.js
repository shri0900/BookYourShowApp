// let accessToken = "";
// let instanceUrl = "";
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

let accessToken = getURLParameter('access_token');
console.log("Access Token FROM Webpage>>>"+accessToken);
let instanceUrl = getURLParameter('instance_url');
console.log("Instance URl from webpage>>>"+instanceUrl);

// Now you can use accessToken and instanceUrl for further API calls


// function authenticate() {
// // Salesforce OAuth2 endpoint
// const url = "https://login.salesforce.com/services/oauth2/authorize?" +
// "response_type=token&" +
// "client_id=3MVG9wt4IL4O5wvIrDAEJFQDJvCD2CuxIBViCEsFByBvbpFQgRN1szQBNOS6T9Km0sDco92ms7crHktOaf5yZ&" +
// "redirect_uri=https://shri0900.github.io/BookYourShowApp/";

// window.location.href = url;
// }

// function parseReturnedHash() {
// const hash = window.location.hash.substring(1);
// const params = new URLSearchParams(hash);
// accessToken = params.get("access_token");
// instanceUrl = params.get("instance_url");
// if (accessToken && instanceUrl) {
// fetchConcertImages();  // New function to fetch the images
// }

// }

// window.onload = () => {
// parseReturnedHash();
// }

// function fetchConcertImages() {


fetch(`${instanceUrl}/services/apexrest/getPosters`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    if (data) {
        console.log("Data Received For Corolsol>>>"+JSON.stringify(data));
// Reference to the carousel container
var carouselContainer = document.getElementById('carouselExampleIndicators');

// Reference to carousel indicators and inner elements
var carouselIndicators = carouselContainer.querySelector('.carousel-indicators');
var carouselInner = carouselContainer.querySelector('.carousel-inner');

// Loop through the data to create indicators and carousel items
data.forEach(function(item, index) {
    // Creating the indicator
    var indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carouselExampleIndicators');
    indicator.setAttribute('data-slide-to', index);
    if(index === 0) {
        indicator.classList.add('active');
    }
    carouselIndicators.appendChild(indicator);
    
    // Extracting image src from the Concert_Poster__c string
    var imgTag = new DOMParser().parseFromString(item.Concert_Poster__c, 'text/html');
    var imgSrc = imgTag.querySelector('img').src;
    var imgAlt = imgTag.querySelector('img').alt;

    // Creating the carousel item
    var carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if(index === 0) {
        carouselItem.classList.add('active');
    }
    var imgElement = document.createElement('img');
    imgElement.classList.add('d-block', 'w-100');
    imgElement.setAttribute('src', imgSrc);
    imgElement.setAttribute('alt', imgAlt);
    carouselItem.appendChild(imgElement);
    
    carouselInner.appendChild(carouselItem);
});

        
    }
})
.catch(error => {
    console.error('Error fetching concert images:', error);
});


//}



document.getElementById('getConcert').addEventListener('click', function(event) {
event.preventDefault();

const token = accessToken; // Replace with your actual token
const instanceURL = instanceUrl; 
const cityName = document.getElementById('cityName').value; 


fetch(`${instanceURL}/services/apexrest/getConcerts/${cityName}`, {
method: 'GET',
headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}
})
.then(response => response.json())
.then(data => {
console.log("Data"+JSON.stringify(data))
if(data){
const concert=data[0];
document.getElementById('concert-date').textContent=concert.Date_of_Concert__c;
document.getElementById('concert-name').textContent = concert.Name;
document.getElementById('concert-type').textContent = concert.Concert_Type__c;
document.getElementById('concert-venue').textContent = concert.Concert_Venue__c;
document.getElementById('concert-price').textContent = concert.Price__c;
document.getElementById('concert-poster').innerHTML=concert.Concert_Poster__c;
console.log('Poster'+concert.Concert_Poster__c);
}

})
.catch(error => {
console.error('Error:', error);
});
});



//For Search lookup component   
document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    const token = accessToken; // Replace with your actual token
    const instanceURL = instanceUrl; 
    const lookupInput = document.getElementById('lookupInput').value; 
    
    
    fetch(`${instanceURL}/services/apexrest/getConcerts/${lookupInput}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(data => {
    console.log("Data"+JSON.stringify(data))
    if(data){
    console.log("data for lookup>>"+JSON.stringify(data))
    }
    
    })
    .catch(error => {
    console.error('Error:', error);
    });
    });
    
