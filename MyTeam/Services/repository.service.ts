module App.Common {
    angular.module("teamBuilder.services", ["firebase"]);

    import Game = Domain.Game;
    import Promise = angular.IPromise;
    import Sport = Domain.Sport;

    export interface IRepository {
        getSports(): angular.IPromise<Sport[]>
    }

    export class Repository implements IRepository {

        data: Promise<string>;
        obj: AngularFireObject;

        static $inject = ["$firebaseArray", "$q"];
        constructor(private $firebaseArray: AngularFireArrayService, private $q) {
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

        //https://docs-examples.firebaseio.com/web/data
        //https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject-loaded
        //https://docs.angularjs.org/api/ng/service/$q
        //http://andyshora.com/promises-angularjs-explained-as-cartoon.html
        //https://www.firebase.com/blog/2014-04-28-best-practices-arrays-in-firebase.html
        //https://www.firebase.com/docs/web/guide/understanding-data.html
        //https://www.firebase.com/docs/web/api/datasnapshot/

        getSports(): Promise<Sport[]> {
            var deferred = this.$q.defer();
            setTimeout(() => {
                deferred.notify("About to get sports.");
                var sportsRef = new Firebase("https://teambuilder.firebaseio.com/Sports");
                var list = this.$firebaseArray(sportsRef);
                list.$loaded()
                    .then(x => {
                        var sports = new Array<Sport>();
                        x.forEach(sportFirebase => {
                            var sport = new Sport();
                            sport.name = sportFirebase.$id.valueOf();
                            sport.variants = new Array<string>();
                            for (var i = 0; i < 10; i++) {
                                if (angular.isUndefined(sportFirebase[i])) {
                                    break;
                                }
                                sport.variants.push(sportFirebase[i]);
                            };
                            sports.push(sport);
                        });

                        deferred.resolve(sports);
                    })
                    .catch(function (error) {
                        console.log("Error:", error);
                    });
/*
                sportsRef.once("value", snapshot => {
                    var sports: Sport[];
                    console.log('snapshot.val() ', snapshot.val());
                    snapshot.val().forEach(function (sport) {
                        console.log('key %s, val %s', sport.key(),sport.val());
                    });

                    deferred.resolve(snapshot.val());
                });
*/
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