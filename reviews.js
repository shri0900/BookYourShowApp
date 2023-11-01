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
}
