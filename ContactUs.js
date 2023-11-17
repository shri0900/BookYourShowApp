function retrieveInstanceAndAccessToken() {
    // Retrieve the instanceUrl and accessToken from Local Storage
    let instanceUrl = localStorage.getItem('instanceUrl');
    let accessToken = localStorage.getItem('accessToken');

    // Check if they exist and are not null
    if (instanceUrl && accessToken) {
      // Make an API call to get picklist values for Case Type
      fetch(instanceUrl + '/services/apexrest/postcase/', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => response.json())
      .then(picklistValues => {
        console.log("Picklist Values for Case Type:", picklistValues);
        // Populate the picklist values into the dropdown
        populatePicklistValuesDropdown(picklistValues);
      })
      .catch(error => console.error('Error fetching picklist values:', error));
    } else {
      // Handle the case where they are not found in Local Storage
      // You might want to redirect the user to the login page or perform some other action.
      console.log("Instance URL and Access Token not found in Local Storage.");
    }
  }

  function populatePicklistValuesDropdown(picklistValues) {
    // Get the select element for Case Type
    let caseTypeSelect = document.getElementById('caseType');

    // Clear existing options
    caseTypeSelect.innerHTML = '';

    // Populate options with picklist values
    picklistValues.forEach(value => {
      let option = document.createElement('option');
      option.value = value;
      option.text = value;
      caseTypeSelect.appendChild(option);
    });
  }

  // Add an event listener to the "Contact Us" link
  document.getElementById('contactusLink').addEventListener('click', function (event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Call the function to retrieve instanceUrl and accessToken
    retrieveInstanceAndAccessToken();
  });