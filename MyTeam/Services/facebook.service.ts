module App.Common {
    angular.module("teamBuilder.facebookService", []);

    export interface IFacebookService {
//        getSports(): angular.IPromise<Sport[]>
    }

    export class FacebookService implements IFacebookService {

        static $inject = ["ezfb"];
        constructor(private ezfb) {
        }


   }
    
    angular
        .module("teamBuilder.facebookService")
        .service("facebookService", App.Common.FacebookService);
}