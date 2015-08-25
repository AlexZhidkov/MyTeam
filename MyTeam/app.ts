/// <reference path="Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="Scripts/typings/firebase/firebase.d.ts"/>
/// <reference path="Scripts/typings/google.geolocation/google.geolocation.d.ts"/>
/// <reference path="Scripts/typings/googlemaps/google.maps.d.ts"/>
module App {
    var main = angular.module("teamBuilder", ["ngRoute", "firebase", "teamBuilder.services", "teamBuilder.game"]);

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

    main.config(routeConfig);

    routeConfig.$inject = ["$routeProvider"];
}
