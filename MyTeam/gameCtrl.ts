module App.Game {
    angular.module("teamBuilder.game", []);

    interface IGameModel {
        title: string;
        games: Domain.IGame[];
        sports: Domain.ISport[];
        places: Domain.IPlace[];
    }

    class GameListCtrl implements IGameModel {
        title: string;
        localities: Domain.ILocality[];
        games: Domain.IGame[];
        sports: Domain.ISport[];
        places: Domain.IPlace[];

        daytime: Domain.IDaytime;
        weekday: Domain.IWeekday;

        choosenLocality: Domain.ILocality;
        choosenSport: Domain.ISport;
        choosenSportVariant: Domain.ISportVariant;
        choosenPlace: Domain.IPlace;
        description: string;
        placeGoogleId: string;

        static $inject = ["$scope", "repositoryService", "facebookService"];
        constructor(private $scope, private repositoryService: Common.Repository, private facebookService: Common.IFacebookService) {
            var self = this;
            self.title = "Reports";
            self.description = "";
            self.placeGoogleId = "";
            
            //facebookService.testAPI();

            repositoryService.getLocalities()
                .then(data => {
                    self.localities = data;
                    self.choosenLocality = data[0];

                    //ToDo update locality when changed
                    //var locality = "ChIJc9U7KdW6MioR4E7fNbXwBAU";
                    //repositoryService.setLocality(this.choosenLocality.id);
                }, error => {
                    console.log("Error getting places from repository", error);
                });

            repositoryService.getSports()
                .then(data => {
                    self.sports = data;
                    self.choosenSport = data[0];
                    self.choosenSportVariant = data[0].variants[0];
                }, error => {
                    console.log("Error getting sports from repository", error);
                });
            /*
                        repositoryService.getPlace("ChIJswzMHEqlMioRq3D5C02BNFM")
                            .then(data => {
                                var place = data;
                            }, error => {
                                console.log("Error getting place from repository", error);
                            });
                        repositoryService.getPlayer("ChIJc9U7KdW6MioR4E7fNbXwBAU", "-JxmUTfgatvRIZ59oD5W")
                            .then(data => {
                                var player = data;
                            }, error => {
                                console.log("Error getting player from repository", error);
                            });
                        repositoryService.getPlayers("ChIJc9U7KdW6MioR4E7fNbXwBAU", "Football")
                            .then(data => {
                                var player = data;
                            }, error => {
                                console.log("Error getting player from repository", error);
                            });
                        repositoryService.getGames()
                            .then(data => {
                                self.games = data;
                            }, error => {
                                console.log("Error getting games from repository", error);
                            });
                        */
        }

        addNewGame() {
            var newGame = new Domain.NewGame();
            newGame.sport = this.choosenSport.name;
            newGame.variantId = this.choosenSportVariant.id;
            newGame.place = this.placeGoogleId;
            newGame.description = this.description;

            //this.repositoryService.addGame(newGame);
        }

        addNewPlayer() {
            var newPlayer = new Domain.Player();
            newPlayer.description = "az description 1";
            newPlayer.timeOfDay = this.daytime;
            newPlayer.weekday = this.weekday;

            this.repositoryService.addPlayer(newPlayer);
        }

    }
    angular
        .module("teamBuilder.game", [])
        .controller("GameListCtrl", GameListCtrl);
} 
