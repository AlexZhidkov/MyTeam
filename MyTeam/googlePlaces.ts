module App.Game {
    angular.module("teamBuilder");
    //See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#backtothebasics
    class GooglePlaces {
        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        restrict = "E";
        replace = true;
        //template = "<input id=\"google_places_ac\" name=\"google_places_ac\" type=\"text\" class=\"input-block-level\"/>";
        template = "<input id=\"google_places_ac\" name=\"google_places_ac\" />";
        scope = { location:"="};

        constructor( /*list of dependencies*/) {
            // It's important to add `link` to the prototype or you will end up with state issues.
            // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
            GooglePlaces.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                /*handle all your linking requirements here*/
                var input = <HTMLInputElement>(document.getElementById("google_places_ac"));
                var autocomplete = new google.maps.places.Autocomplete(input, {});
                google.maps.event.addListener(autocomplete, "place_changed", () => {
                    const place = autocomplete.getPlace();
                    scope["location"] = place.place_id;
                    scope.$apply();
                });
            }
        }

        public static factory() {
            var directive = ( /*list of dependencies*/) => {
                return new GooglePlaces( /*list of dependencies*/);
            };

            //directive['$inject'] = ['/*list of dependencies*/'];

            return directive;
        }
    }

    angular.module("teamBuilder")
        .directive("googlePlaces", GooglePlaces.factory());
}