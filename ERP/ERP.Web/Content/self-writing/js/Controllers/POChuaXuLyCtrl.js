app.controller('POChuaXuLyCtrl', function ($http, $scope, POChuaXuLyService) {
    var salehienthoi = $('#username').val();
    $scope.load_listPOchuaxuly = function () {
        POChuaXuLyService.get_list_pochuaxuly(salehienthoi).then(function (a) {
            $scope.list_pochuaxuly = a;
        });
    };
    $scope.load_listPOchuaxuly();
});