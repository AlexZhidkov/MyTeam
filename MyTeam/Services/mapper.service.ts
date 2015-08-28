module App.Common {
    angular.module("teamBuilder.mapperService", []);

    export interface IMapperService {
        daytimeToNumber(daytime: Domain.IDaytime): number;
        weekdayToNumber(weekday: Domain.IWeekday): number;
        domainPlayer(data: AngularFireSimpleObject): Domain.Player;
    }

    export class MapperService implements IMapperService {

        constructor() {
        }

        daytimeToNumber(daytime: Domain.IDaytime): number {
            return (daytime.morning ? 1 : 0) |
            (daytime.midday ? 2 : 0) |
            (daytime.evening ? 4 : 0);
        }

        weekdayToNumber(weekday: Domain.IWeekday): number {
            return (weekday.monday ? 1 : 0) |
            (weekday.tuesday ? 2 : 0) |
            (weekday.wednesday ? 4 : 0) |
            (weekday.thursday ? 8 : 0) |
            (weekday.friday ? 16 : 0) |
            (weekday.saturday ? 32 : 0) |
            (weekday.sunday ? 64 : 0);
        }

        domainPlayer(data: AngularFireSimpleObject): Domain.Player {
            var player = new Domain.Player();
            player.id = data.$id.valueOf();
            player.description = data["description"];
            player.sports = [];
            //ToDo finish
            return player;
        }
   }

    angular
        .module("teamBuilder.mapperService")
        .service("mapperService", App.Common.MapperService);
}