(function() {
    "use strict";

    function kToF(v) {
        return Math.round(((v * 9 / 5) - 459.67) * 10) / 10;
    }

    angular.module('angularSeed').controller('WxController', [
        '$scope',
        'WxService',
        function($scope, WxService) {
            $scope.loading = true;
            $scope.error = null;

            // WxService.getForecast returns a promise...
            WxService.getForecast(40.7127, -74.0059).then(function(data) {
                // the service returns temperature in degrees Kelvin!
                data.main.temp = kToF(data.main.temp);
                data.main.temp_min = kToF(data.main.temp_min);
                data.main.temp_max = kToF(data.main.temp_max);

                $scope.weather = data.weather;
                $scope.main = data.main;
                $scope.wind = data.wind;
                $scope.name = data.name;

                $scope.error = false;
                $scope.loading = false;
            }).catch(function(err) {
                $scope.error = "Ooops! Something went wrong!";
                $scope.loading = false;
            });
        }
    ]);
})();
