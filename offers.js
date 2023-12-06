document.getElementById('offersLink').addEventListener('click', function (event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Calling the function to retrieve instanceUrl and accessToken
    retrieveInstanceAndAccessToken();
});

let instanceUrl;
let accessToken;

function retrieveInstanceAndAccessToken() {
    // Retrieve the instanceUrl and accessToken from Local Storage
    let instanceUrl = localStorage.getItem('instanceUrl');
    console.log("Instance Url REceived>>>  "+instanceUrl);
    let accessToken = localStorage.getItem('accessToken');
    console.log("Access token Received>>>  "+accessToken);

    // Check if they exist and are not null
    if (instanceUrl && accessToken) {
      // Make an API call to get offers data
      fetch(`${instanceUrl}/services/apexrest/getOffers/`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
        .then(response => response.json())
        .then(offersData => {
          // Call the function to render offers dynamically
          console.log("Offers Data"+JSON.stringify(offersData));
          renderOffers(offersData);
        })
        .catch(error => console.error('Error fetching offers data:', error));
    } else {
      console.log("Instance URL and Access Token not found in Local Storage.");
    }
  }

  // Function to render offers dynamically
  function renderOffers(offersData) {
    const container = document.getElementById('offers-container');
    container.innerHTML = ''; // Clear existing content

    offersData.forEach(offer => {
        
      const card = document.createElement('div');
      card.className = 'col';
      card.innerHTML = `
        <div class="card h-100">
          
          <img src="${offer.Offer_Poster_url__c}" class="card-img-top" alt="Offer Image" style="width: 300px; height: 300px;">

          <div class="card-body">
            <h5 class="card-title">${offer.Name}</h5>
            <p class="card-text">Discount: ${offer.Discount_Percentage__c}%</p>
            <p class="card-text">Expiring On: ${offer.Expiring_On__c}</p>
            <p class="card-text">Use Promo Code: ${offer.Promo_Code__c}</p>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  