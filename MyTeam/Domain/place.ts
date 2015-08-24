module App.Domain {
    export interface IPlace {
        googleId: string;
        name: string;
    }

    export class Place implements IPlace {
        constructor(googleId: string, name: string) {
            this.googleId = googleId;
            this.name = name;
        }

        googleId: string;
        name: string;
    }
} 