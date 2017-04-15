
app.controller('TimKhachHangCtrl', function (TimKhachHangService, $scope) {
    $scope.timkiemkhachhang = function (sdt) {
        TimKhachHangService.find_khachhang(sdt).then(function (d) {
            $scope.danhsachkhachhang = d;
        });
    }
 

});