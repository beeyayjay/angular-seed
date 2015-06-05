(function() {
    "use strict";

    angular.module('angularSeed').factory('NavModel', function() {
        function NavModel() {
            this.title = 'Seed';
            this.rightItems = [{
                displayOrder: 1,
                text: 'nyc wx',
                url: '/#/wx'
            }, {
                displayOrder: 2,
                text: 'Other',
                url: '/#/other'
            }];
        }

        return NavModel;
    });
})();
