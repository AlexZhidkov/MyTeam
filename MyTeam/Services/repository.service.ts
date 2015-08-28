module App.Common {
    angular.module("teamBuilder.repositoryService", []);

    import Game = Domain.Game;
    import Promise = angular.IPromise;
    import Place = Domain.Place;
    import Sport = Domain.Sport;
    import SportVariant = Domain.SportVariant;
    import PlaceResult = google.maps.places.PlaceResult;

    export interface IRepository {
        getSports(): angular.IPromise<Sport[]>;
        addPlayer(player: Domain.IPlayer): void;
        getPlayer(locality: string, id: string): angular.IPromise<Domain.IPlayer>;
        getPlayers(locality: string, sport: string): angular.IPromise<Domain.IPlayer[]>;
    }

    export class Repository implements IRepository {
        private locality = "ChIJc9U7KdW6MioR4E7fNbXwBAU";
        private firebaseUrl = "https://teambuilder.firebaseio.com/";

        static $inject = ["$firebaseArray", "$firebaseObject", "$q", "$window"];
        constructor(private $firebaseArray: AngularFireArrayService, private $firebaseObject: AngularFireObjectService, private $q, private $window) {
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
                            sport.variants.push(new SportVariant(-1, "Any"));
                            for (let i = 0; i < 20; i++) {
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

        getLocalities(): Promise<Domain.ILocality[]> {
            var deferred = this.$q.defer();
            setTimeout(() => {
                deferred.notify("About to get localities.");
                var localitiesRef = new Firebase(this.firebaseUrl + "Localities");
                var localitiesArray = this.$firebaseArray(localitiesRef);
                localitiesArray.$loaded()
                    .then(list => {
                        var localities = new Array<Domain.Locality>();
                        list.forEach(localityFirebase => {
                            var googleId = localityFirebase.$id.valueOf();
                            this.getPlace(googleId)
                                .then(data => {
                                    var locality = new Domain.Locality(googleId, data.formatted_address);
                                    localities.push(locality);
                                }, error => {
                                    console.log("Error getting place from repository", error);
                                });
                        });
                        //ToDo Confirm that this returns all localities
                        deferred.resolve(localities);
                    })
                    .catch(error => {
                        console.log("Error:", error);
                    });
            }, 1000);
            return deferred.promise;
        }

        getPlace(placeId: string): Promise<PlaceResult> {
            var deferred = this.$q.defer();
            setTimeout(() => {
                deferred.notify("About to get place.");
                
                //ToDo is map needed?
                var map = new this.$window.google.maps.Map(document.getElementById('map'), {
                    center: { lat: -33.866, lng: 151.196 },
                    zoom: 15
                });

                var service = new this.$window.google.maps.places.PlacesService(map);
                service.getDetails({
                    placeId: placeId
                }, function (place, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        deferred.resolve(place);
                    } else {
                        console.log("PlacesServiceStatus Error:", status);
                    }
                });
            }, 1000);
            return deferred.promise;
        }

        addGame(locality: string, newGame: Domain.INewGame) {
            if (angular.isUndefined(locality) || locality === "") {
                console.log("Error: Locality is not defined");
                return;
            }
            var gamesRef = new Firebase(this.firebaseUrl + "Localities/" + locality + "/Games");
            var newGameRef = gamesRef.push(newGame);
        }

        addPlayer(player: Domain.IPlayer): void {
            var data = new Data.Player();
            data.description = player.description;
            var sport1 = new Data.Sport();
            sport1.name = "Football";
            sport1.variants = -1;
            data.sports = [sport1];

            var playersRef = new Firebase(this.firebaseUrl + "Localities/" + this.locality + "/Players");
            playersRef.push(data);

        }

        getPlayer(locality: string, id: string): angular.IPromise<Domain.IPlayer> {
            if (angular.isUndefined(this.locality) || this.locality === "") {
                console.log("Error: Locality is not defined");
                return null;
            }
            var deferred = this.$q.defer();
            setTimeout(() => {
                deferred.notify("About to get players.");
                var playerRef = new Firebase(this.firebaseUrl + "Localities/" + locality + "/Players/" + id);
                var playerObj = this.$firebaseObject(playerRef);
                playerObj.$loaded()
                    .then(data => {
                        deferred.resolve(this.domainPlayer(data));
                    })
                    .catch(error => {
                        console.log("Error getting players:", error);
                    });
            }, 1000);
            return deferred.promise;
        }

        getPlayers(locality: string, sport: string): angular.IPromise<Domain.IPlayer[]> {
            if (angular.isUndefined(this.locality) || this.locality === "") {
                console.log("Error: Locality is not defined");
                return null;
            }
            var deferred = this.$q.defer();
            setTimeout(() => {
                deferred.notify("About to get players.");
                var playersRef = new Firebase(this.firebaseUrl + "Localities/" + locality + "/Players");
                var playersArray = this.$firebaseArray(playersRef);
                playersArray.$loaded()
                    .then(list => {
                        var players = new Array<Domain.Player>();
                        list.forEach(playerData => {
                            players.push(this.domainPlayer(playerData));
                        });

                        deferred.resolve(players);
                    })
                    .catch(error => {
                        console.log("Error:", error);
                    });
            }, 1000);
            return deferred.promise;
        }

        private domainPlayer(data: AngularFireSimpleObject): Domain.Player {
            var player = new Domain.Player();
            player.id = data.$id.valueOf();
            player.description = data["description"];
            player.sports = [];
            //ToDo finish
            return player;
        }

    }

    angular
        .module("teamBuilder.repositoryService")
        .service("repositoryService", App.Common.Repository);
}