/**
 * Created by weichunhe on 2015/7/1.
 */

app.register.controller('tableController', function ($scope, $rootScope, $http) {
    $rootScope.bread = [{href: '/', text: '首页'}, {href: '/table', text: '产品信息列表'}];
    $scope.param = {};
    $scope.pagination = {totalPage: 1, currentPage: 1};
    //品类数据
    $scope.categories = [{value: '', text: '全部'}, {value: 1, text: '股权'}
        , {value: 2, text: '可转债'}, {value: 3, text: '长期债权'}
        , {value: 4, text: '中期债权'}, {value: 5, text: '短期债权'}];
    $scope.param.category = '';

    //状态数据
    $scope.status = [{value: 0, text: '报备'}, {value: 1, text: '审核中'}
        , {value: 2, text: '过审'}, {value: 3, text: '登记托管'}
        , {value: 4, text: '正常交易'}, {value: 5, text: '停牌'}
        , {value: 6, text: '转版'}, {value: 7, text: '下线'}
        , {value: 8, text: '已结束'}];
    $scope.isAllChecked = 1;
    $scope.allStatus = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    //全部 状态
    $scope.checkAll = function () {
        var t = $scope;
        if (t.isAllChecked == 1) {
            angular.forEach(t.status, function (st, i) {
                t.allStatus[i] = st.value;
            });
        } else {
            angular.forEach(t.status, function (st, i) {
                t.allStatus[i] = '-1';
            });
        }
    }
    //某个 状态改变
    $scope.statusChange = function (index) {
        var t = $scope;
        if (angular.isNumber(index)) {
            if (t.status[index].value != t.allStatus[index]) {
                t.isAllChecked = 0; //非全选
            } else {
                //判断是否是全选
                for (var i = 0; i < t.status.length; i++) {
                    if (t.status[i].value != t.allStatus[i]) {
                        t.isAllChecked = 0;
                        return;
                    }
                }
                t.isAllChecked = 1;
            }
        }
    }
    //查询
    $scope.query = function (currentPage) {
        if (angular.isNumber(currentPage)) {
            $scope.pagination.currentPage = currentPage;
            var result = tableData.get(makeParam());
            $scope.pagination.totalPage = result.totalPage;
            $scope.projects = result.rows;
        }
    }

    //构造查询参数
    function makeParam() {
        var param = {};
        var status = [];
        //状态
        angular.forEach($scope.allStatus, function (st) {
            if (st != '-1') {
                status.push(st);
            }
        });
        param.status = status.join();
        //分页
        angular.extend(param, $scope.pagination, $scope.param);
        return param;
    }
});

