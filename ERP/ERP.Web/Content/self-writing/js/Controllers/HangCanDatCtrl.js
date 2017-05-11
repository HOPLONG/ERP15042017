app.controller('HangCanDatCtrl', function (HangCanDatService, $http, $scope) {
    var username = $('#username').val();
    var isadmin = $('#isadmin').val();
    $scope.load_hangcandat = function () {
        $http.get('/api/Api_HangCanDat/GetHangCanDat/' + isadmin + '/' + username).then(function (response) {
            $scope.list_hangcandat = response.data;
        });
    };
    $scope.load_hangcandat();


    // List hang can dat kinh doanh
    $http.post('/api/Api_HangCanDatKinhDoanh/ListHangCanDat/' + isadmin + '/' + username).then(function (response) {
        $scope.list_hangcandat_kinhdoanh = response.data;
    });
    // List hang can dat chua dat
    $http.post('/api/Api_HangCanDatKinhDoanh/ListHangCanDatChuaDat/' + isadmin + '/' + username).then(function (response) {
        $scope.list_hangcandatchuadat_kinhdoanh = response.data;
    });
    // List hang can dat da dat
    $http.post('/api/Api_HangCanDatKinhDoanh/ListHangCanDatDaDat/' + isadmin + '/' + username).then(function (response) {
        $scope.list_hangcandatdadat_kinhdoanh = response.data;
    });
});