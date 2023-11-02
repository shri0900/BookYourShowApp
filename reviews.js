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
      // Example: Update your UI to display the reviews data
      // document.getElementById('reviewsContainer').innerHTML = JSON.stringify(data, null, 2);
  })
  .catch(error => {
      console.error('Error fetching reviews:', error);
  });
}

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
  } else {
      // Handle the case where instanceUrl and accessToken are not found
      console.log("Instance URL and Access Token not found in Local Storage.");
  }
});

  