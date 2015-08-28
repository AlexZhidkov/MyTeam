module App.Data {
    export interface IPlayer {
        sports: Data.ISport[];
        description: string;
        weekday: number;
        timeOfDay: number;
    }

    export class Player implements IPlayer {

        constructor() {

        }
        sports: Data.ISport[];
        description: string;
        weekday: number;
        timeOfDay: number;
    }
} 