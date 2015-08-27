/// <reference path="Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="Scripts/typings/firebase/firebase.d.ts"/>
/// <reference path="Scripts/typings/firebase/firebase-simplelogin.d.ts"/>
/// <reference path="Scripts/typings/google.geolocation/google.geolocation.d.ts"/>
/// <reference path="Scripts/typings/googlemaps/google.maps.d.ts"/>
module App {
    var main = angular.module("teamBuilder", ["ngMaterial", "firebase", "ezfb", "teamBuilder.repositoryService", "teamBuilder.facebookService", "teamBuilder.game"]);

    function facebookConfig(ezfbProvider): void {
        ezfbProvider.setInitParams({
            appId: '1457114141263086',
            version: 'v2.4'
        });
    }

    main.config(facebookConfig);

    facebookConfig.$inject = ["ezfbProvider"];
}
