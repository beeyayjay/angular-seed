(function() {
    "use strict";

    angular.module('angularSeed').directive('heroComponent', [function() {
        return {
            restrict: 'A',
            templateUrl: 'views/components/heroComponent.html'
        };
    }]);
})();
