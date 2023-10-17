let accessToken = "";
        let instanceUrl = "";

        function authenticate() {
            // Salesforce OAuth2 endpoint
            const url = "https://login.salesforce.com/services/oauth2/authorize?" +
                "response_type=token&" +
                "client_id=3MVG9wt4IL4O5wvIrDAEJFQDJvCD2CuxIBViCEsFByBvbpFQgRN1szQBNOS6T9Km0sDco92ms7crHktOaf5yZ&" +
                "redirect_uri=https://shri0900.github.io/BookYourShowApp/";

            window.location.href = url;
        }

        function parseReturnedHash() {
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            accessToken = params.get("access_token");
            instanceUrl = params.get("instance_url");
        }

        window.onload = () => {
            parseReturnedHash();
        }

        document.getElementById('getConcert').addEventListener('click', function(event) {
            event.preventDefault();
            const token = accessToken; // Replace with your actual token
            const instanceURL = instanceUrl; 
            const concertName = document.getElementById('concertName').value; 
            
            fetch(`${instanceURL}/services/apexrest/getConcerts/${concertName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log("Data"+JSON.stringify(data))

                if (data) {
                    document.getElementById("modalbox").style.display = "block"; // Show element
                } else {
                    document.getElementById("modalbox").style.display = "none"; // Hide element
                }
                
               
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });