// Function to make an API call to Salesforce and display the reviews on the UI
function fetchAndDisplayReviews(instanceUrl, accessToken) {
  // Construct the REST API URL for your Salesforce RESTful method
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
      // Handle the data received from the API call
      // You can update your UI to display the reviews here
      console.log("Reviews Data:", JSON.stringify(data));


      // Reference to the Scrollspy container
  const scrollspyContainer = document.querySelector('.scrollspy-example');
  
  // Iterate through the reviews data and create the content
  data.forEach((review, index) => {
    // // Create an anchor link for the navigation menu
    const navLink = document.createElement('a');
    navLink.className = 'nav-link';
    navLink.href = `#scrollspyHeading${index + 1}`;
   // navLink.textContent = `Review ${index + 1}`;
  
    // Create a Scrollspy heading for each review
    const heading = document.createElement('h4');
    heading.id = `scrollspyHeading${index + 1}`;
    heading.textContent = review.Name;
  
    // Create a paragraph for the detailed review content
    const reviewContent = document.createElement('p');
    reviewContent.innerHTML = review.Detailed_Review__c;
  
    // Append the elements to the Scrollspy container
    scrollspyContainer.appendChild(heading);
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




// Add an event listener to the "Review" page link
document.getElementById('reviewLink').addEventListener('click', function (event) {
  // Prevent the default link behavior
  event.preventDefault();

  // Retrieve the instanceUrl and accessToken from Local Storage
  let instanceUrl = localStorage.getItem('instanceUrl');
  let accessToken = localStorage.getItem('accessToken');

  // Check if they exist and are not null
  if (instanceUrl && accessToken) {
      // Call the function to fetch and display reviews
      fetchAndDisplayReviews(instanceUrl, accessToken);
      populateIndividuals(instanceUrl,accessToken);

  } else {
      // Handle the case where instanceUrl and accessToken are not found
      console.log("Instance URL and Access Token not found in Local Storage.");
  }
});

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