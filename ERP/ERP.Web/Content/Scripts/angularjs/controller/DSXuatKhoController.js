app.controller('DSPhieuXuatKhoController', function ($rootScope, $scope, $http, config) {
    $rootScope.title = "Xuất kho";
    $rootScope.dashboard = false;
    $scope.StoreType = 1;
    $scope.DSXuatKho = {
        From: null,
        To: null,
        ListResult: [],
    };

    $scope.phieuxuatkho = ['Bán hàng','Sản xuất'];

    $scope.GiaTriThamChieu = [];
    $scope.LoaiChungTu = null;

    $scope.GiaTriChungTu = {
        Search: null,
        Date: null
    };
    $scope.ThamChieu = {
        From: null,
        To: null,
        ListResult: [],
        ListSelect: [],
        TraHang: null
    };

    $scope.ValidateGeneral = {
        NhanVienBanHang: true,
        NgayHachToan: true,
        NgayChungTu: true,
        NgayHachToanLess: true,
    }
    $scope.Validate = {
        FromDateThamChieu: true,
        ToDateThamChieu: true,
        ToDateThamChieuLess: true,
        LoaiChungTu: true,
        GiaTriChungTu: true

    };


    $scope.KhachHang = {
        KhachHang: [],
        DoiTuong: [],
    };
    $scope.Detail = {
        ListHangHoa: [],
        ListTaiKhoan: [],
        ListAdd: [],
        SearchHang: [],
        //ListKho: []
    }
    $scope.Detail.ListAdd.push({
            MaHang: null,
            TenHang: null,
            TKKho: null,
            DonGia: null,
            SoLuong: null,
            DVT: null,
            TKNo: null,
            TKCo: null,
            DonGiaVon: null
        });

    function Init() {


        $http({
            method: 'GET',
            url: '/api/Api_XuatKho/GetDSPhieuXuatKho'
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.DSPhieuXuatKho = response.data;
            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });
 
        

    }
    Init();

    $scope.SearchPhieuXuatKho = function () {

        var data = {
            tungay: $scope.DSXuatKho.From.format('DD/MM/YYYY'),
            denngay: $scope.DSXuatKho.To.format('DD/MM/YYYY')
        }
        $http.post('/api/Api_XuatNhapKho/GetAllDSPhieuXuatKho', data)
            .then(function (response) {
                console.log(response);
                if (typeof (response.data) == "object") {
                    $scope.DSXuatKho.ListResult = response.data;
                    if ($scope.DSXuatKho.ListResult.length == 0) {
                        Norecord();
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });
        
    };

 
    $scope.transfer = function (transfer) {
        $scope.item = transfer;
        $http.get('/api/Api_KHO_CT_XUAT_KHO/GetCTPhieuXuatKho/' + $scope.item.SO_CHUNG_TU)
            .then(function (response) {
                if (typeof (response.data) == "object") {
                    $scope.Detail.ListAdd = response.data;
                    if ($scope.Detail.ListAdd.length == 0) {
                        Norecord();
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });

        $http.get('/api/Api_ThamChieuChungTu/GetThamChieuChungTu/' + $scope.item.SO_CHUNG_TU)
            .then(function (response) {
                $scope.listct = response.data;
                $scope.ThamChieu.ListSelect = [];
                for (i = 0; i < $scope.listct.length; i++) {
                    
                    $scope.ThamChieu.ListSelect.push({
                        SO_CHUNG_TU: $scope.listct[i].SO_CHUNG_TU_THAM_CHIEU,
                    })
                }
                if (typeof (response.data) == "object") {
                    $scope.DSXuatKho.ListResult = response.data;
                    
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });
    };


    //

    //Hiển thị ô giá trị chứng từ
    $scope.ShowDataGiaTriChungTu = function () {
        if ($scope.LoaiChungTu == 2 && $("#DataGiaTriChungTu").css("display") == "none") {
            $("#DataGiaTriChungTu").css({ "display": "block" });
        }
        else {
            $("#DataGiaTriChungTu").css({ "display": "none" });
        }
    }
    //End 



    //Chọn giá trị chứng từ
    $scope.SelectDataGiaTriChungTu = function (item) {
        $scope.GiaTriChungTu.Data = item;
        $scope.GiaTriChungTu.Search = item.tendoituong;
        $("#DataGiaTriChungTu").css({ "display": "none" });
    }
    //end


    //Thay đổi loại chứng từ
    $scope.ChangeLoaiChungTu = function () {

        if ($scope.LoaiChungTu == 1) {
            $("#Select_DataGiaTriChungTu").css({ "display": "block" });
            $("#Input_DataGiaTriChungTu").css({ "display": "none" });
            $("#Input_MaChungTu").css({ "display": "none" });
            $("#DataGiaTriChungTu").css({ "display": "none" });
            $http({
                method: 'GET',
                url: '/api/Api_Loaichungtu'
            }).then(function (response) {
                if (typeof (response.data) == "object") {
                    $scope.GiaTriThamChieu = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.GiaTriThamChieu.push({
                            "value": response.data[i].MA_LOAI_CHUNG_TU,
                            "show": response.data[i].TEN_LOAI_CHUNG_TU
                        });
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });
        }
        else if ($scope.LoaiChungTu == 2) {
            $("#Select_DataGiaTriChungTu").css({ "display": "none" });
            $("#Input_DataGiaTriChungTu").css({ "display": "block" });
            $("#Input_MaChungTu").css({ "display": "none" });
            $("#DataGiaTriChungTu").css({ "display": "block" });
            $http({
                method: 'GET',
                url: '/api/Api_XuatNhapKho/GetAllDoiTuong'
            }).then(function (response) {
                if (typeof (response.data) == "object") {
                    var data = response.data.DoiTuong;
                    var colength = 5;
                    var madoituong = "", tendoituong = "";
                    var max = 0;
                    var maxlength = response.data.Length;
                    for (var i = 0; i < response.data.length; i++) {
                        madoituong = response.data[i].MA_DOI_TUONG;
                        tendoituong = response.data[i].TEN_DOI_TUONG;
                        $scope.GiaTriThamChieu.push({
                            value: response.data[i].MA_DOI_TUONG,
                            show: "",
                            madoituong: madoituong,
                            tendoituong: tendoituong,
                        });
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });
        }
        else if ($scope.LoaiChungTu == 3) {
            $("#Select_DataGiaTriChungTu").css({ "display": "none" });
            $("#Input_DataGiaTriChungTu").css({ "display": "none" });
            $("#Input_MaChungTu").css({ "display": "block" });
            $("#DataGiaTriChungTu").css({ "display": "none" });
            //$http({
            //    method: 'POST',
            //    url: '/api/Api_XuatNhapKho/SearchAllMa/A/A'
            //}).then(function (response) {
            //    if (typeof (response.data) == "object") {
            //        $scope.GiaTriThamChieu = [];
            //        for (var i = 0; i < response.data.length; i++) {
            //            $scope.GiaTriThamChieu.push({
            //                "value": response.data[i].SO_CHUNG_TU,
            //                "show": response.data[i].SO_CHUNG_TU
            //            });
            //        }
            //    }
            //    else {
            //        ErrorSystem();
            //    }
            //}, function (error) {
            //    ConnectFail();
            //});
        }
    };
    //End

    $scope.SearchThamChieu = function () {
        if (CheckSearchThamChieu() == false) {
            return;
        }

        if ($scope.LoaiChungTu == 1) {
            var data = {
                GiaTriChungTu: $scope.GiaTriLoaiChungTu,
                FromTime: $scope.ThamChieu.From,
                ToTime: $scope.ThamChieu.To

            }

            $http.post('/api/Api_XuatNhapKho/SearchByTypeWithDate', data)
            .then(function (response) {
                console.log(response);
                if (typeof (response.data) == "object") {
                    $scope.ThamChieu.ListResult = response.data;
                    if ($scope.ThamChieu.ListResult.length == 0) {
                        Norecord();
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });

        }
        else if ($scope.LoaiChungTu == 2) {
            var data = {
                GiaTriChungTu: $scope.GiaTriChungTu.Data.madoituong,
                FromTime: $scope.ThamChieu.From,
                ToTime: $scope.ThamChieu.To

            }

            $http.post('/api/Api_XuatNhapKho/SearchByDoiTuongWithDate', data)
            .then(function (response) {
                console.log(response);
                if (typeof (response.data) == "object") {
                    $scope.ThamChieu.ListResult = response.data;
                    if ($scope.ThamChieu.ListResult.length == 0) {
                        Norecord();
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });
        }
        else {
            var mact = $scope.MaChungTu.Search;
            $http.get('/api/Api_XuatNhapKho/GetbyMa/' + mact)
            .then(function (response) {
                console.log(response);
                if (typeof (response.data) == "object") {
                    $scope.ThamChieu.ListResult = response.data;
                    if ($scope.ThamChieu.ListResult.length == 0) {
                        Norecord();
                    }
                }
                else {
                    ErrorSystem();
                }
            }, function (error) {
                ConnectFail();
            });
        }
    };
    function CheckSearchThamChieu() {
        $scope.ThamChieu.From = $("#ThamChieuFrom").val();
        $scope.ThamChieu.To = $("#ThamChieuTo").val();
        var check = true;
        if ($scope.LoaiChungTu == null) {
            $scope.Validate.LoaiChungTu = false;
            check = false;
        }
        else {
            $scope.Validate.LoaiChungTu = true;
        }
        if (($scope.LoaiChungTu == 2 && $scope.GiaTriChungTu.Data == null) || ($scope.LoaiChungTu == 1 && $scope.GiaTriLoaiChungTu == null) || ($scope.LoaiChungTu == 3 && $scope.MaChungTu.Search == null)) {
            $scope.Validate.GiaTriChungTu = false;
            check = false;
        }
        else {
            $scope.Validate.GiaTriChungTu = true;
        }
        if ($scope.ThamChieu.From != "" && $scope.ThamChieu.To != "" && ConvertToDate($scope.ThamChieu.From) > ConvertToDate($scope.ThamChieu.To)) {
            $scope.Validate.ToDateThamChieuLess = false;
            check = false;
        }
        else {
            $scope.Validate.ToDateThamChieuLess = true;
        }
        return check;
    };
    $scope.SelectThamChieu = function (item, index) {
        if (item.Action == true) {
            item.Action = false;
        }
        else {
            item.Action = true;

        }
    };
    $scope.RemoveThamChieu = function (index) {
        $scope.ThamChieu.ListSelect.splice(index, 1);
        if ($scope.LoadHangTra == true) {
            ResetAfterSave();
        }
    }
    $scope.SetThamChieu = function () {
        var length = $scope.ThamChieu.ListResult.length;
        //$scope.ThamChieu.ListSelect = [];
        var check = false;
        for (var i = 0; i < length; i++) {
            if ($scope.ThamChieu.ListResult[i].Action == true) {
                check = false;
                for (var j = 0; j < $scope.ThamChieu.ListSelect.length; j++) {
                    if ($scope.ThamChieu.ListSelect[j].SO_CHUNG_TU == $scope.ThamChieu.ListResult[i].SO_CHUNG_TU) {
                        check = true;
                        break;
                    }
                }
                if (!check) {

                    $scope.ThamChieu.ListSelect.push(angular.copy($scope.ThamChieu.ListResult[i]));
                }
            }
        }
        $("#modal_theme_primary").modal("toggle");
        ResetThamChieu();
    };
    function ResetThamChieu() {
        $("#ThamChieuFrom").val("");
        $("#ThamChieuTo").val("");
        $scope.ThamChieu.ListResult = [];
    };




    var a = $('#username').val();
    var b = $('#macongty').val();
    $scope.SaveXuatKho = function () {
      
        var loaixuatkho = "";
        if ($scope.item.LOAI_XUAT_KHO == "Bán hàng") {
            loaixuatkho = "Bán hàng";
        } else {
            loaixuatkho = "Sản xuất";
      
        }
        $http({
            method: 'PUT',
            url: '/api/Api_XuatKho/PutKHO_XUAT_KHO',
            data: {
                SO_CHUNG_TU: $scope.item.SO_CHUNG_TU,
                NGAY_CHUNG_TU: $scope.item.NGAY_CHUNG_TU,
                NGAY_HACH_TOAN: $scope.item.NGAY_HACH_TOAN,
                ChiTietPX: $scope.Detail.ListAdd,
                ThamChieu: $scope.ThamChieu.ListSelect,
                NGUOI_GIAO_HANG: $scope.item.NguoiGiaoHang,
                LOAI_XUAT_KHO: loaixuatkho,
                KHACH_HANG: $scope.item.KHACH_HANG,
                NHAN_VIEN_BAN_HANG: $scope.item.NHAN_VIEN_BAN_HANG,
                LY_DO_XUAT: $scope.item.LY_DO_XUAT,
                NGUOi_NHAN: $scope.item.NGUOI_NHAN,
                NGUOi_LAP_PHIEU: a,
                TRUC_THUOC: b,


            }
        }).then(function (response) {
            response.data = jQuery.parseJSON(response.data);
            if (response.data == config.INPUT_ERROR) {
                InputFail();
            }
            else if (response.data == config.FAIL) {
                ErrorSystem();
            }
            else {
                $(function () {
                   new PNotify({
                       title: 'Thành công',
                       text: 'Chứng từ ' + response.data + ' đã được sửa',
                       addclass: 'bg-primary'
                     });
                });
            }
        }, function (error) {
            ConnectFail();
        });
    }
});