let accessToken = "";
        let instanceUrl = "";

        function authenticate() {
            // Salesforce OAuth2 endpoint
            const url = "https://login.salesforce.com/services/oauth2/authorize?" +
                "response_type=token&" +
                "client_id=3MVG9wt4IL4O5wvIrDAEJFQDJvCD2CuxIBViCEsFByBvbpFQgRN1szQBNOS6T9Km0sDco92ms7crHktOaf5yZ&" +
                "redirect_uri=https://google.com";

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