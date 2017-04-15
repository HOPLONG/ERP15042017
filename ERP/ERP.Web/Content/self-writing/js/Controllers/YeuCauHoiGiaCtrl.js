﻿app.controller('YeuCauHoiGiaCtrl', function ($scope, $http, YeuCauHoiGiaService, $timeout) {
    var purhienthoi = $('#purhienthoi').val();
    $scope.get_yeucau = function () {
        YeuCauHoiGiaService.get_yeucau().then(function (responseData) {
            $scope.list_yeucau = responseData;
        });
    };
    $scope.get_yeucau();


    //cẬP NHẬT PUR XỬ LÝ yêu cầu
    $scope.UpdateYeuCau = function (id) {

        $scope.YeuCau = {
            ID: id,
            PUR_XU_LY: purhienthoi
        }

        //Lưu vào CSDL

        $http({
            method: 'PUT',
            data: $scope.YeuCau,
            url: window.location.origin + '/api/Api_YeuCauHoiGia/' + id
        }).then(function successCallback(response) {
            confirm('Bạn vừa nhận 1 yêu cầu hỏi giá');
            $scope.get_yeucau();
        }, function errorCallback(response) {
            console.log(response);
            alert('Sự cố hệ thống, Bạn vui lòng kiểm tra kết nối Internet hoặc liên hệ với admin để được hỗ trợ ');
        });
    }
});