module App.Domain {
    export interface ILocality {
        id: string;
        name: string;
    }

    export class Locality implements ILocality {
        constructor(id: string, name: string) {
            this.id = id;
            this.name = name;
        }

        id: string;
        name: string;
    }
} 