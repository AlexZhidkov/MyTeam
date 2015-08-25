module App.Game {
    angular.module("teamBuilder");

    class MyDirective {
        restrict = 'E';
        replace = true;
        //link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        template = '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/>';
        scope = { location:'='};
        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            var input = <HTMLInputElement>(document.getElementById('google_places_ac'));
            //var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
            var autocomplete = new google.maps.places.Autocomplete(input, {});
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                //scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                scope["placeId"] = place.place_id;
                scope.$apply();
            });
        }

        constructor( /*list of dependencies*/) {
            // It's important to add `link` to the prototype or you will end up with state issues.
            // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
            MyDirective.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                /*handle all your linking requirements here*/
            };
        }

        public static Factory() {
            var directive = ( /*list of dependencies*/) => {
                return new MyDirective( /*list of dependencies*/);
            };

            //directive['$inject'] = ['/*list of dependencies*/'];

            return directive;
        }
    }

    angular.module('teamBuilder')
        .directive('myDirective', MyDirective.Factory());
}