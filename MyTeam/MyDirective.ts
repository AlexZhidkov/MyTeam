module App.Game {
    angular.module("teamBuilder");

    class MyDirective {
//    public restrict: {"E"};
        public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public template = '<div>az test</div>';
        public scope = {};

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