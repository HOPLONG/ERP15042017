app.controller('TonCacNoiCtrl', function (TonCacNoiService, $scope) {
    $scope.datatonkho = function (machuan) {
        TonCacNoiService.get_dataton(machuan).then(function (a) {
            $scope.listtonkho = a;
        });
    };
    $scope.datatonkho('AT8');
    

});
