﻿app.controller("DonHangPOCtrl", function ($http, $scope, DonHangPOService) {
    $scope.Detail = {
        ListAdd: [],
        ListNew: []
    }
    $scope.Detail.ListAdd = [{
        MA_HANG: '',
        MA_DIEU_CHINH: '',
        DVT: '',
        SO_LUONG: 0,
        DON_GIA: 0,
        THANH_TIEN: 0,
    }];

    $scope.load_danhsachPO = function () {
        DonHangPOService.get_danhsachPO().then(function (a) {
            $scope.list_donhangPO = a;
        });
    };
    $scope.load_danhsachPO();

    $scope.load_thongtinchungPO = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //
        DonHangPOService.get_thongtinchungPO(url).then(function (abc) {
            $scope.thongtinchung = abc;
                       
            DonHangPOService.get_thongtinchitietPO(url).then(function (b) {
                $scope.Detail.ListAdd = b;

                var tong_thanh_tien = 0;
                var thuesuat_gtgt = $('#thuesuat_gtgt').val();
                
                for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
                    tong_thanh_tien = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_thanh_tien);
                }
                $scope.tong_thanh_tien = tong_thanh_tien;
                $scope.tong_tien_VAT = parseFloat($scope.tong_thanh_tien * (thuesuat_gtgt / 100));

                $scope.tong_tien_thuc_te = $scope.tong_thanh_tien + $scope.tong_tien_VAT;
                $scope.so_tien_viet_bang_chu = docso($scope.tong_tien_thuc_te);
            });
        });
    };

    $scope.load_thongtinchungPO();

    $scope.kiemtra = function (item) {
        $scope.item = item;

        var tong_thanh_tien = 0;
        var thuesuat_gtgt = $('#thuesuat_gtgt').val();

        $scope.item.THANH_TIEN = $scope.item.DON_GIA * $scope.item.SO_LUONG;

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            tong_thanh_tien = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_thanh_tien);
        }
        $scope.tong_thanh_tien = tong_thanh_tien;
        $scope.tong_tien_VAT = parseFloat($scope.tong_thanh_tien * (thuesuat_gtgt / 100));

        $scope.tong_tien_thuc_te = $scope.tong_thanh_tien + $scope.tong_tien_VAT;
        $scope.so_tien_viet_bang_chu = docso($scope.tong_tien_thuc_te);
    };


    var salehienthoi = $('#username').val();

    $scope.savePO = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //
 
        var data_save = {
            MA_SO_PO: url,
            NGAY_LEN_PO: $scope.thongtinchung[0].NGAY_LEN_PO.format('DD/MM/YYYY'),
            MA_KHACH_HANG: $scope.thongtinchung[0].MA_KHACH_HANG,
            TEN_LIEN_HE: $scope.thongtinchung[0].TEN_LIEN_HE,
            HINH_THUC_THANH_TOAN: $scope.thongtinchung[0].HINH_THUC_THANH_TOAN,
            THUE_SUAT_GTGT: $scope.thongtinchung[0].THUE_SUAT_GTGT,
            TIEN_THUE_GTGT: $scope.tong_tien_VAT,
            TONG_TIEN_THANH_TOAN: $scope.tong_tien_thuc_te,
            SO_TIEN_VIET_BANG_CHU: $scope.so_tien_viet_bang_chu,
            NGAY_GIAO_HANG: $scope.thongtinchung[0].NGAY_GIAO_HANG.format('DD/MM/YYYY'),
            DIA_DIEM_GIAO_HANG: $scope.thongtinchung[0].DIA_DIEM_GIAO_HANG,
        }

        $scope.arrayChiTietPO = [];

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {


            var ChiTietPO = {
                ID: $scope.Detail.ListAdd[i].ID,
                MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
                SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListAdd[i].DON_GIA,
                THANH_TIEN: $scope.Detail.ListAdd[i].THANH_TIEN,
                DVT: $scope.Detail.ListAdd[i].DVT,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietPO.push(ChiTietPO);
        }

        DonHangPOService.save_thongtinchungPO(url,data_save).then(function successCallback(response) {
            alert('Thêm thông tin chung thành công');

            for (var i = 0; i < $scope.arrayChiTietPO.length; i++) {
                $scope.arrayChiTietPO[i].MA_SO_PO = url;
            }


            if ($scope.arrayChiTietPO.length > 0) {
                $http({
                    method: 'PUT',
                    data: $scope.arrayChiTietPO,
                    url: window.location.origin + '/api/Api_ChiTiet_DonHangPO/PutBH_CT_DON_HANG_PO'
                }).then(function successCallback(response) {
                    alert("Hoàn Thành Lưu");
                }, function errorCallback(response) {
                    alert('Không lưu được chi tiết giữ kho');
                });
                return;
            }

        }, function errorCallback(response) {
            console.log(response);
            alert('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
    };

    $scope.deletePO = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //

        DonHangPOService.delete_thongtinchungPO(url).then(function (response) {
            alert('Bạn đã xóa thành công');
            window.location.href = "/DonHangPO/Index";
        });
    };


    $http.get(window.location.origin + '/api/Api_KH/GET_KHACH_CUA_SALE/' + salehienthoi)

         .then(function (response) {
             $scope.list_khachhang = response.data;
         }, function (error) {
             console.log(error);
         });

    //get data nguoi giu
    $http.get(window.location.origin + '/api/Api_KH/GetAllSale')
         .then(function (response) {
             $scope.list_nhanvienql = response.data;
         }, function (error) {
             console.log(error);
         });


    $scope.hinhthuctt = ["Chuyển khoản", "Tiền mặt", "Trả tiền sau khi nhận hàng"];

    var mangso = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    function dochangchuc(so, daydu) {
        var chuoi = "";
        chuc = Math.floor(so / 10);
        donvi = so % 10;
        if (chuc > 1) {
            chuoi = " " + mangso[chuc] + " mươi";
            if (donvi == 1) {
                chuoi += " mốt";
            }
        } else if (chuc == 1) {
            chuoi = " mười";
            if (donvi == 1) {
                chuoi += " một";
            }
        } else if (daydu && donvi > 0) {
            chuoi = " lẻ";
        }
        if (donvi == 5 && chuc >= 1) {
            chuoi += " lăm";
        } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
            chuoi += " " + mangso[donvi];
        }
        return chuoi;
    }
    function docblock(so, daydu) {
        var chuoi = "";
        tram = Math.floor(so / 100);
        so = so % 100;
        if (daydu || tram > 0) {
            chuoi = " " + mangso[tram] + " trăm";
            chuoi += dochangchuc(so, true);
        } else {
            chuoi = dochangchuc(so, false);
        }
        return chuoi;
    }
    function dochangtrieu(so, daydu) {
        var chuoi = "";
        trieu = Math.floor(so / 1000000);
        so = so % 1000000;
        if (trieu > 0) {
            chuoi = docblock(trieu, daydu) + " triệu";
            daydu = true;
        }
        nghin = Math.floor(so / 1000);
        so = so % 1000;
        if (nghin > 0) {
            chuoi += docblock(nghin, daydu) + " nghìn";
            daydu = true;
        }
        if (so > 0) {
            chuoi += docblock(so, daydu);
        }
        return chuoi;
    }
    function docso(so) {
        if (so == 0) return mangso[0];
        var chuoi = "", hauto = "";
        do {
            ty = so % 1000000000;
            so = Math.floor(so / 1000000000);
            if (so > 0) {
                chuoi = dochangtrieu(ty, true) + hauto + chuoi;
            } else {
                chuoi = dochangtrieu(ty, false) + hauto + chuoi;
            }
            hauto = " tỷ";
        } while (so > 0);
        return chuoi;
    }


});
app.directive('date', function (dateFilter) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs['date'] || 'dd/MM/yyyy';

            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
})

app.directive("datepicker", function () {
    return {
        restrict: "A",
        scope: false,
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (date) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(date);
                });
            };
            var options = {
                onSelect: function (dateText) {
                    console.log(dateText);
                    updateModel(dateText);
                }
            };
            elem.datetimepicker({ format: 'DD/MM/YYYY' }).on('dp.change', function (data) {
                console.log('xxxxxxxxxxxxxxxx');
                console.log(data.date);
                updateModel(data.date);
            });
        }
    }
});
////app.filter('words', function () {
////    function isInteger(x) {
////        return x % 1 === 0;
////    }


////    return function (value) {
////        if (value && isInteger(value))
////            return toWords(value);

////        return value;
////    };

////});


////var th = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ'];
////var dg = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
////var tn = ['mười', 'mười một', 'mười 2', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín'];
////var tw = ['hai muơi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];


////function toWords(s) {
////    s = s.toString();
////    s = s.replace(/[\, ]/g, '');
////    if (s != parseFloat(s)) return 'Không phải là 1 số';
////    var x = s.indexOf('.');
////    if (x == -1) x = s.length;
////    if (x > 15) return 'Số quá lớn';
////    var n = s.split('');
////    var str = '';
////    var sk = 0;
////    for (var i = 0; i < x; i++) {
////        if ((x - i) % 3 == 2) {
////            if (n[i] == '1') {
////                str += tn[Number(n[i + 1])] + ' ';
////                i++;
////                sk = 1;
////            }
////            else if (n[i] != 0) {
////                str += tw[n[i] - 2] + ' ';
////                sk = 1;
////            }
////        }
////        else if (n[i] != 0) {
////            str += dg[n[i]] + ' ';
////            if ((x - i) % 3 == 0) str += 'trăm ';
////            sk = 1;
////        }


////        if ((x - i) % 3 == 1) {
////            if (sk) str += th[(x - i - 1) / 3] + ' ';
////            sk = 0;
////        }
////    }
////    if (x != s.length) {
////        var y = s.length;
////        str += 'point ';
////        for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
////    }
////    return str.replace(/\s+/g, ' ');
////}

////window.toWords = toWords;