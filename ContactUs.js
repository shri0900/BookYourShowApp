let instanceUrl;
let accessToken;

function retrieveInstanceAndAccessToken() {
    // Retrieve the instanceUrl and accessToken from Local Storage
    instanceUrl = localStorage.getItem('instanceUrl');
    accessToken = localStorage.getItem('accessToken');

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

function submitCaseForm() {
    // Retrieve the form values
    let ticketNumber = document.getElementById('ticketNumber').value;
    let subject = document.getElementById('subject').value;
    let caseType = document.getElementById('caseType').value;

    // Make sure the required fields are not empty
    if (ticketNumber && subject && caseType) {
        // Call the function to retrieve instanceUrl and accessToken
        retrieveInstanceAndAccessToken();

        // Make an API call to create a case
        createCase(subject, ticketNumber, caseType);
    } else {
        console.error('Please fill in all required fields.');
    }
}

function createCase(subject, ticketNumber, caseType) {
    // Define the endpoint for creating a case
    let createCaseEndpoint = instanceUrl + '/services/apexrest/postcase/';

    // Prepare the request body
    let requestBody = {
        subject: subject,
        tickname: ticketNumber,
        cstype: caseType
    };

    // Make an API call to create a case
    fetch(createCaseEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.text()) //because we are expecting string response
        .then(caseNumber => {
            console.log("Case created successfully. Case Id:", caseNumber);

             // Display the case number as a notification
             showNotification('success', 'Case created successfully,Please Notedown Case Number For Future Reference. Case Number: ' + caseNumber);
            // Display the result or perform any other action
            document.getElementById('resultMessage').innerHTML = 'Case created successfully. Case Number: ' + caseNumber;
        })
        .catch(error => console.error('Error creating case:', error));
}

// Adding an event listener to the submit button
document.getElementById('createCaseForm').addEventListener('submit', function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Calling the function to submit the case form
    submitCaseForm();
});

// Add an event listener to the "Contact Us" link
document.getElementById('contactusLink').addEventListener('click', function (event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Calling the function to retrieve instanceUrl and accessToken
    retrieveInstanceAndAccessToken();
});

// Function to display notifications
function showNotification(type, message) {
    // Created a notification element
    let notification = document.createElement('div');
    notification.className = 'alert alert-' + type + ' alert-dismissible fade show';
    notification.innerHTML = '<strong>' + message + '</strong>' +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';

    // Append the notification to the body
    document.body.appendChild(notification);

    // Automatically close the notification after a few seconds (optional)
    setTimeout(function () {
        notification.remove();
    }, 5000);
}
