'use strict';
app.controller('DashBoardController', function ($rootScope, $scope) {
    $rootScope.title = "Trang chủ";
    $rootScope.dashboard = true;
    $scope.Link = function (link) {
        window.location = link;
    }
});