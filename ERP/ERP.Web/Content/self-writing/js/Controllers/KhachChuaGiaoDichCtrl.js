app.controller('KhachChuaGiaoDichCtrl', function (KhachChuaGiaoDichService, $scope) {
    var sales = $('#username').val();
    $scope.datakhachchuagiaodich = function (username) {
        KhachChuaGiaoDichService.get_dskhachchuagiaodich(username).then(function (a) {
            $scope.listkhachchuagiaodich = a;
        });
    };
    $scope.datakhachchuagiaodich(sales);
});
