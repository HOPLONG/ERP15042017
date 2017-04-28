app.controller("DonHangPOCtrl", function ($http, $scope, DonHangPOService) {
    $scope.Detail = {
        ListAdd: [],
        ListNew: []
    }
    $scope.Detail.ListAdd = [{

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

                var tong_tien_hang = 0;
                var tong_tien_thue_GTGT = 0;
                var tong_tien_thanh_toan = 0;
                
                for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
                    tong_tien_hang = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN_HANG + tong_tien_hang);
                    tong_tien_thue_GTGT = parseFloat($scope.Detail.ListAdd[i].TIEN_THUE_GTGT + tong_tien_thue_GTGT);
                    tong_tien_thanh_toan = parseFloat($scope.Detail.ListAdd[i].TIEN_THANH_TOAN + tong_tien_thanh_toan)
                }
                $scope.tong_tien_hang = tong_tien_hang;
                $scope.tong_tien_thue_GTGT = tong_tien_thue_GTGT
                $scope.tong_tien_thanh_toan = tong_tien_thanh_toan;
                $scope.so_tien_viet_bang_chu = docso($scope.tong_tien_thanh_toan);
            });
        });
    };

    $scope.load_thongtinchungPO();

    $scope.kiemtra = function (item) {
        $scope.item = item;

        var tong_tien_hang = 0;
        var tong_tien_thue_GTGT = 0;
        var tong_tien_thanh_toan = 0;

        $scope.item.THANH_TIEN_HANG =parseFloat( $scope.item.DON_GIA * $scope.item.SO_LUONG );
        $scope.item.TIEN_THUE_GTGT = parseFloat($scope.item.THANH_TIEN_HANG * ($scope.item.THUE_GTGT / 100));
        $scope.item.TIEN_THANH_TOAN = $scope.item.THANH_TIEN_HANG + $scope.item.TIEN_THUE_GTGT;

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            tong_tien_hang = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN_HANG + tong_tien_hang);
            tong_tien_thue_GTGT = parseFloat($scope.Detail.ListAdd[i].TIEN_THUE_GTGT + tong_tien_thue_GTGT);
            tong_tien_thanh_toan = parseFloat($scope.Detail.ListAdd[i].TIEN_THANH_TOAN + tong_tien_thanh_toan)
        }
        $scope.tong_tien_hang = tong_tien_hang;
        $scope.tong_tien_thue_GTGT = tong_tien_thue_GTGT
        $scope.tong_tien_thanh_toan = tong_tien_thanh_toan;
        $scope.so_tien_viet_bang_chu = docso($scope.tong_tien_thanh_toan);
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
            TONG_TIEN_HANG: $scope.tong_tien_hang,
            TONG_TIEN_THUE_GTGT: $scope.tong_tien_thue_GTGT,
            TONG_TIEN_THANH_TOAN: $scope.tong_tien_thanh_toan,
            SO_TIEN_VIET_BANG_CHU: $scope.so_tien_viet_bang_chu,
            NGAY_GIAO_HANG: $scope.thongtinchung[0].NGAY_GIAO_HANG.format('DD/MM/YYYY'),
            DIA_DIEM_GIAO_HANG: $scope.thongtinchung[0].DIA_DIEM_GIAO_HANG,
            DA_HUY: $scope.thongtinchung[0].DA_HUY,
            LY_DO_HUY: $scope.thongtinchung[0].LY_DO_HUY,
            CAN_XUAT_NGAY: $scope.thongtinchung[0].CAN_XUAT_NGAY,
            CAN_LAY_HOA_DON:$scope.thongtinchung[0].CAN_LAY_HOA_DON,
        }

        $scope.arrayChiTietPO = [];

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {


            var ChiTietPO = {
                ID: $scope.Detail.ListAdd[i].ID,
                MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
                SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListAdd[i].DON_GIA,
                THANH_TIEN_HANG: $scope.Detail.ListAdd[i].THANH_TIEN_HANG,
                DVT: $scope.Detail.ListAdd[i].DVT,
                DIEN_GIAI_THUE: $scope.Detail.ListAdd[i].DIEN_GIAI_THUE,
                THUE_GTGT: $scope.Detail.ListAdd[i].THUE_GTGT,
                TIEN_THUE_GTGT: $scope.Detail.ListAdd[i].TIEN_THUE_GTGT,
                TIEN_THANH_TOAN: $scope.Detail.ListAdd[i].TIEN_THANH_TOAN,
                TK_NO: $scope.Detail.ListAdd[i].TK_NO,
                TK_CO: $scope.Detail.ListAdd[i].TK_CO,
                TK_THUE: $scope.Detail.ListAdd[i].TK_THUE,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietPO.push(ChiTietPO);
        }

        DonHangPOService.save_thongtinchungPO(url,data_save).then(function successCallback(response) {
            SuccessSystem('Thêm thông tin chung thành công');

            for (var i = 0; i < $scope.arrayChiTietPO.length; i++) {
                $scope.arrayChiTietPO[i].MA_SO_PO = url;
            }


            if ($scope.arrayChiTietPO.length > 0) {
                $http({
                    method: 'PUT',
                    data: $scope.arrayChiTietPO,
                    url: window.location.origin + '/api/Api_ChiTiet_DonHangPO/PutBH_CT_DON_HANG_PO'
                }).then(function successCallback(response) {
                    SuccessSystem("Hoàn Thành Lưu");
                }, function errorCallback(response) {
                    ErrorSystem('Không lưu được chi tiết giữ kho');
                });
                return;
            }

        }, function errorCallback(response) {
            ErrorSystem(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
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
            SuccessSystem('Bạn đã xóa thành công');
            window.location.href = "/DonHangPO/Index";
        });
    };

    $scope.CreateBH = function (item) {
        $scope.item = item;
        $scope.Detail.ListNew.push({
            ID : $scope.item.ID,
            MA_SO_PO: $scope.item.MA_SO_PO,
            MA_HANG: $scope.item.MA_HANG,
            MA_DIEU_CHINH: $scope.item.MA_DIEU_CHINH,
            TK_NO: '131',
            TK_CO: '51111',
            DVT: $scope.item.DVT,
            SO_LUONG: $scope.item.SO_LUONG,
            DON_GIA: $scope.item.DON_GIA,
            THANH_TIEN_HANG: $scope.item.THANH_TIEN_HANG,
            DIEN_GIAI_THUE: 'Thuế GTGT đầu ra',
            THUE_GTGT: $scope.item.THUE_GTGT,
            TIEN_THUE_GTGT : $scope.item.TIEN_THUE_GTGT,
            TK_THUE: '33311',
            TIEN_THANH_TOAN: $scope.item.TIEN_THANH_TOAN,
            DA_BAN : false,
        })
    };

    $scope.AddNew_PhieuBanHang = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //
        var username = $('#username').val();
        $scope.arrayChiTietPO = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            var ChiTietPO = {
                ID: $scope.Detail.ListNew[i].ID,
                MA_SO_PO: $scope.Detail.ListNew[i].MA_SO_PO,
                MA_HANG: $scope.Detail.ListNew[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListNew[i].MA_DIEU_CHINH,
                SO_LUONG: $scope.Detail.ListNew[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListNew[i].DON_GIA,
                THANH_TIEN_HANG: $scope.Detail.ListNew[i].THANH_TIEN_HANG,
                DVT: $scope.Detail.ListNew[i].DVT,
                DIEN_GIAI_THUE: $scope.Detail.ListNew[i].DIEN_GIAI_THUE,
                THUE_GTGT: $scope.Detail.ListNew[i].THUE_GTGT,
                TIEN_THUE_GTGT: $scope.Detail.ListNew[i].TIEN_THUE_GTGT,
                TIEN_THANH_TOAN: $scope.Detail.ListNew[i].TIEN_THANH_TOAN,
                TK_NO: $scope.Detail.ListNew[i].TK_NO,
                TK_CO: $scope.Detail.ListNew[i].TK_CO,
                TK_THUE: $scope.Detail.ListNew[i].TK_THUE,
                DA_BAN: $scope.Detail.ListNew[i].DA_BAN,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietPO.push(ChiTietPO);
        }

        $scope.ThongTinBanHang = {
            MA_KHACH_HANG: $scope.thongtinchung[0].MA_KHACH_HANG,
            TEN_LIEN_HE: $scope.thongtinchung[0].TEN_LIEN_HE,
            HINH_THUC_THANH_TOAN: $scope.thongtinchung[0].HINH_THUC_THANH_TOAN,
            TONG_TIEN_HANG: $scope.tong_tien_hang,
            TONG_TIEN_THUE_GTGT: $scope.tong_tien_thue_GTGT,
            TONG_TIEN_THANH_TOAN: $scope.tong_tien_thanh_toan,
            SO_TIEN_VIET_BANG_CHU: $scope.so_tien_viet_bang_chu,
            NGAY_GIAO_HANG: $scope.thongtinchung[0].NGAY_GIAO_HANG.format('DD/MM/YYYY'),
            DIA_DIEM_GIAO_HANG: $scope.thongtinchung[0].DIA_DIEM_GIAO_HANG,
            DA_XUAT_KHO: false,
            DA_LAP_HOA_DON: false,
            TRUC_THUOC: 'HOPLONG',
            NHAN_VIEN_QUAN_LY: username,
            ChiTietPO: $scope.arrayChiTietPO,
        };

        $http({
            method: 'POST',
            data: $scope.ThongTinBanHang,
            url: window.location.origin + '/api/Api_BanHang/PostThemPhieuBanHang'
        }).then(function successCallback(response) {
            SuccessSystem('Bạn đã tạo thành công 1 đơn bán hàng có mã là ' + response.data)
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
    };

    $http.get(window.location.origin + '/api/Api_KH/GET_KHACH_CUA_SALE/' + salehienthoi)

         .then(function (response) {
             $scope.list_khachhang = response.data;
         }, function (error) {
             ErrorSystem(error);
         });

    //get data nguoi giu
    $http.get(window.location.origin + '/api/Api_KH/GetAllSale')
         .then(function (response) {
             $scope.list_nhanvienql = response.data;
         }, function (error) {
             ErrorSystem(error);
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