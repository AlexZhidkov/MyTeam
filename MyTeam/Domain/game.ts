module App.Domain {
    export interface IGame {
        id: string;
        sport: string;
        variant: string;
        place: string;
        description : string;
/*
        weekday: number;
        timeOfDay: number;
        time: string;
*/
    }

    export class Game implements IGame {
        
        constructor() {
            
        }

        id: string;
        sport: string;
        variant: string;
        place: string;
        description: string;
    }
} 