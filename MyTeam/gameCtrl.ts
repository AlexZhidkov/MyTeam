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

        choosenLocality: Domain.ILocality;
        choosenSport: Domain.ISport;
        choosenSportVariant: Domain.ISportVariant;
        choosenPlace: Domain.IPlace;
        description: string;
        placeGoogleId: string;

        static $inject = ["$scope", "repositoryService"];
        constructor(private $scope, private repositoryService: App.Common.Repository) {
            var self = this;
            self.title = "Reports";
            self.description = "";
            self.placeGoogleId = "";

            //var place = repositoryService.getPlace('ChIJN1t_tDeuEmsRUsoyG83frY4');
            //self.games = repositoryService.getGames();
            repositoryService.getLocalities()
                .then(data => {
                    self.localities = data;
                    self.choosenLocality = data[0];
                }, error => {
                    console.log("Error getting places from repository", error);
                });
            repositoryService.getPlaces("Perth")
                .then(data => {
                    self.places = data;
                }, error => {
                    console.log("Error getting places from repository", error);
                });
            repositoryService.getPlace("ChIJswzMHEqlMioRq3D5C02BNFM")
                .then(data => {
                    var place = data;
                }, error => {
                    console.log("Error getting place from repository", error);
                });
            repositoryService.getGames()
                .then(data => {
                    self.games = data;
                }, error => {
                    console.log("Error getting games from repository", error);
                });
            repositoryService.getSports()
                .then(data => {
                    self.sports = data;
                    self.choosenSport = data[0];
                    self.choosenSportVariant = data[0].variants[0];
                }, error => {
                    console.log("Error getting sports from repository", error);
                });

        }

        addNewGame() {
            var newGame = new Domain.NewGame();
            newGame.sport = this.choosenSport.name;
            newGame.variantId = this.choosenSportVariant.id;
            newGame.place = this.placeGoogleId;
            newGame.description = this.description;

            //var locality = "ChIJc9U7KdW6MioR4E7fNbXwBAU";
            this.repositoryService.addGame(this.choosenLocality.id, newGame);
        }
    }
    angular
        .module("teamBuilder.game", [])
        .controller("GameListCtrl", GameListCtrl);
} 
