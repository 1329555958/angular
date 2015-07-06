/**
 * Created by weichunhe on 2015/7/6.
 */
var ROOT = '/demo/', BASE = ROOT + 'js/', LIB = ROOT + 'lib/js/';
requirejs.config({
    baseUrl: BASE
    , paths: {
        angular: LIB + 'angular.min'
        , animate: LIB + 'angular-animate.min'
        , route: LIB + 'angular-route.min'
        , extend: LIB + 'angular-extend'
        , datepicker: LIB + 'bootstrap-datetimepicker.min'
        , jq: LIB + 'jquery-1.10.2'
        , app: LIB + 'app'

    }
    , shim: {
        angular: {
            deps: ['jq']
        },
        animate: {
            deps: ['angular']
        },
        route: {
            deps: ['angular']
        },
        extend: {
            deps: ['angular']
        },
        datepicker: {
            deps: ['jq']
        },
        app: {
            deps: ['animate', 'route','extend', 'datepicker']
        }
    }
})
;