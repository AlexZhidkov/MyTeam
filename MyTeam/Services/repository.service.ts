module App.Common {
    angular.module("teamBuilder.services", ["firebase"]);

    import Game = Domain.Game;
    import Promise = angular.IPromise;
    import Sport = Domain.Sport;
    import SportVariant = Domain.SportVariant;

    export interface IGamesFirebase extends AngularFireSimpleObject {
        sport: string;
        variant: string;
        place: string;
        description: string;
    }

    export interface IRepository {
        getSports(): angular.IPromise<Sport[]>
    }

    export class Repository implements IRepository {

        data: Promise<string>;
        obj: AngularFireObject;

        private firebaseUrl = "https://teambuilder.firebaseio.com/";

        static $inject = ["$firebaseArray", "$q"];
        constructor(private $firebaseArray: AngularFireArrayService, private $q) {
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

        //https://github.com/casetext/fireproof
        //https://docs-examples.firebaseio.com/web/data
        //https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject-loaded
        //https://docs.angularjs.org/api/ng/service/$q
        //http://andyshora.com/promises-angularjs-explained-as-cartoon.html
        //https://www.firebase.com/blog/2014-04-28-best-practices-arrays-in-firebase.html
        //https://www.firebase.com/docs/web/guide/understanding-data.html
        //https://www.firebase.com/docs/web/api/datasnapshot/

        getGames(): Promise<Game[]> {
            var deferred = this.$q.defer();
            setTimeout(() => {
                deferred.notify("About to get games.");
                var gamesRef = new Firebase(this.firebaseUrl + "Games");
                var gamesArray = this.$firebaseArray(gamesRef);
                gamesArray.$loaded()
                    .then(list => {
                        var games = new Array<Game>();
                        list.forEach(gameFirebase => {
                            var game = new Game();
                            game.id = gameFirebase.$id.valueOf();
                            game.sport = gameFirebase["sport"];
                            game.variant = gameFirebase["variant"];
                            game.place = gameFirebase["place"];
                            game.description = gameFirebase["description"];
                            games.push(game);
                        });

                        deferred.resolve(games);
                    })
                    .catch(error => {
                        console.log("Error:", error);
                    });
            }, 1000);
            return deferred.promise;
        }

        getSports(): Promise<Sport[]> {
            var deferred = this.$q.defer();
            setTimeout(() => {
                deferred.notify("About to get sports.");
                var sportsRef = new Firebase(this.firebaseUrl + "Sports");
                var sportsArray = this.$firebaseArray(sportsRef);
                sportsArray.$loaded()
                    .then(list => {
                        var sports = new Array<Sport>();
                        list.forEach(sportFirebase => {
                            var sport = new Sport();
                            sport.name = sportFirebase.$id.valueOf();
                            sport.variants = new Array<SportVariant>();
                            for (var i = 0; i < 20; i++) {
                                if (angular.isUndefined(sportFirebase[i])) {
                                    break;
                                }
                                sport.variants.push(new SportVariant(i, sportFirebase[i]));
                            };
                            sports.push(sport);
                        });

                        deferred.resolve(sports);
                    })
                    .catch(error => {
                        console.log("Error:", error);
                    });
            }, 1000);
            return deferred.promise;
        }
    }
     
    angular
        .module("teamBuilder.services")
        .service("repository", Repository);
}