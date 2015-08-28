module App.Domain {
    export interface IDaytime {
        morning: boolean;
        midday: boolean;
        evening: boolean;
    }

    export class Daytime implements IDaytime {

        constructor() {
            this.morning = false;
            this.midday = false;
            this.evening = false;
        }

        morning: boolean;
        midday: boolean;
        evening: boolean;
    }
}  