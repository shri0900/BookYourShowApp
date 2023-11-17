// function retrieveInstanceAndAccessToken() {
//     // Retrieve the instanceUrl and accessToken from Local Storage
//     let instanceUrl = localStorage.getItem('instanceUrl');
//     let accessToken = localStorage.getItem('accessToken');
  
//     // Check if they exist and are not null
//     if (instanceUrl && accessToken) {
//       // You can use the instanceUrl and accessToken for making API calls
//       console.log("Instance URL from Local Storage: " + instanceUrl);
//       console.log("Access Token from Local Storage: " + accessToken);
//     } else {
//       // Handle the case where they are not found in Local Storage
//       // You might want to redirect the user to the login page or perform some other action.
//       console.log("Instance URL and Access Token not found in Local Storage.");
//     }
//   }

//   // Add an event listener to the "Review" page link
// document.getElementById('concertLink').addEventListener('click', function (event) {
//     // Prevent the default link behavior
//     event.preventDefault();
  
//     // Call the function to retrieve instanceUrl and accessToken
//     retrieveInstanceAndAccessToken();
  
//     // You can also add code to load the "Review" page content here.
//   });
function retrieveInstanceAndAccessToken() {
  // Retrieve the instanceUrl and accessToken from Local Storage
  let instanceUrl = localStorage.getItem('instanceUrl');
  let accessToken = localStorage.getItem('accessToken');

  // Check if they exist and are not null
  if (instanceUrl && accessToken) {
    // You can use the instanceUrl and accessToken for making API calls
    console.log("Instance URL from Local Storage: " + instanceUrl);
    console.log("Access Token from Local Storage: " + accessToken);

    // Make an API call to get upcoming shows
    fetch(instanceUrl + '/services/apexrest/getupcomingShows', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("Data Received for Upcoming Shows>>>"+JSON.stringify(data));
      // Call a function to render the upcoming shows as cards
      renderUpcomingShows(data);
    })
    .catch(error => console.error('Error fetching upcoming shows:', error));
  } else {
    // Handle the case where they are not found in Local Storage
    // You might want to redirect the user to the login page or perform some other action.
    console.log("Instance URL and Access Token not found in Local Storage.");
  }
}

function renderUpcomingShows(upcomingShows) {
  // Get the container where you want to append the cards
  let container = document.getElementById('upcomingShowsContainer');

  // Clear existing content before adding new cards
  container.innerHTML = '';

  // Loop through the upcoming shows and create a card for each
  upcomingShows.forEach(show => {
    // Create a new card element with Bootstrap classes
    let card = document.createElement('div');
    card.className = 'card mb-4 my-4'; // Added margin-bottom to create space between cards
    card.style = 'max-width: 300px;'; // Reduced max-width for a smaller card

    // Create an image element for the card with Bootstrap class
    let img = document.createElement('img');
    img.src = show.Show_Promotion_Image_URL__c; 
    img.className = 'card-img-top';
    img.alt = show.Name;
    img.style = 'max-height: 200px; object-fit: cover;'; // Set max-height and object-fit for smaller images

    // Create a card body element with Bootstrap class
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create a heading element for the card title with Bootstrap class
    let cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = show.Name;

    // Create a paragraph element for the card text with Bootstrap class
    let cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = show.Show_Venue__c; // You can customize this based on your needs

    // Append the elements to the card
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(img);
    card.appendChild(cardBody);

    // Append the card to the container
    container.appendChild(card);
  });
}



// Add an event listener to the "Review" page link
document.getElementById('concertLink').addEventListener('click', function (event) {
  // Prevent the default link behavior
  event.preventDefault();

  // Call the function to retrieve instanceUrl and accessToken
  retrieveInstanceAndAccessToken();

  // You can also add code to load the "Review" page content here.
});

  