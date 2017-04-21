app.controller('HangCanXuatCtrl', function ($http,$scope) {
    $scope.load_hangcanxuat = function () {
        return $http.get('/api/Api_HangCanXuat/GetBH_DON_HANG_PO').then(function (response) {
            $scope.list_hangcanxuat = response.data;
        });
    };
    $scope.load_hangcanxuat();
});