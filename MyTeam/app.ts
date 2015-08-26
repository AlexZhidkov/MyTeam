/// <reference path="Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="Scripts/typings/firebase/firebase.d.ts"/>
/// <reference path="Scripts/typings/google.geolocation/google.geolocation.d.ts"/>
/// <reference path="Scripts/typings/googlemaps/google.maps.d.ts"/>
module App {
    var main = angular.module("teamBuilder", ["ngRoute", "ngMaterial", "firebase", "ezfb", "teamBuilder.repositoryService", "teamBuilder.facebookService", "teamBuilder.game"]);

    function routeConfig($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider
            .when("/",
                {
                    templateUrl: "mainView.html",
                    controller: "GameListCtrl as vm"
                })
            .when("/newGame",
                {
                    templateUrl: "addNewGameView.html",
                    controller: "GameListCtrl as vm"
                })
            .when("/player",
                {
                    templateUrl: "playerProfileView.html",
                    controller: "PlayerProfileCtrl as vm"
                })
            .otherwise("/");
    }

    function facebookConfig(ezfbProvider): void {
        ezfbProvider.setInitParams({
            appId: '1457114141263086',
            version: 'v2.4'
        });
    }

/*
    function facebookRun($rootScope, $window, sAuth): void {

        $rootScope.user = {};

        $window.fbAsyncInit = function () {
            // Executed when the SDK is loaded

            FB.init({ 

                /* 
                 The app id of the web app;
                 To register a new app visit Facebook App Dashboard
                 ( https://developers.facebook.com/apps/ ) 
                #1#

                appId: '***************', 

                /* 
                 Adding a Channel File improves the performance 
                 of the javascript SDK, by addressing issues 
                 with cross-domain communication in certain browsers. 
                #1#

                channelUrl: 'app/channel.html', 

                /* 
                 Set if you want to check the authentication status
                 at the start up of the app 
                #1#

                status: true, 

                /* 
                 Enable cookies to allow the server to access 
                 the session 
                #1#

                cookie: true, 

                /* Parse XFBML #1#

                xfbml: true
            });

            sAuth.watchAuthenticationStatusChange();

        };

        // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

        (function (d) {
            // load the Facebook javascript SDK

            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";

            ref.parentNode.insertBefore(js, ref);

        } (document));

    }
*/

    main.config(routeConfig);
    main.config(facebookConfig);
    //main.run(facebookRun);

    routeConfig.$inject = ["$routeProvider"];
    facebookConfig.$inject = ["ezfbProvider"];
    //facebookRun.$inject = ['$rootScope', '$window', 'srvAuth'];
}
