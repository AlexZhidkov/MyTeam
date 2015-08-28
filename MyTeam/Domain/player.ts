module App.Domain {
    export interface IPlayer {
        id: string;
        sports: Domain.ISport[];
        description: string;
        weekday: number;
        timeOfDay: number;
    }

    export class Player implements IPlayer {

        constructor() {

        }

        id: string;
        sports: Domain.ISport[];
        description: string;
        weekday: number;
        timeOfDay: number;
    }
} 