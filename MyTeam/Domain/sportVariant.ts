module App.Domain {
    export interface ISportVariant {
        id: number;
        description: string;
    }

    export class SportVariant implements ISportVariant {
        constructor(id: number, description: string) {
            this.id = id;
            this.description = description;
        }

        id: number;
        description: string;
    }
} 