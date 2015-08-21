module App.Domain {
    export interface ISport {
        name: string;
        variants: SportVariant[];
    }

    export class Sport implements ISport {

        public constructor() {
        }

        name: string;
        variants: SportVariant[];
    }
} 