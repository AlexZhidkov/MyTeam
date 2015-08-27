module App.Common {
    angular.module("teamBuilder.facebookService", []);

    export interface IFacebookService {
        loginWithFacebook(): void;
        testAPI(): void;
    }

    var auth;
    var FB;
    export class FacebookService implements IFacebookService {

        static $inject = ["$firebaseAuth"];
        constructor(private $firebaseAuth) {
            //var ref = new Firebase("https://teambuilder.firebaseio.com");
            //auth = $firebaseAuth(ref);
        }

        loginWithFacebook(): void {
/*
            auth.$authWithOAuthPopup("facebook").then(function (authData) {
                console.log("Logged in as:", authData.uid);
            }).catch(function (error) {
                console.log("Authentication failed:", error);
            });
*/
        }

        testAPI(): void {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
            });
        }

    }

    angular
        .module("teamBuilder.facebookService")
        .service("facebookService", App.Common.FacebookService);
}