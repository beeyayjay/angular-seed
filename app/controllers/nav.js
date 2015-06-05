(function() {
    "use strict";

    angular.module('angularSeed').controller('NavController', [
        '$scope',
        'NavModel',
        function($scope, NavModel) {
            $scope.model = new NavModel();
        }
    ]);
})();
