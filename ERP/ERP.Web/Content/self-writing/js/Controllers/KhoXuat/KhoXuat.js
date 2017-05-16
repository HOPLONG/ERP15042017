app.controller('KhoXuatController', function ($scope, $http) {
    var IsAdmin = $('#isadmin').val();
    var Username = $('#username').val();
    var MaCongTy = $('#macongty').val();
    function init() {
        //Get List Hàng cần đặt
        $scope.lisHangCanDat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/GetHangCanDat/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.lisHangCanDat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List Bán hàng
        $scope.ListBanHang = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/GetListBanHang/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListBanHang = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        ////Get List Xuất hàng
        //$scope.ListXuatHang = [];
        //$http.post(window.location.origin + '/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username)
        //.then(function (response) {
        //    if (response.data) {
        //        $scope.ListXuatHang = response.data;
        //    }
        //}, function (error) {
        //    console.log(error);
        //});
        //Get List bán hàng chưa xuất
        $scope.ListBanHangChuaXuat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_DON_BAN_HANG_CHUA_XUAT/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListBanHangChuaXuat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List bán hàng đã xuất
        $scope.ListBanHangDaXuat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_DON_BAN_HANG_DA_XUAT/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListBanHangDaXuat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng cần xuất
        $scope.GetDataHangCanXuat = function()
        {
            var username = $('#username').val();
            $scope.ListHangCanXuat = [];
            $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_CAN_XUAT/' + IsAdmin + '/' + Username)
            .then(function (response) {
                if (response.data) {
                    $scope.ListHangCanXuat = response.data;
                }
            }, function (error) {
                console.log(error);
            });
        }
        $scope.GetDataHangCanXuat();
        //Get List hàng giữ
        var username = $('#username').val();
        $scope.ListHangGiu = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiu = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng chưa giữ
        var username = $('#username').val();
        $scope.ListHangChuaGiu = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_CHUA_GIU/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangChuaGiu = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ chưa bán
        var username = $('#username').val();
        $scope.ListHangGiuChuaBan = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_CHUA_BAN/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuChuaBan = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ đã bán
        var username = $('#username').val();
        $scope.ListHangGiuDaBan = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_DA_BAN/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuDaBan = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ quá ngày giao hàng
        var username = $('#username').val();
        $scope.ListHangGiuQuaNgayGiao = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_QUA_NGAY_GIAO/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuQuaNgayGiao = response.data;
            }
        }, function (error) {
            console.log(error);
        });
        //Get List hàng giữ sắp đến ngày xuất
        var username = $('#username').val();
        $scope.ListHangGiuSapDenNgayXuat = [];
        $http.get(window.location.origin + '/api/Api_KhoXuat/Get_List_HANG_GIU_SAP_DEN_NGAY_XUAT/' + IsAdmin + '/' + Username)
        .then(function (response) {
            if (response.data) {
                $scope.ListHangGiuSapDenNgayXuat = response.data;
            }
        }, function (error) {
            console.log(error);
        });
    }
    init();

    $scope.DanLink = function (item) {
        window.location = '/KinhDoanh/DonHangPO/Details/' + item;
    }
    $scope.DanLinkXuatKho = function (item) {
        window.location = '/Inventory/KhoXuat/DetailXuatKho/' + item;
    }

    $scope.chuyenmakho = function (makho) {
        $scope.MA_KHO_TON = makho;
        //console.log($scope.MA_KHO_TON);
    };


    $scope.GiuHang = function (id,mahang,dvt,soluong) {
        //$scope.MA_KHO_TON = makhotang2;
        var dl = {
            MA_HANG :mahang,
            MA_KHO_CON :$scope.MA_KHO_TON,
            NHAP_TAI_KHO:'IVHOPLONG05',
            DVT : dvt,
            SO_LUONG :soluong
        }
        $scope.ListChiTiet = [];
        $scope.ListChiTiet.push(dl);
        console.log($scope.MA_KHO_TON, mahang, dvt, soluong);
        var data = {
            NGUOI_LAP_PHIEU: Username,
            TRUC_THUOC: MaCongTy,
            DIEN_GIAI:'Chuyển kho giữ hàng',
            ChiTiet:  $scope.ListChiTiet
        }
        console.log(data);
        $http.post(window.location.origin + '/api/Api_ChuyenKho/ChuyenKhoGiuHang/'+id,data)
        .then(function (response) {
            if (response.data) {
                $scope.GetDataHangCanXuat();
                SuccessSystem(response.data);

            }
        }, function (error) {
            console.log(error);
           ErrorSystem(error);
        });
    };

    $scope.candathang = function (id) {
        $http.post(window.location.origin + '/api/Api_KhoXuat/CanDatHang/' + id)
        .then(function (response) {
            if (response.data) {
                $scope.GetDataHangCanXuat();
                SuccessSystem(response.data);

            }
        }, function (error) {
            console.log(error);
            ErrorSystem(error);
        });
    };

    // truyền về list xuất hàng
    $scope.GeneralInfo = {
        NgayChungTu: null,
        NgayHachToan: null,
        KhachHang: null,
        DienGiai: null,
        KemTheo: null,
        ChiTiet: null,
        TenDoiTuong: null,
        MST: null,
        Email: null,
        SDT: null,
        Fax: null,
        NhanVienBanHang: null,
        DiaChi: null,
        TuKhoa: null,
        Ngay: null,
        

    };
   
    $scope.Detail = {
        ListAdd: []
    }



 
    $scope.SearchPhieuXuatKho = function (tukhoa, ngay) {
        if (ngay == false) {
            ngay = null;
        }
       
        if (tukhoa == null && ngay != null) {
            var data = {
                tukhoa: tukhoa,
                ngay: ngay.format('DD/MM/YYYY')
            }
            $http.post('/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListXuatHang = response.data;
                        if ($scope.ListXuatHang.length == 0) {
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
        if (tukhoa != null && ngay == null) {
            var data = {
                tukhoa: tukhoa,
                ngay: ngay,
            }
            $http.post('/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListXuatHang = response.data;
                        if ($scope.ListXuatHang.length == 0) {
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
        if (tukhoa != null && ngay != null) {
            var data = {
                tukhoa: tukhoa,
                ngay: ngay.format('DD/MM/YYYY')
            }
            $http.post('/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListXuatHang = response.data;
                        if ($scope.ListXuatHang.length == 0) {
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
        if (tukhoa == null && ngay == null) {
            var data = {
                tukhoa: tukhoa,
                ngay: ngay
            }
            $http.post('/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListXuatHang = response.data;
                        if ($scope.ListXuatHang.length == 0) {
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

    
    $scope.SelectList = function (item) {
        $(".tableselect").css({ "display": "none" });

        $http({
            method: 'GET',
            url: '/api/Api_NhapKho/GetDetailKHO_NHAP_KHO/' + item.SO_CHUNG_TU,
        }).then(function (response) {
            if (typeof (response.data) == "object") {
                $scope.Detail.ListAdd = response.data.ctxuatkho;
                $scope.GeneralInfo.KhachHang = response.data.xuatkho.KHACH_HANG,
                $scope.GeneralInfo.TenDoiTuong = response.data.xuatkho.TEN_CONG_TY,
                $scope.GeneralInfo.NgayHachToan = response.data.xuatkho.NGAY_HACH_TOAN,
                $scope.GeneralInfo.NgayChungTu = response.data.xuatkho.NGAY_CHUNG_TU,
                $scope.GeneralInfo.DiaChi = response.data.xuatkho.DIA_CHI_XUAT_HOA_DON,
                $scope.GeneralInfo.MST = response.data.xuatkho.MST,
                $scope.GeneralInfo.Email = response.data.xuatkho.EMAIL,
                $scope.GeneralInfo.SDT = response.data.xuatkho.HOTLINE,
                $scope.GeneralInfo.Fax = response.data.xuatkho.FAX,
                $scope.GeneralInfo.DienGiai = response.data.xuatkho.LY_DO_XUAT,
                $scope.GeneralInfo.NhanVienBanHang = response.data.xuatkho.HO_VA_TEN
                $scope.LoadHangTra = true;

            }
            else {
                ErrorSystem();
            }
        }, function (error) {
            ConnectFail();
        });


    }

    function GetDSXuatHang() {
        var data = {
            tukhoa: null,
            ngay: null,

        }
        $http.post('/api/Api_KhoXuat/GetListXuatHang/' + IsAdmin + '/' + Username, data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ListXuatHang = response.data;
                        if ($scope.ListXuatHang.length == 0) {
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
    GetDSXuatHang();


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