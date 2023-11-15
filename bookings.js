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
document.getElementById('bookingLink').addEventListener('click', function (event) {
    // Prevent the default link behavior
    event.preventDefault();
  
    // Call the function to retrieve instanceUrl and accessToken
    retrieveInstanceAndAccessToken();
  
    // You can also add code to load the "Review" page content here.
  });
  

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