/**
 * angular demo
 * Created by weichunhe on 2015/6/30.
 */

require(['app'], function () {
    console.info('index inited');
    app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngExtend']);
    //常量  基本页面路径
    app.constant('BASE_PATH', 'views/');
    // configure our routes
    app.config(function ($routeProvider, BASE_PATH, $controllerProvider, $requireProvider) {
        app.register = {
            controller: $controllerProvider.register
        }

        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl: BASE_PATH + 'hello.html'
            })
            .when('/table', {
                templateUrl: BASE_PATH + 'table.html'
                , resolve: {require: $requireProvider.require('table')}
            });
    }).controller('homeController', function ($scope, $rootScope) {
        //导航信息
        $rootScope.bread = [];
        $scope.curDate = '2015-06-12';
    });

    $(function () {
        angular.bootstrap(document, ['app']);
    })
});
console.info('index loaded')




