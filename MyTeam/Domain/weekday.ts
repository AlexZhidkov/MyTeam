module App.Domain {
    export interface IWeekday {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    }

    export class Weekday implements IWeekday {

        constructor() {
            this.monday = false;
            this.tuesday = false;
            this.wednesday = false;
            this.thursday = false;
            this.friday = false;
            this.saturday = false;
            this.sunday = false;

        }

        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    }
} 