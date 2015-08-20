/// <reference path="Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="Scripts/typings/firebase/firebase.d.ts"/>
//angular.module("productManagement", ["firebase", "ngMaterial"]);
module App {
    angular
        .module("teamBuilder", ["teamBuilder.services", "firebase"]);
}
