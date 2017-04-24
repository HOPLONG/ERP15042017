app.controller('TonCacNoiCtrl', function (TonCacNoiService, $scope, $http) {
    var salehienthoi = $('#salehienthoi').val();

    $scope.edit = function (item) {
        $scope.ton = item;
    };


    $scope.datatonkho = function (machuan) {
        TonCacNoiService.get_dataton(machuan).then(function (a) {
            $scope.listtonkho = a;
        });
    };
    $scope.datatonkho('AT8');
    


    //Thêm mới yêu cầu
    $scope.addYeuCau = function () {

        $scope.YeuCau = {
            MA_HANG: $scope.ton.MA_HANG,
            MA_CHUAN: $scope.ton.MA_CHUAN,
            MA_KHACH_ORDER: $scope.ton.MA_KHACH_ORDER,
            THONG_SO: $scope.ton.THONG_SO,
            HANG: $scope.ton.MA_NHOM_HANG,
            SALES_YEU_CAU: salehienthoi,
            PUR_XU_LY: $scope.PUR_XU_LY,
            SO_LUONG: $scope.SO_LUONG,
            GHI_CHU: $scope.GHI_CHU
        }

        //Lưu vào CSDL

        $http({
            method: 'POST',
            data: $scope.YeuCau,
            url: window.location.origin + '/api/Api_YeuCauHoiGia'
        }).then(function successCallback(response) {
            alert('Bạn đã gửi đơn hỏi giá thành công');
        }, function errorCallback(response) {
            console.log(response);
            alert('Sự cố hệ thống, Bạn vui lòng kiểm tra kết nối Internet hoặc liên hệ với admin để được hỗ trợ ');
        });
    }

});
