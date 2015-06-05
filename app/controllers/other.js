(function() {
    "use strict";

    angular.module('angularSeed').controller('OtherController', [
        '$scope',
        'OtherModel',
        function($scope, OtherModel) {
            $scope.model = new OtherModel();
        }
    ]);
})();
