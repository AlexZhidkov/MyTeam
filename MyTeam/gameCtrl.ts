module App.Game {
    angular.module("teamBuilder.game", []);

    interface IGameModel {
        title: string;
        games: App.Domain.IGame[];
        sports: string[];
        testGame: string[];
    }

    class GameListCtrl implements IGameModel {
        title: string;
        games: App.Domain.IGame[];
        sports: string[];
        testGame: string[];

        static $inject = ["repository"];
        constructor(private repository: App.Common.Repository) {
            this.title = "Reports";
            this.testGame = null;
            //var repo = new App.Common.Repository();
            /*
                        this.games = App.Common.Repository.getGames();
                        this.sports = App.Common.Repository.getSports();
                        this.data = App.Common.Repository.getData();
            */
            this.games = repository.getGames();
            this.sports = repository.getSports();
            var testGame1 = this.testGame;
            repository.getData()
                .then(function(data) {
                    // promise fulfilled
                    testGame1 = data;
                    console.log('Data recieced at game controller', data);
                }, error => {
                    // promise rejected, could log the error with: 
                    console.log('error', error);
                });

        }
    }
    angular
        .module("teamBuilder.game", [])
        .controller("GameListCtrl", GameListCtrl);
} 
