(function() {
    "use strict";

    angular.module('angularSeed').factory('WxService', function(Restangular) {
        function WxService(Restangular) {
            /* Uncomment to use JSONP
            Restangular.setDefaultRequestParams('jsonp', { callback: 'JSON_CALLBACK' });
            Restangular.setJsonp(true);
             */

            this.client = Restangular.allUrl('wx', 'http://api.openweathermap.org/data/2.5/');
        }

        WxService.prototype.getForecast = function(lat, lon) {
            // returns a promise
            return this.client.one("weather").get({ lat: lat, lon: lon });
        };

        return new WxService(Restangular);
    });
})();
