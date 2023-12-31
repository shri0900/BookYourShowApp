
function getURLParameter(name) {
return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

//This is a JavaScript function that takes a single parameter name, which is the name of the URL parameter you want to retrieve.
//Inside the function, it uses regular expressions to search for
// the specified parameter in the location.search. location.search contains the query string of
// the current URL (the part of the URL that comes after the "?" character).
//The regular expression is used to find a match for the parameter 
//with its value, and it also handles various delimiters like "?" or "&" that can be present in the URL

//Retrieve the access token and instance URL from the URL parameters
let accessToken = getURLParameter('access_token');
let instanceUrl = getURLParameter('instance_url');

// Check if they are available in the URL parameters
if (accessToken && instanceUrl) {
    // Store the values in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('instanceUrl', instanceUrl);
//localStorage is a web storage mechanism that allows the application to store key-value pairs in the user's browser.
// In this case, the code stores the access token and instance URL in localStorage for later use.
    console.log("Access Token from URL parameter: " + accessToken);
    console.log("Instance URL from URL parameter: " + instanceUrl);
} else {
    // If not found in URL parameters, check if they are available in localStorage
    accessToken = localStorage.getItem('accessToken');
    instanceUrl = localStorage.getItem('instanceUrl');

    if (accessToken && instanceUrl) {
        console.log("Access Token from localStorage: " + accessToken);
        console.log("Instance URL from localStorage: " + instanceUrl);
    } else {
        // Handle the case where the values are not available
        console.log("Access Token and Instance URL not found.");
    }
}

document.getElementById('getConcert').addEventListener('click', function(event) {
event.preventDefault();

const token = accessToken; 
const instanceURL = instanceUrl; 
const cityName = document.getElementById('cityName').value; 

//Org Name - shriraj@sselectricals.co.in >>> Class Name- ConcertAPI >>>>
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
if (data.length > 0) {
    const concert = data[0];
    document.getElementById('concert-date').textContent = concert.Date_of_Concert__c;
    document.getElementById('concert-name').textContent = concert.Name;
    document.getElementById('concert-type').textContent = concert.Concert_Type__c;
    document.getElementById('concert-venue').textContent = concert.Concert_Venue__c;
    document.getElementById('concert-price').textContent = concert.Price__c;
    document.getElementById('concert-poster').innerHTML = concert.Concert_Poster__c;

    
  } else if(data.length===0) {
    
   // document.getElementById('no-concert').textContent='No Concerts Found';
   window.alert("No Concert Found");


  }
})
.catch(error => {
  console.error('Error:', error);
});
});






document.addEventListener("DOMContentLoaded", function() {
//let resultsContainer = document.getElementById('results');
const resultsContainer = document.getElementById('results');
const noDataAlert = document.getElementById('noDataAlert');
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
    resultsContainer.innerHTML = '';
    console.log("Data: " + JSON.stringify(data));
    console.log("Data length received"+data.length);
    if (data.length === 0 && Array.isArray(data)) {
     noDataAlert.style.display = 'block';
    } else {
        noDataAlert.style.display = 'none'
        data.forEach(item => {
            let cardHtml = `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">Concert Name: ${item.Name}</h5>
                            <p class="card-text">Date: ${item.Date_of_Concert__c}</p>
                            <p class="card-text">Venue: ${item.Concert_Venue__c}</p>
                            <p class="card-text">Price: (₹) ${item.Price__c}</p>
                            <img src="${item.Concert_Promotion_Image_Url__c}" alt="Taylor Swift" style="height: 200px; width: 100%; object-fit: cover;">
                            <br>
                            
                            <button class="btn btn-info open-modal mt-3"
                                    data-id="${item.Id}"
                                    data-name="${item.Name}"
                                    data-date="${item.Date_of_Concert__c}"
                                    data-price="${item.Price__c}">
                                Book Now!
                            </button>
                        
                        </div>
                    </div>
                </div>
            `;
            resultsContainer.innerHTML += cardHtml;
        });
    }
})
.catch(error => {
    console.error('Error:', error);
});
});
});


let resultsContainer = document.getElementById('results');
resultsContainer.addEventListener('click', function(event) {
if (event.target.classList.contains('open-modal')) {
    let concertId = event.target.getAttribute('data-id');
    let concertName = event.target.getAttribute('data-name');
    let concertDate = event.target.getAttribute('data-date');
    let concertPrice = event.target.getAttribute('data-price');

    // Populating the modal placeholders with the concert details
    // $('#concertName').text(concertName);
    // $('#concertDate').text(concertDate);
    // $('#concertPrice').text(concertPrice);


          document.getElementById('concertName').textContent = `Concert: ${concertName}`;
        document.getElementById('concertDate').textContent = `Date: ${concertDate}`;
        document.getElementById('concertPrice').textContent = `Price: $${concertPrice}`;
    
    // Fetching and populating the individuals in the dropdown
    fetch(`${instanceUrl}/services/apexrest/getIndividuals/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        let dropdownMenu = document.getElementById("individualDropdown");
        dropdownMenu.innerHTML = '';  

    // Inside  fetch success callback:
data.forEach(individual => {
let li = document.createElement('li');
let button = document.createElement('button');
button.className = 'dropdown-item';
button.setAttribute('type', 'button');
button.setAttribute('data-id', individual.Id); // Store the Id for future use
button.textContent = individual.Name;

li.appendChild(button);
document.getElementById('individualDropdown').appendChild(li);
});

    })
    .catch(error => {
        console.error('Error fetching individuals:', error);
    });

    // Open the modal using Bootstrap's method
    $('#bookingModal').modal('show');
    $('#bookingModal').attr('data-concert-id', concertId);
}
});

//For Reserve button

let selectedIndividualId;
document.getElementById('individualDropdown').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('dropdown-item')) {
        selectedIndividualId = event.target.getAttribute('data-id');
        // Optionally, update the dropdown button text to show the selected individual's name
        document.getElementById('individualDropdownButton').textContent = event.target.textContent;
    }
});

document.getElementById('modalBookButton').addEventListener('click', function() {
    if (selectedIndividualId) {
        let individualId = selectedIndividualId;
        let numSeats = parseInt($('#numSeats').val(), 10); 
        console.log("individualId: " + individualId);
        let promoCode = document.getElementById('prCode').value;
        console.log("Promo Code value"+promoCode);
        // Retrieve the concertId from the modal
        let concertId = $('#bookingModal').attr('data-concert-id');
        console.log("concertId: " + concertId);
        
        bookTicket(concertId, individualId,numSeats,promoCode);
    } else {
        console.error('No individual selected.');
    }
});

function bookTicket(concertId, individualId, numSeats, promoCode) {
    fetch(`${instanceUrl}/services/apexrest/bookTickets/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            concertId: concertId,
            individualId: individualId,
            numSeats: numSeats,
            promoCode: promoCode
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            
        }
        return response.json();
    })
    .then(data => {
        // Check if the response indicates success
        if (data && data.length > 0) {
            console.log('Ticket booked successfully with ID:', JSON.stringify(data));
            var ticketNumber = data[0].Name;
            $('#bookingModal').modal('hide');
            showNotification('success', 'Thank you for booking with us. You will receive an E-ticket on your Email ' + ticketNumber);
        } else {
            console.error('Failed to book ticket.');
        }
    })
    .catch(error => {
        console.error('Error booking ticket:', error);

        // Log additional details about the response
        console.log('Error response:', error.response);

        // Check if the error message contains the promo code validation error
        if (error.message.includes('FIELD_CUSTOM_VALIDATION_EXCEPTION')) {
            // Extract the custom error message from the response
            const errorMessage = JSON.parse(error.message)[0].message;
            showNotification('error', `Invalid promo code. ${errorMessage}`); // Display a user-friendly error message
        } else {
            showNotification('error', 'Error booking ticket: ' + error.message);
        }
    });
}





document.addEventListener("DOMContentLoaded", function() {
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
        console.log("Data Received For Corolsol second time>>>"+JSON.stringify(data));
    // Reference to the carousel container
    
    const carouselIndicators = document.getElementById('carouselIndicators2');
    const carouselInner = document.getElementById('carouselInner2');
    
    // Loop through the data to create indicators and carousel items
    data.forEach((item, index) => {
        // Create a carousel indicator
        const indicator = document.createElement('li');
        indicator.setAttribute('data-target', '#carouselExampleIndicators2');
        indicator.setAttribute('data-slide-to', index);
        if (index === 0) {
            indicator.classList.add('active');
        }
        carouselIndicators.appendChild(indicator);
    
        // Create a carousel item
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active');
        }
    
        // Create an image element
        const imgElement = document.createElement('img');
        imgElement.classList.add('d-block', 'w-100');
        imgElement.setAttribute('src', item.Concert_Promotion_Image_Url__c);
        imgElement.setAttribute('alt', `Slide ${index + 1}`);
    
        // Append the image to the carousel item
        carouselItem.appendChild(imgElement);
        carouselInner.appendChild(carouselItem);
    });
    }
    })
    .catch(error => {
    console.error('Error fetching concert images:', error);
    });
});

//Sign out functionality is tarting here

document.getElementById('logoutButton').addEventListener('click',function(event){

    //Remove Acess token and instance url so that no more API Calls Will Be Made

    localStorage.removeItem('accessToken');
    localStorage.removeItem('instanceUrl');

    //Redirect User To the github repository where login page has been stored

    window.location.href='https://shri0900.github.io/bookyourShowLogin/';
    //console.log("Acess Token"+accessToken);
    //console.log("Instance Url"+instanceUrl);
})

$(document).ready(function () {
    $('#profileLink').click(function () {
       $('#profileModal').modal('show');
    });
 });

 document.getElementById('profileLink').addEventListener('click',function(event){
    event.preventDefault();
    const token=accessToken;
    const instance_url=instanceUrl;

    const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));

    fetch(`${instance_url}/services/apexrest/getUser`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Data For Profile Modal Received",data);
        document.getElementById('profileImage').src = data.FullPhotoUrl;
        document.getElementById('userName').textContent = data.Name;
        document.getElementById('userEmail').textContent = data.Email;
        document.getElementById('username').textContent=data.Username;

        profileModal.show();
    })
    .catch(error => {
       console.error('Error:', error);
    });
});


// $(document).ready(function () {
//     $('#getConcert').click(function () {
//        $('#exampleModal').modal('show');
//     });
//  });

//  document.getElementById('profileLink').addEventListener('click',function(event){
//     event.preventDefault();
//     const token=accessToken;
//     const instance_url=instanceUrl;

//     const cityName = document.getElementById('cityName').value; 
//     const exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'));

//     fetch(`${instance_url}/services/apexrest/getConcerts/${cityName}`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//         })
//         .then(response => response.json())
//         .then(data => {
//             if(data.length>0){
//                 console.log("Data For Search Box"+data)
//                     document.getElementById('concert-date').textContent = concert.Date_of_Concert__c;
//     document.getElementById('concert-name').textContent = concert.Name;
//     document.getElementById('concert-type').textContent = concert.Concert_Type__c;
//     document.getElementById('concert-venue').textContent = concert.Concert_Venue__c;
//     document.getElementById('concert-price').textContent = concert.Price__c;
//     document.getElementById('concert-poster').innerHTML = concert.Concert_Poster__c;
        
//                 exampleModal.show();
//             }
//             else if(data.length===0){
//                 window.alert("No Concerts found in your city");
//             }
        
//     })
//     .catch(error => {
//        console.error('Error:', error);
//     });
// });


        
// function showNotification(type, message) {
//     // Created a notification element
//     let notification = document.createElement('div');
//     notification.className = 'alert alert-' + type + ' alert-dismissible fade show';
//     notification.innerHTML = '<strong>' + message + '</strong>' +
//         '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';

//     // Append the notification to the body
//     document.body.appendChild(notification);

//     // Automatically close the notification after a few seconds (optional)
//     setTimeout(function () {
//         notification.remove();
//     }, 5000);
// }

function showNotification(type, message) {
    // Created a notification element
    let notification = document.createElement('div');
    notification.className = 'alert alert-' + type + ' alert-dismissible fade show fixed-top mx-auto';
    notification.innerHTML = '<strong>' + message + '</strong>' +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';

    // Append the notification to the body
    document.body.appendChild(notification);

    // Automatically close the notification after a few seconds (optional)
    setTimeout(function () {
        notification.remove();
    }, 6000);
}
