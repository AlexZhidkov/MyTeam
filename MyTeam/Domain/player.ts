module App.Domain {
    export interface IPlayer {
        id: string;
        sport: ISport;
        description: string;
        weekday: number;
        timeOfDay: number;
    }

    export class Player implements IPlayer {

        constructor() {

        }

        id: string;
        sport: ISport;
        description: string;
        weekday: number;
        timeOfDay: number;
    }
} 