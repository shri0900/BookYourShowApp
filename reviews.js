// Remove any existing click event listeners on the "Review" page link
const reviewLink = document.getElementById('reviewLink');
const newReviewLink = reviewLink.cloneNode(true);
reviewLink.parentNode.replaceChild(newReviewLink, reviewLink);

// Add a new event listener to the "Review" page link
newReviewLink.addEventListener('click', function (event) {
  // Prevent the default link behavior
  event.preventDefault();

  // Retrieve the instanceUrl and accessToken from Local Storage
  let instanceUrl = localStorage.getItem('instanceUrl');
  let accessToken = localStorage.getItem('accessToken');

  // Check if they exist and are not null
  if (instanceUrl && accessToken) {
    // Call the function to fetch and display reviews
    fetchAndDisplayReviews(instanceUrl, accessToken);
    populateIndividuals(instanceUrl, accessToken);
    populateconcerts(instanceUrl, accessToken);
  } else {
    // Handle the case where instanceUrl and accessToken are not found
    console.log("Instance URL and Access Token not found in Local Storage.");
  }
});

// Function to make an API call to Salesforce and display the reviews on the UI
function fetchAndDisplayReviews(instanceUrl, accessToken) {
  
  const apiUrl = `${instanceUrl}/services/apexrest/getReviews`;

  // Make an HTTP GET request to the Salesforce REST API
  fetch(apiUrl, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      
      console.log("Reviews Data:", JSON.stringify(data));


      // Reference to the Scrollspy container
  const scrollspyContainer = document.querySelector('.scrollspy-example');
  scrollspyContainer.innerHTML = '';
  // Iterate through the reviews data and create the content
  data.forEach((review, index) => {
    const navLink = document.createElement('a');
    navLink.className = 'nav-link';
   // navLink.href = `#scrollspyHeading${index + 1}`;
    //navLink.textContent = `Review ${index + 1}`;

    // Create a Scrollspy heading for each review
    const heading = document.createElement('h4');
    heading.id = `scrollspyHeading${index + 1}`;
    heading.textContent = review.Name;

    // Create a paragraph for the detailed review content
    const reviewContent = document.createElement('p');
    reviewContent.innerHTML = review.Detailed_Review__c;

    // Create a paragraph to display the concert name
    const concertName = document.createElement('p');
    concertName.textContent = `Concert: ${review.Concert__r.Name}`;

    // Create a paragraph to display the concert Average Rating
    const averageRating = document.createElement('p');
    concertName.textContent = `Average Rating: ${review.Concert__r.Average_Rating__c}`;

    // Append the elements to the Scrollspy container
    scrollspyContainer.appendChild(heading);
    scrollspyContainer.appendChild(concertName);
    scrollspyContainer.appendChild(reviewContent);

    // Append the navigation link to the navigation menu
    document.querySelector('.nav').appendChild(navLink);
  });    
  })
  .catch(error => {
      console.error('Error fetching reviews:', error);
  });
}

//function get individuals




// // Add an event listener to the "Review" page link
// document.getElementById('reviewLink').addEventListener('click', function (event) {
//   // Prevent the default link behavior
//   event.preventDefault();

//   // Retrieve the instanceUrl and accessToken from Local Storage
//   let instanceUrl = localStorage.getItem('instanceUrl');
//   let accessToken = localStorage.getItem('accessToken');

//   // Check if they exist and are not null
//   if (instanceUrl && accessToken) {
//       // Call the function to fetch and display reviews
//       fetchAndDisplayReviews(instanceUrl, accessToken);
//       populateIndividuals(instanceUrl,accessToken);
//       populateconcerts(instanceUrl,accessToken);

//   } else {
//       // Handle the case where instanceUrl and accessToken are not found
//       console.log("Instance URL and Access Token not found in Local Storage.");
//   }
// });

//Function to get individual data for review card

function populateIndividuals(instanceUrl, accessToken) {
  const apiUrl = `${instanceUrl}/services/apexrest/getIndividuals`;

  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log("Individual Options  Data:", JSON.stringify(data));
      const individualSelect = document.getElementById('individualSelect');

      data.forEach(individual => {
        const option = document.createElement('option');
        option.value = individual.Id;
        option.textContent = individual.Name;
        individualSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching individuals:', error);
    });
}

// Add an event listener to the select element
document.getElementById('individualSelect').addEventListener('change', function () {
  const selectedValue = this.value;
  document.getElementById('selectedIndividualId').value = selectedValue;
});

//Function to get concert data for review card

function populateconcerts(instanceUrl,accessToken){
  const apiUrl=`${instanceUrl}/services/apexrest/getConcertsdata`;
  fetch(apiUrl,{
    method:'GET',
    headers:{
      'Authorization':`Bearer ${accessToken}`,
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.json())
  .then(data=>{
    console.log("Concerts Data",JSON.stringify(data));

    const concertselect=document.getElementById('concertSelect');
    data.forEach(concert=>{
      const option=document.createElement('option');
      option.value=concert.Id;
      option.textContent=concert.Name;
      concertselect.appendChild(option);
    });
  })
  .catch(error=>{
    console.log("Error Finding concerts"+error);
  });
}
document.getElementById('concertSelect').addEventListener('change', function () {
  const selectedValue = this.value;
  document.getElementById('selectedconcertId').value = selectedValue;
  console.log('Selected Value'+selectedValue)
  
});


document.getElementById('submitButton').addEventListener('click', function () {
 // console.log('Submit Button Clicked');
  // Retrieve the data from the input fields
  const reviewTitle = document.getElementById('formGroupExampleInput').value;
  const detailedReview = document.querySelector('textarea').value;
  const selectedRating = document.getElementById('ratingSelect').value;


  const reviewData = {
    Title: reviewTitle,
    DetailedReview: detailedReview,
    IndividualId: document.getElementById('selectedIndividualId').value,
    ConcertId: document.getElementById('selectedconcertId').value,
    Rating:selectedRating
  };
  console.log(reviewData);
  console.log("Selected ConcertId"+reviewData.ConcertId);
  console.log("Selected Individual"+reviewData.IndividualId);
  let instanceUrl = localStorage.getItem('instanceUrl');
  let accessToken = localStorage.getItem('accessToken');
  function createReview(instanceUrl, accessToken, reviewData) {
  const apiUrl = `${instanceUrl}/services/apexrest/getReviews/`; 
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Review created:", JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error creating review:', error);
      });
  }
  
  createReview(instanceUrl, accessToken, reviewData);

  function showBootstrapNotification(message, alertType) {
    const notificationContainer = document.getElementById('notificationContainer');

    // Create a new alert element
    const alert = document.createElement('div');
    alert.classList.add('alert', `alert-${alertType}`, 'alert-dismissible', 'fade', 'show');

    // Add the message to the alert
    alert.innerHTML = `<strong>${message}</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>`;

    // Append the alert to the container
    notificationContainer.appendChild(alert);

    // Automatically close the alert after 3 seconds (adjust as needed)
    setTimeout(() => {
      alert.classList.remove('show');
      alert.addEventListener('transitionend', () => {
        alert.remove();
      });
    }, 3000);
  }

  // Call the Bootstrap notification function after the review is successfully submitted
  showBootstrapNotification('Thanks For Review!!', 'success');
});
  

