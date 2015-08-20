module App.Domain {
    export interface IGame {
        id: number;
        sport: string;
/*
        variant: string;
        weekday: number;
        timeOfDay: number;
        time: string;
        place: string;
*/
    }

    export class Game implements IGame {
        
        constructor() {
            
        }

        id: number;
        sport: string;
/*
        variant: string;
        weekday: number;
        timeOfDay: number;
        time: string;
        place: string;
*/
    }
} 