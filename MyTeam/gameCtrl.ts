module App.Game {
    import Sport = App.Domain.ISport;
    angular.module("teamBuilder.game", []);

    interface IGameModel {
        title: string;
        games: App.Domain.IGame[];
        sports: Sport[];
    }

    class GameListCtrl implements IGameModel {
        title: string;
        games: App.Domain.IGame[];
        sports: Sport[];

        static $inject = ["$scope", "repository"];
        constructor(private $scope, private repository: App.Common.Repository) {
            var self = this;
            self.title = "Reports";

            //self.games = repository.getGames();
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
    }
    angular
        .module("teamBuilder.game", [])
        .controller("GameListCtrl", GameListCtrl);
} 
