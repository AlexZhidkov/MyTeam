module App.Game {
    angular.module("teamBuilder.game", []);

    interface IGameModel {
        title: string;
        games: App.Domain.IGame[];
        sports: string[];
    }

    class GameListCtrl implements IGameModel {
        title: string;
        games: App.Domain.IGame[];
        sports: string[];

        static $inject = ["$scope", "repository"];
        constructor(private $scope, private repository: App.Common.Repository) {
            var self = this;
            self.title = "Reports";

            self.games = repository.getGames();
            repository.getSports()
                .then(data => {
                self.sports = data;
                }, error => {
                    console.log("Error getting sports from repository", error);
                });

        }
    }
    angular
        .module("teamBuilder.game", [])
        .controller("GameListCtrl", GameListCtrl);
} 
