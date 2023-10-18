let accessToken = "";
let instanceUrl = "";

function authenticate() {
// Salesforce OAuth2 endpoint
const url = "https://login.salesforce.com/services/oauth2/authorize?" +
    "response_type=token&" +
    "client_id=3MVG9wt4IL4O5wvIrDAEJFQDJvCD2CuxIBViCEsFByBvbpFQgRN1szQBNOS6T9Km0sDco92ms7crHktOaf5yZ&" +
    "redirect_uri=https://shri0900.github.io/BookYourShowApp/";

window.location.href = url;
}

function parseReturnedHash() {
const hash = window.location.hash.substring(1);
const params = new URLSearchParams(hash);
accessToken = params.get("access_token");
instanceUrl = params.get("instance_url");
}

window.onload = () => {
parseReturnedHash();
}

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
   document.getElementById('concert-poster').textContent=concert.Concert_Poster__c;
   console.log('Poster'+concert.Concert_Poster__c);
    }

})
.catch(error => {
    console.error('Error:', error);
});
});

