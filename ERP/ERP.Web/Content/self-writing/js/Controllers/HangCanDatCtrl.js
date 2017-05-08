app.controller('HangCanDatCtrl', function (HangCanDatService, $http, $scope) {
    var username = $('#username').val();
    var isadmin = $('#isadmin').val();
    $scope.load_hangcandat = function () {
        $http.get('/api/Api_HangCanDat/GetHangCanDat/' + isadmin + '/' + username).then(function (response) {
            $scope.list_hangcandat = response.data;
        });
    };
    $scope.load_hangcandat();
});