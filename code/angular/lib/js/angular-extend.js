/**
 * angular Js 扩展
 * Created by weichunhe on 2015/7/6.
 */
(function (window, angular, undefined) {
    'use strict';
    angular.module('ngExtend', ['ng']).
        provider('$require', function rq() {
            /**
             * 异步加载配置
             * @param deps 如果是单个依赖可以直接写名字,多个依赖使用数组,路径根据require配置
             * @returns {*}
             */
            this.require = function (deps) {
                if (angular.isString(deps)) {
                    deps = [deps];
                }
                return ['$rootScope', '$q', function ($rootScope, $q) {
                    var def = $q.defer();
                    require(deps, function () {
                        $rootScope.$apply(function () {
                            def.resolve();
                        });
                    });
                    return def.promise;
                }]
            }

            this.$get = function () {
                return this;
            }
        }).
    /**
     * 日期指令
     * <div my-date class="input-append date input-prepend">
         <span class="add-on">起始时间</span>
         <input class="uneditable-input" type="text" value="" ng-model="curDate"/>
         <span class="add-on"><i data-time-icon="icon-time" data-date-icon="icon-calendar"></i></span>
     </div>
     */
        directive('myDate', function ($parse) {
            return {
                restrict: 'AE'
                , replace: false
                , link: function (scope, element, attrs, controller) {
                    var $ipt = element.find('input');
                    var modelGetter = $parse($ipt.attr('ng-model'));
                    var modelSetter = modelGetter.assign;
                    element.datetimepicker({
                        format: 'yyyy-MM-dd',
                        maskInput: false,
                        pick12HourFormat: false,
                        language: 'ch'
                    });
                    element.bind('changeDate', function () {
                        modelSetter(scope, element.find('input').val());
                        scope.$digest();
                        /* 与上面两句 作用相同，$apply 会调用$digest 方法
                         scope.$apply(function(){
                         modelSetter(scope,element.find('input').val());
                         });
                         */
                    });
                }
            }
        }).
    /**
     * 分页指令
     * <pagination total-page="pagination.totalPage" current-page="pagination.currentPage"
                    on-select-page="query(page)"></pagination>
     */
        directive('pagination', function () {
            return {
                restrict: 'E'
                , replace: true
                , template: '<div class="pagination">                                         ' +
                '  <ul>                                                           ' +
                '    <li ng-class="{disabled:noPrev()}"><a href="#" ng-click="selectPage(1)"  title="首页">1</a></li>                                ' +
                '    <li ng-class="{disabled:noPrev()}"><a href="#" ng-click="prev()" title="上一页"><</a></li>                                ' +
                '    <li ng-repeat=" page in pages" ng-class="{active:isActive(page)}"><a href="javascript:void(0);" ng-click="selectPage(page)">{{page}}</a></li> ' +
                '    <li ng-class="{disabled:noNext()}"><a href="#" ng-click="next()" title="下一页">></a></li>                                ' +
                '    <li ng-class="{disabled:noNext()}"><a href="#" ng-click="selectPage(totalPage)"  title="尾页">{{totalPage}}</a></li>                                ' +
                '  </ul>                                                          ' +
                '</div>                                                           '

                , scope: {
                    totalPage: '='
                    , currentPage: '='
                    , onSelectPage: '&'
                },
                link: function (scope, element, attrs, controller) {
                    scope.$watch('currentPage', function (value) {
                        scope.pages = getPageItems(scope.totalPage, value, 10);
                        if (scope.currentPage > scope.totalPage) {
                            scope.currentPage = scope.totalPage;
                        }
                    });
                    scope.$watch('totalPage', function (value) {
                        scope.pages = getPageItems(value, scope.currentPage, 10);
                        if (scope.currentPage > value) {
                            scope.currentPage = value;
                        }
                    });
                    scope.isActive = function (page) {
                        return scope.currentPage === page;
                    }
                    scope.selectPage = function (page) {
                        if (page < 1) {
                            page = 1;
                        }
                        if (page > scope.totalPage) {
                            page = scope.totalPage;
                        }
                        if (!scope.isActive(page)) {
                            scope.currentPage = page;
                            scope.onSelectPage({page: scope.currentPage});
                        }
                    }
                    scope.prev = function () {
                        scope.selectPage(scope.currentPage - 1);
                    }
                    scope.next = function () {
                        scope.selectPage(scope.currentPage + 1);
                    }

                    scope.noPrev = function () {
                        return !(scope.currentPage > 1);
                    }
                    scope.noNext = function () {
                        return !(scope.currentPage < scope.totalPage);
                    }
                }
            }
        });

    /**
     * 获取length个要展示的页面span
     */
    function getPageItems(total, current, length) {
        var items = [];
        if (length >= total) {
            for (var i = 1; i <= total; i++) {
                items.push(i);
            }
        } else {
            var base = 0;
            //前移
            if (current - 0 > Math.floor((length - 1) / 2)) {
                //后移
                base = Math.min(total, current - 0 + Math.ceil((length - 1) / 2)) - length;
            }
            for (var i = 1; i <= length; i++) {
                items.push(base + i);
            }
        }
        return items;
    }

})(window, window.angular);
