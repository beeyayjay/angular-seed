(function() {
    "use strict";

    angular.module('angularSeed', ['ui.router', 'restangular']).config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('');

            $stateProvider.state('home', {
                url: '',
                templateUrl: 'views/home.html'
            }).state('wx', {
                url: '/wx',
                templateUrl: 'views/wx.html'
            }).state('other', {
                url: '/other',
                templateUrl: 'views/other.html'
            });
        }
    ]);
})();
