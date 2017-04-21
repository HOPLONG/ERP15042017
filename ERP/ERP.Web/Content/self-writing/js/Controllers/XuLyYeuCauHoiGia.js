﻿app.controller('XuLyYeuCauHoiGia', function ($scope, $http, XuLyHoiGiaService) {
    var purhienthoi = $('#purhienthoi').val();
    var isadmin = $('#isadmin').val();
    $scope.xuly_hoihang = function () {
        var data = {
            USERNAME: purhienthoi,
            IS_ADMIN : isadmin
        }
        return $http.post('/api/Api_XuLyYeuCauHoiGia/GetMH_XL_YEU_CAU_HOI_GIA',data).then(function (response)
        {
            $scope.list_xuly_hoihang = response.data;
        });
    };
    $scope.xuly_hoihang();

    $scope.Detail = {
        ListAdd: [],
        ListNew: []
    }

    $scope.load_xuly = function (item, idYCHG) {
        $scope.item = item;
        var idYCHG = parseInt(idYCHG);
        return $http.post('/api/Api_LoadXuLyYeuCauHoiGia/HoiGia/' + idYCHG).then(function (response) {
            $scope.Detail.ListAdd = response.data;
        });
    };

    $scope.add_new_ncc = function () {
        $scope.Detail.ListAdd.push({
            ID_YEU_CAU_HOI_GIA : '',
            MA_HANG: 0,
            MA_CHUAN: 0,
            SO_LUONG: 0,
            MA_NCC: 0,
            TEN_NHA_CUNG_CAP: 0,
            GIA: 0,
            THOI_GIAN_CAP_HANG: 0,
            NGAY_HOI_GIA: '',
            GHI_CHU: '',
        });
    };

    $scope.save_xuly = function (id_hoigia) {
        $scope.arrayChiTietXuLy = [];

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {


            var ChiTietXL = {
                ID_YEU_CAU_HOI_GIA: $scope.Detail.ListAdd[i].ID_YEU_CAU_HOI_GIA,
                MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                MA_NCC: $scope.Detail.ListAdd[i].MA_NCC,
                TEN_NHA_CUNG_CAP: $scope.Detail.ListAdd[i].TEN_NHA_CUNG_CAP,
                GIA: $scope.Detail.ListAdd[i].GIA,
                THOI_GIAN_CAP_HANG: $scope.Detail.ListAdd[i].THOI_GIAN_CAP_HANG,
                NGAY_HOI_GIA: $scope.Detail.ListAdd[i].NGAY_HOI_GIA,
                GHI_CHU: $scope.Detail.ListAdd[i].GHI_CHU,
                TRUC_THUOC: 'HOPLONG',
                PUR_XU_LY: purhienthoi
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietXuLy.push(ChiTietXL);
        }


        if ($scope.arrayChiTietXuLy.length > 0) {
            $http({
                method: 'POST',
                data: $scope.arrayChiTietXuLy,
                url: window.location.origin + '/api/Api_LoadXuLyYeuCauHoiGia/XuLyHoiHang/' + $scope.item.ID_HOI_GIA
            }).then(function successCallback(response) {
                alert("Hoàn Thành Lưu");
                $scope.xuly_hoihang();
            }, function errorCallback(response) {
                alert('Không lưu được chi tiết giữ kho');
            });
            return;
        }
    };

    $scope.changestatus = function (id,trangthai) {
        var status = {
            ID: id,
            TRANG_THAI : trangthai
        }
        var txt;
        var r = confirm("Bạn có chắc là thông tin đã đầy đủ?");
        if (r == true) {
            XuLyHoiGiaService.save_stt(id, status).then(function (response) {
                alert('Thành công');
                $scope.xuly_hoihang();
            });
        } else {
            $scope.xuly_hoihang();
        }
    };
});

app.directive('date', function (dateFilter) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs['date'] || 'dd-MM-yyyy';

            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
})