(function() {
    "use strict";

    angular.module('angularSeed').controller('HomeController', [
        '$scope',
        'HomeModel',
        function($scope, HomeModel) {
            $scope.model = new HomeModel();
        }
    ]);
})();
