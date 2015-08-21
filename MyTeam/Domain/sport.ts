module App.Domain {
    export interface ISport {
        name: string;
        variants: string[];
    }

    export class Sport implements ISport {

        public constructor() {
        }

        name: string;
        variants: string[];
    }
} 