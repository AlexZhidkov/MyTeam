module App.Domain {
    export interface INewGame {
        sport: string;
        variantId: number;
        place: string;
        description : string;
/*
        weekday: number;
        timeOfDay: number;
        time: string;
*/
    }

    export interface IGame extends INewGame {
        id: string;
        variant: string;
    }


    export class Game implements IGame {

        constructor() {

        }

        id: string;
        sport: string;
        variantId: number;
        variant: string;
        place: string;
        description: string;
    }

    export class NewGame implements INewGame {
        
        constructor() {
            
        }

        sport: string;
        variantId: number;
        place: string;
        description: string;
    }
} 