module App.Data {
    export interface ISport {
        name: string;
        variants: number;
    }

    export class Sport implements ISport {

        public constructor() {
        }

        name: string;
        variants: number;
    }
} 