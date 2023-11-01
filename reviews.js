// Retrieve the values from local storage
let storedAccessToken = localStorage.getItem('accessToken');
let storedInstanceUrl = localStorage.getItem('instanceUrl');

// Check if the values exist and are not null
if (storedAccessToken && storedInstanceUrl) {
  // You can use storedAccessToken and storedInstanceUrl for making API calls
  console.log("Access Token from local storage: " + storedAccessToken);
  console.log("Instance URL from local storage: " + storedInstanceUrl);
}


  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-example'
  })