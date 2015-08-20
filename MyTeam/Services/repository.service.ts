module App.Common {
    angular.module("teamBuilder.services", ["firebase"]);

    import Game = App.Domain.Game;
    import Promise = angular.IPromise;

    export interface IRepository {
        getSports(): angular.IPromise<string[]>
    }

    export class Repository implements IRepository {

        data: Promise<string>;
        obj: AngularFireObject;

        static $inject = ["$firebaseObject", "$q"];
        constructor(private $firebaseObject: AngularFireObjectService, private $q) {
            //this.data = "test";
            //var fb = new Firebase('https://teambuilder.firebaseio.com/Sports/0');
            //this.obj = $firebaseObject(fb);

            //this.data = $firebaseObject(fb).$value; 
            // service.users = $firebaseObject(usersRef).$loaded; 
/*
            data = $firebaseObject(fb);
            data.$loaded().then((d) => {
                alert(d.$value);

            });

            fb.child("id").on("value", snapshot => {
               alert(snapshot.val());  
               this.data = snapshot.val();
            });
*/
        }

        getGames(): Game[] {
            //var ref = new Firebase("https://teambuilder.firebaseio.com");
            //var data = this.$firebaseObject(ref);
            return [
                {
                    "id": 1,
                    "sport": "Snapshot"
                },
                {
                    "id": 1,
                    "sport": "Month To Date"
                }
            ];
        }

/*
        getSports(): string[] {
            var ret: string[];
            const sportsRef = new Firebase("https://teambuilder.firebaseio.com/Sports");
            sportsRef.once("value", snapshot => {
                ret = snapshot.val();
            });
            return ret;
        }
*/

        //https://docs-examples.firebaseio.com/web/data
        //https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject-loaded
        //https://docs.angularjs.org/api/ng/service/$q
        //http://andyshora.com/promises-angularjs-explained-as-cartoon.html
        //https://www.firebase.com/blog/2014-04-28-best-practices-arrays-in-firebase.html
        //https://www.firebase.com/docs/web/guide/understanding-data.html
        //https://www.firebase.com/docs/web/api/datasnapshot/

        getSports(): Promise<string[]> {
            var deferred = this.$q.defer();
            setTimeout(() => {
                deferred.notify("About to get sports.");
                var sportsRef = new Firebase("https://teambuilder.firebaseio.com/Sports");
                sportsRef.once("value", snapshot => {
                    deferred.resolve(snapshot.val());
                });
            }, 1000);
            return deferred.promise;

/*
            var fb = new Firebase('https://teambuilder.firebaseio.com/Sports');
            var sportsObject = this.$firebaseObject(fb);
            return sportsObject.$loaded()
                .then(sports => {
                        console.log('Data recieved at service', sports.val());
/*
                        sports.forEach(function (userSnap) {
                            console.log('user %s is in position %d with %d points', snap.key(), i++, snap.val());
                        });
/
                        return sports.$value;
                    }
                )
                .catch(error => {
                    console.error("Error:", error);
                    return this.$q.reject(error);
                });
            */
            //return null;
            //return this.data;
            //return { "az": "test" };
        }
    }

    angular
        .module("teamBuilder.services")
        .service("repository", Repository);
}