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
        games: Domain.IGame[];
        sports: Domain.ISport[];
        places: Domain.IPlace[];

        choosenSport: Domain.ISport;
        choosenSportVariant: Domain.ISportVariant;
        choosenPlace: Domain.IPlace;
        description: string; 


        static $inject = ["$scope", "repository"];
        constructor(private $scope, private repository: App.Common.Repository) {
            var self = this;
            self.title = "Reports";
            self.description = "";

            //var place = repository.getPlace('ChIJN1t_tDeuEmsRUsoyG83frY4');
            //self.games = repository.getGames();
            repository.getPlaces("Perth")
                .then(data => {
                    self.places = data;
                }, error => {
                    console.log("Error getting places from repository", error);
                });
            repository.getPlace("ChIJswzMHEqlMioRq3D5C02BNFM")
                .then(data => {
                    var place = data;
                }, error => {
                    console.log("Error getting place from repository", error);
                });
            repository.getGames()
                .then(data => {
                self.games = data;
                }, error => {
                    console.log("Error getting games from repository", error);
                });
            repository.getSports()
                .then(data => {
                    self.sports = data;
                }, error => {
                    console.log("Error getting sports from repository", error);
                });

        }

        addNewGame() {
            var newGame = new Domain.NewGame();
            newGame.sport = this.choosenSport.name;
            newGame.variantId = this.choosenSportVariant.id;
            newGame.place = this.choosenPlace.googleId;
            newGame.description = this.description;

            this.repository.addGame(newGame);
        }
    }
    angular
        .module("teamBuilder.game", [])
        .controller("GameListCtrl", GameListCtrl);
} 
