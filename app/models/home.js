(function() {
    "use strict";

    angular.module('angularSeed').factory('HomeModel', function() {
        function HomeModel() {
            this.showHero = true;
            this.message = "This is your AngularJS seed web application!";
        }

        return HomeModel;
    });
})();
