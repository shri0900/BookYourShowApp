let instanceUrl;
    let accessToken;

    function retrieveInstanceAndAccessToken() {
      instanceUrl = localStorage.getItem('instanceUrl');
      accessToken = localStorage.getItem('accessToken');

      if (instanceUrl && accessToken) {
        console.log("Instance URL from Local Storage: " + instanceUrl);
        console.log("Access Token from Local Storage: " + accessToken);
      } else {
        console.log("Instance URL and Access Token not found in Local Storage.");
      }
    }

    document.getElementById('bookingLink').addEventListener('click', function (event) {
      event.preventDefault();
      retrieveInstanceAndAccessToken();
      populateIndividuals(instanceUrl, accessToken);
    });

    document.getElementById('individualSelect').addEventListener('change', function () {
      const selectedValue = this.value;
      document.getElementById('selectedIndividualId').value = selectedValue;
    });

    document.getElementById('showHistoryButton').addEventListener('click', function () {
      const selectedIndividualId = document.getElementById('selectedIndividualId').value;

      if (selectedIndividualId) {
        fetch(`${instanceUrl}/services/apexrest/pastHistory/${selectedIndividualId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log("Booking History Data:", JSON.stringify(data));
            updateOffcanvasContent(data);
            historyOffcanvas.show();
          })
          .catch(error => {
            console.error('Error fetching booking history:', error);
          });
      } else {
        console.log("No individual selected.");
      }
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
          console.log("Individual Options Data:", JSON.stringify(data));
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

   // Assuming this is inside the function that updates offcanvas content
function updateOffcanvasContent(data) {
  const list = document.createElement('ul');
  list.classList.add('list-group');

  data.forEach(booking => {
    const listItem = document.createElement('li');
    const concertDate = new Date(booking.Concert__r.Date_of_Concert__c);

    listItem.textContent = `${booking.Name} - ${booking.Concert__r.Name} - ${concertDate.toLocaleDateString()} - ${booking.Price__c}`;
    list.appendChild(listItem);
  });

  const offcanvasBody = document.querySelector('.offcanvas-body');
  offcanvasBody.innerHTML = ''; // Clear previous content
  offcanvasBody.appendChild(list);

  // Other code for showing the offcanvas as needed
}
