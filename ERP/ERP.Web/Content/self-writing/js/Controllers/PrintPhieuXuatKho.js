app.controller('PrintPhieuXuatKhoCtrl', function ($scope, $http) {
    //this gets the full url
    var url = document.location.href;
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    //return


    //hàm tìm kiếm
    $scope.getdataphieuxuatkho = function (sochungtu) {
        var so_luong = 0;
        var tong_tien = 0;
        $http.post(window.location.origin + '/api/Api_XuatKho/PrintPhieuXuatKho/' + sochungtu)
         .then(function (response) {
             if (response.data) {
                 $scope.thongtinbaogia = response.data;
                 $scope.thongtinchung = $scope.thongtinbaogia.ChungPhieuXuatKho;
                 $scope.thongtinchitiet = $scope.thongtinbaogia.ChiTietPhieuXuatKho;
             }
             for (i = 0; i < $scope.thongtinchitiet.length; i++) {
                 so_luong = so_luong + $scope.thongtinchitiet[i].SO_LUONG;
                 tong_tien = tong_tien + $scope.thongtinchitiet[i].THANH_TIEN
             }
             $scope.tongsoluong = so_luong;
             $scope.tong_tien = tong_tien;
         }, function (error) {
             console.log(error);
         })
    }
    $scope.getdataphieuxuatkho(url);
    $scope.CurrentDate = new Date();
    //$scope.getTotal = function () {
    //    var total = 0;
    //    for (var i = 0; i < $scope.thongtinchitiet.length; i++) {
    //        var product = $scope.thongtinchitiet[i];
    //        total += product.THANH_TIEN;
    //    }
    //    return total;
    //}



    $scope.printToCart = function (printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="styl  esheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();

    }


});
