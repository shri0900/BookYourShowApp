// let accessToken = "";
// let instanceUrl = "";
function getURLParameter(name) {
return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

let accessToken = getURLParameter('access_token');
console.log("Access Token FROM Webpage>>>"+accessToken);
let instanceUrl = getURLParameter('instance_url');
console.log("Instance URl from webpage>>>"+instanceUrl);
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('instanceUrl', instanceUrl);

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


// fetch(`${instanceUrl}/services/apexrest/getPosters`, {
// method: 'GET',
// headers: {
//     'Authorization': `Bearer ${accessToken}`,
//     'Content-Type': 'application/json'
// }
// })
// .then(response => response.json())
// .then(data => {
// if (data) {
//     console.log("Data Received For Corolsol>>>"+JSON.stringify(data));
// // Reference to the carousel container
// var carouselContainer = document.getElementById('carouselExampleIndicators');

// // Reference to carousel indicators and inner elements
// var carouselIndicators = carouselContainer.querySelector('.carousel-indicators');
// var carouselInner = carouselContainer.querySelector('.carousel-inner');

// // Loop through the data to create indicators and carousel items
// data.forEach(function(item, index) {
// // Creating the indicator
// var indicator = document.createElement('li');
// indicator.setAttribute('data-target', '#carouselExampleIndicators');
// indicator.setAttribute('data-slide-to', index);
// if(index === 0) {
//     indicator.classList.add('active');
// }
// carouselIndicators.appendChild(indicator);

// // Extracting image src from the Concert_Poster__c string
// var imgTag = new DOMParser().parseFromString(item.Concert_Poster__c, 'text/html');
// var imgSrc = imgTag.querySelector('img').src;
// var imgAlt = imgTag.querySelector('img').alt;

// // Creating the carousel item
// var carouselItem = document.createElement('div');
// carouselItem.classList.add('carousel-item');
// if(index === 0) {
//     carouselItem.classList.add('active');
// }
// var imgElement = document.createElement('img');
// imgElement.classList.add('d-block', 'w-100');
// imgElement.setAttribute('src', imgSrc);
// imgElement.setAttribute('alt', imgAlt);
// carouselItem.appendChild(imgElement);

// carouselInner.appendChild(carouselItem);
// });


// }
// })
// .catch(error => {
// console.error('Error fetching concert images:', error);
// });


//}

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
    console.log("Data Received For Corolsol>>>"+JSON.stringify(data));
// Reference to the carousel container
const concertData = data;
const carouselContainer = document.getElementById('carouselExampleIndicators');
const carouselIndicators = carouselContainer.querySelector('.carousel-indicators');
const carouselInner = carouselContainer.querySelector('.carousel-inner');


// Loop through the data to create indicators and carousel items
concertData.forEach((item, index) => {
    // Creating the indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carouselExampleIndicators');
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
        indicator.classList.add('active');
    }
    carouselIndicators.appendChild(indicator);

    // Getting the image URL
    const imgSrc = item.Concert_Promotion_Image_Url__c;

    // Creating the carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
        carouselItem.classList.add('active');
    }
    const imgElement = document.createElement('img');
    imgElement.classList.add('d-block', 'w-100');
    imgElement.setAttribute('src', imgSrc);
    imgElement.setAttribute('alt', `Slide ${index + 1}`);
    carouselItem.appendChild(imgElement);

    carouselInner.appendChild(carouselItem);
});  
}
})
.catch(error => {
console.error('Error fetching concert images:', error);
});

});


document.getElementById('getConcert').addEventListener('click', function(event) {
event.preventDefault();

const token = accessToken; 
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



// For Search lookup component   

// document.addEventListener("DOMContentLoaded", function() {
// let resultsContainer = document.getElementById('results');
// document.getElementById('searchButton').addEventListener('click', function(event) {
//     event.preventDefault();
//     const toastLiveExample = document.getElementById('liveToast')
//     const token = accessToken; // Replace with your actual token
//     const instanceURL = instanceUrl; 
//     const lookupInput = document.getElementById('lookupInput').value; 


//     fetch(`${instanceURL}/services/apexrest/getConcerts/${lookupInput}`, {
//     method: 'GET',
//     headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//     }
//     })
//     .then(response => response.json())
//     .then(data => {
//     console.log("Data"+JSON.stringify(data))
//     resultsContainer.innerHTML = '';
//         let datareceived=[];
//         data=datareceived;
//     document.addEventListener('DOMContentLoaded', function() {
//         const toastLiveExample = document.getElementById('liveToast')


//         // Check the length of data
//         if (datareceived.length === 0) {
//           console.log("datareceived length>>." + datareceived.length);
//           const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    
//           // Show the toast automatically
//           toastBootstrap.show();
//           console.log("Toast shown automatically because data length is 0.");
//         }


//     else{
//  // Loop through the data and create card elements

//  data.forEach(item => {
//     let cardHtml = `
//         <div class="col-md-4"> <!-- Assuming you want 3 cards in a row -->
//             <div class="card mb-4">
    
//                 <div class="card-body">
//                     <h5 class="card-title">Concert Name:${item.Name}</h5>
//                     <p class="card-text">Date:${item.Date_of_Concert__c}</p>
//                     <p class="card-text">Venue:${item.Concert_Venue__c}</p>
//                     <p class="card-text">Price:(₹)${item.Price__c}</p>
//                     <img src="${item.Concert_Promotion_Image_Url__c}" alt="Taylor Swift" style="height: 200px; width: 100%; object-fit: cover;">

//                 </div>
//             </div>
//         </div>
//     `;

//     resultsContainer.innerHTML += cardHtml;

// });
// }

// })
// .catch(error => {
// console.error('Error:', error);
// });
// });
// });

// });

document.addEventListener("DOMContentLoaded", function() {
//let resultsContainer = document.getElementById('results');
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

    if (data.length === 0) {
        const toastLiveExample = document.getElementById('liveToast');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
        console.log("Toast shown automatically because data length is 0.");
    } else {
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
// resultsContainer.addEventListener('click', function(event) {
//     if (event.target.classList.contains('open-modal')) {
//         let concertId = event.target.getAttribute('data-id');
//         let concertName = event.target.getAttribute('data-name');
//         let concertDate = event.target.getAttribute('data-date');
//         let concertPrice=event.target.getAttribute('data-price');
//         // Populate the modal placeholders with the data
//         $('#concertName').text(concertName);
//         $('#concertDate').text(concertDate);
//         $('#concertPrice').text(concertPrice);
//         // Open the modal using Bootstrap's method
//         $('#bookingModal').modal('show');
//     }
// });

// });

// // Code to individual Records
// document.addEventListener("DOMContentLoaded", function() {
//     fetch(`${instanceUrl}/services/apexrest/getIndividuals/`, {
//         method: 'GET',
//         headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'application/json'
//         }
//         })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Drop Down Data"+JSON.stringify(data))
//         let dropdownMenu = document.querySelector(".dropdown-menu");
//         dropdownMenu.innerHTML = '';  // Clear existing items
//         data.forEach(individual => {
//             let li = document.createElement('li');
//             let button = document.createElement('button');
//             button.className = 'dropdown-item';
//             button.setAttribute('type', 'button');
//             button.textContent = individual.Name;
//             li.appendChild(button);
//             dropdownMenu.appendChild(li);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching individuals:', error);
//     });
// });



let resultsContainer = document.getElementById('results');
resultsContainer.addEventListener('click', function(event) {
if (event.target.classList.contains('open-modal')) {
    let concertId = event.target.getAttribute('data-id');
    let concertName = event.target.getAttribute('data-name');
    let concertDate = event.target.getAttribute('data-date');
    let concertPrice = event.target.getAttribute('data-price');

    // Populate the modal placeholders with the concert details
    $('#concertName').text(concertName);
    $('#concertDate').text(concertDate);
    $('#concertPrice').text(concertPrice);
    
    // Fetch and populate the individuals in the dropdown
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
        dropdownMenu.innerHTML = '';  // Clear existing items

    // Inside your fetch success callback:
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
        console.log("individualId: " + individualId);
        
        // Retrieve the concertId from the modal
        let concertId = $('#bookingModal').attr('data-concert-id');
        console.log("concertId: " + concertId);
        
        bookTicket(concertId, individualId);
    } else {
        console.error('No individual selected.');
    }
});



function bookTicket(concertId, individualId) {
    fetch(`${instanceUrl}/services/apexrest/bookTickets/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            concertId: concertId,
            individualId: individualId
        })
    })
    .then(response => response.json())
    console.log("Response for fetch reserve"+response)
    .then(data => {
        if (data && data.Id) {
            console.log('Ticket booked successfully with ID:', data.Id);
            // Optionally, close the modal or show a success message to the user
            $('#bookingModal').modal('hide');
        } else {
            console.error('Failed to book ticket.');
        }
    })
    .catch(error => {
        console.error('Error booking ticket:', error);
    });
}

//logout functionality code

document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", function() {
        // Perform the logout action by making a request to Salesforce's logout endpoint
        fetch(`${instanceUrl}/secur/logout.jsp`, {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            } 
        })
        .then(response => {
            if (response.status === 200) {
                // The logout request will log the user out, and the response status is typically 200 OK
                alert("You have been logged out!");
            } else {
                // Handle other response status codes here
                console.error("Logout failed with status: " + response.status);
            }
        })
        .catch(error => {
            console.error("Error during logout:", error);
        });
    });
});
function retrieveInstanceAndAccessToken() {
    // Retrieve the instanceUrl and accessToken from Local Storage
    let instanceUrl = localStorage.getItem('instanceUrl');
    let accessToken = localStorage.getItem('accessToken');
  
    // Check if they exist and are not null
    if (instanceUrl && accessToken) {
      // You can use the instanceUrl and accessToken for making API calls
      console.log("Instance URL from Local Storage: " + instanceUrl);
      console.log("Access Token from Local Storage: " + accessToken);
    } else {
      // Handle the case where they are not found in Local Storage
      // You might want to redirect the user to the login page or perform some other action.
      console.log("Instance URL and Access Token not found in Local Storage.");
    }
  }

  // Add an event listener to the "Review" page link
document.getElementById('indexLink').addEventListener('click', function (event) {
    // Prevent the default link behavior
    event.preventDefault();
  
    // Call the function to retrieve instanceUrl and accessToken
    retrieveInstanceAndAccessToken();
  
    // You can also add code to load the "Review" page content here.
  });
