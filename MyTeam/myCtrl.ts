module App.TeamBuilder {

    interface IMyCtrl {
        title: string;
    }

    class MyCtrl implements IMyCtrl {
        title: string;

        constructor() {
            this.title = "AZ test";
        }
    }

    angular
        .module("teamBuilder", ["teamBuilder.game", "teamBuilder.services", "firebase"])
        .controller("MyCtrl", MyCtrl);
}
