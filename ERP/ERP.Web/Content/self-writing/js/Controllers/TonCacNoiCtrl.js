﻿app.controller('TonCacNoiCtrl', function (TonCacNoiService, $scope, $http) {
    var salehienthoi = $('#salehienthoi').val();

    


    $scope.edit = function (item) {
        $scope.ton = item;
        $scope.item = item;
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
            SuccessSystem('Bạn đã gửi đơn hỏi giá thành công');
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Bạn vui lòng kiểm tra kết nối Internet hoặc liên hệ với admin để được hỗ trợ ');
        });
    }
    //-------------------------
    var macongty = $("#macongty").val();
    //Nhật ký hỏi hàng
    $scope.nhatkyhoihang = function (mahang) {
        var mact = macongty;
        //Lưu vào CSDL
        $http.get("/api/Api_XuLyYeuCauHoiGia/GetNhatKyHoiGia/" + mahang + "/" + mact)
           .then(function successCallback(response) {
               $scope.nkhoihang = response.data;
           }, function errorCallback(response) {
               console.log(response);
               ErrorSystem("Sự cố đường truyền, hãy kiểm tra lại mạng Internet");
           });

    }
    //-------------------------


    $scope.AddNewComment = function (mahang) {
        var username = $('#username').val();
        $("textarea[name=newcomment]").val(CKEDITOR.instances.newcomment.getData());
        var newcomment = $("[name=newcomment]").val();
        var data_save = {
            NGUOI_COMMENT: username,
            MA_HANG: mahang,
            NOI_DUNG_COMMENT: newcomment,
        }
        $http.post('/api/Api_TonKhoHL/NewComment', data_save).then(function (response) {
            SuccessSystem('Thêm comment thành công');
        }, function errorCallback(response) {
            ErrorSystem("Lỗi khi thêm comment");
        });
    };

});
