/// <reference path="Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="Scripts/typings/firebase/firebase.d.ts"/>
/// <reference path="Scripts/typings/google.geolocation/google.geolocation.d.ts"/>
/// <reference path="Scripts/typings/googlemaps/google.maps.d.ts"/>
module App {
    angular
        .module("teamBuilder", ["teamBuilder.services", "firebase"]);
}
