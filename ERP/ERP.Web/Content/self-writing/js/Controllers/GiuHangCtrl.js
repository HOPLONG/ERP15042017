
app.controller('GiuHangHopLongCtrl', function ($scope, $http) {

    var username = $('#username').val();
    var isadmin = $('#isadmin').val();
    //xóa dòng
    $scope.Remove = function (index) {
        $scope.Detail.ListAdd.splice(index, 1);
    }



    //Mảng chi tiết giữ hàng
    $scope.Detail = {
        ListAdd: []
    }
    $scope.Detail.ListAdd = [{
        MA_HANG: '',
        TEN_HANG: '',
        DVT: '',
        XUAT_XU: '',
        SL_GIU: '',
        DON_GIA: '',
        NGAY_XUAT: '',
        DA_XUAT: '',
        GHI_CHU: ''
    }];

    var salehienthoi = $('#salehienthoi').val();
    //khai báo thông tin chung
    $scope.KhoGiuHang = {
        saleGiu: '',
        maKhachHang: '',
        ngayGiu: '',
        donDangXuat: false,
        donDaHoanThanh: false,
        giuPo: false,
        huyDonGiu: false
    };

    //button add new row
    $scope.AddNew = function () {
        $scope.Detail.ListAdd.push({
            MA_HANG: null,
            TEN_HANG: null,
            DVT: null,
            XUAT_XU: null,
            SL_GIU: null,
            DON_GIA: null,
            NGAY_XUAT: null,
            DA_XUAT: false,
            GHI_CHU: null
        });
    }

    //Khai báo đối tượng lưu vào cơ sở dữ liệu-------------------------------------
    $scope.onSave = function () {
        if (!$scope.arrayKhachHang.ma_khach_hang) {
            ErrorSystem('Thiếu thông tin Mã khách hàng');
            return;
        }

        if (!$scope.arraySaleGiu.username) {
            ErrorSystem('Thiếu thông tin Sale giữ');
            return;
        }

        if (!$scope.KhoGiuHang.ngayGiu) {
            ErrorSystem('Thiếu thông tin Ngày giữ');
            return;
        }


        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            if (!$scope.Detail.ListAdd[i].MA_HANG) {
                ErrorSystem('Thiếu thông tin Mã hàng - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].SL_GIU) {
                ErrorSystem('Thiếu thông tin số lượng giữ - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].DON_GIA) {
                ErrorSystem('Thiếu thông tin đơn giá - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].NGAY_XUAT) {
                ErrorSystem('Thiếu thông tin ngày xuất - tại dòng ' + (i + 1));
                return;
            }

        }


        $scope.GiuHang = {
        SALES_GIU: $scope.arraySaleGiu.username,
        MA_KHACH_HANG: $scope.arrayKhachHang.ma_khach_hang,
        NGAY_GIU: $scope.KhoGiuHang.ngayGiu.format('DD/MM/YYYY'),
        HUY_DON_GIU: $scope.KhoGiuHang.huyDonGiu,
        GIU_PO: $scope.KhoGiuHang.giuPO,
        DON_DANG_XUAT: $scope.KhoGiuHang.donDangXuat,
        DON_DA_HOAN_THANH: $scope.KhoGiuHang.donDaHoanThanh,
        TRUC_THUOC:'HOPLONG'

    };

    $scope.arrayChiTietGiu = [];

    for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
           

        var ChiTietGiu = {

            MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
            DVT: $scope.Detail.ListAdd[i].DVT,
            XUAT_XU: $scope.Detail.ListAdd[i].XUAT_XU,
            SL_GIU: $scope.Detail.ListAdd[i].SL_GIU,
            DON_GIA: $scope.Detail.ListAdd[i].DON_GIA,
            NGAY_XUAT: $scope.Detail.ListAdd[i].NGAY_XUAT.format('YYYY-MM-DD'),
            DA_XUAT: $scope.Detail.ListAdd[i].DA_XUAT,
            GHI_CHU: $scope.Detail.ListAdd[i].GHI_CHU
        }
        //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
        $scope.arrayChiTietGiu.push(ChiTietGiu);
    }

    //Lưu vào CSDL
          
    $http({
        method: 'POST',
        data: $scope.GiuHang,
        url: window.location.origin + '/api/Api_KhoGiuHang'
    }).then(function successCallback(response) {
        $scope.GiuHang = response.data;
        if (!$scope.GiuHang) {
            ErrorSystem('Không lưu được thông tin chung của giữ hàng');
            return;
        }

        for (var i = 0; i < $scope.arrayChiTietGiu.length; i++) {
            $scope.arrayChiTietGiu[i].MA_GIU_KHO = $scope.GiuHang.MA_GIU_KHO;
        }


        if ($scope.arrayChiTietGiu.length > 0) {
            $http({
                method: 'POST',
                data: $scope.arrayChiTietGiu,
                url: window.location.origin + '/api/Api_ChiTietKhoGiuHang/PostKhoCT_GiuKho'
            }).then(function successCallback(response) {
                alert("Hoàn Thành Lưu");
            }, function errorCallback(response) {
                ErrorSystem('Không lưu được chi tiết giữ kho, Bạn vui lòng kiểm tra lại số lượng tồn trong kho');
            });
            return;
        }
        
    }, function errorCallback(response) {
        ErrorSystem(response);
        ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
    });
}

    //End Khai báo đối tượng lưu vào cơ sở dữ liệu-----------------------------------





    //Button hủy
    $scope.onHuy = function () {
        window.location.href = window.location.origin + '/GiuHang/Giu_Hang_HL';
    }
    //End button hủy

    //Show thông tin khách hàng---------------------------------------------------------------------------------------------------------------
    $scope.arrayKhachHang = {
        ma_khach_hang: '',
        ten_cong_ty: ''
    };

    //mảng khách hàng
    $scope.arrayKHFinded = [];
    $scope.arrayKH = [];
    $scope.showtable_ma_khach_hang = false;

    //get data khách hàng
    $http.get(window.location.origin + '/api/Api_KH/GET_KHACH_CUA_SALE/' + salehienthoi)
         .then(function (response) {
             if (response.data) {
                 $scope.arrayKH = response.data;
                 $scope.arrayKHFinded = $scope.arrayKH.map(function (item) {
                     return item;
                 });
             }
         }, function (error) {
             console.log(error);
         });

    //hàm tìm kiếm
    $scope.onKhachHangFind = function () {
        if (!$scope.TEN_CONG_TY) {
            $scope.arrayKHFinded = $scope.arrayKH.map(function (item) {
                return item;
            });
        }
        $scope.arrayKHFinded = $scope.arrayKH.filter(function (item) {
            if (item.TEN_CONG_TY.toLowerCase().indexOf($scope.arrayKhachHang.ma_khach_hang.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.showInfoKH = function (p_dt) {
        $scope.arrayKhachHang.ma_khach_hang = p_dt.MA_KHACH_HANG;
        $scope.arrayKhachHang.ten_cong_ty = p_dt.TEN_CONG_TY;
        $scope.showtable_ma_khach_hang = false;
    }
    //End Show thông tin khách hàng--------------------------------------------------------------------------------------------



    //Show thông tin người giữ----------------------------------------------------------------------------------------------------
    $scope.arraySaleGiu = {
        username: '',
        ho_va_ten: '',
    };

    //mảng khách hàng
    $scope.arrayNGFinded = [];
    $scope.arrayNG = [];
    $scope.showtable_sale_giu = false;

    //get data khách hàng
    $http.get(window.location.origin + '/api/Api_KH/GetAllSale')
         .then(function (response) {
             if (response.data) {
                 $scope.arrayNG = response.data;
                 $scope.arrayNGFinded = $scope.arrayNG.map(function (item) {
                     return item;
                 });
             }
         }, function (error) {
             console.log(error);
         });

    //hàm tìm kiếm
    $scope.onSaleGiuFind = function () {
        if (!$scope.HO_VA_TEN) {
            $scope.arrayNGFinded = $scope.arrayNG.map(function (item) {
                return item;
            });
        }
        $scope.arrayNGFinded = $scope.arrayNG.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.arraySaleGiu.username.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.showInfoNG = function (p_dt) {
        $scope.arraySaleGiu.username = p_dt.USERNAME;
        $scope.arraySaleGiu.ho_va_ten = p_dt.HO_VA_TEN;
        $scope.showtable_sale_giu = false;
    }
    //End Show thông tin người giữ----------------------------------------------------------------------------------------------------------------------


    //Tìm Kiếm Thông Tin hàng Hóa
    $scope.FindProduct = function (machuan) {
    
        $http({
            method: 'GET',
            data: machuan,
            url: window.location.origin + '/api/Api_TonKhoHL/GetHH_TON_KHO/'+ machuan
        }).then(function successCallback(response) {
            $scope.danhsachhanghoa = response.data;
            
        });
    }


    //button add check
    $scope.check = function (mahang, tenhang, dvt, xuatxu, dongia) {
        $scope.Detail.ListAdd.push({
            MA_HANG: mahang,
            TEN_HANG: tenhang,
            DVT: dvt,
            XUAT_XU: xuatxu,
            SL_GIU: null,
            DON_GIA: dongia,
            NGAY_XUAT: null,
            DA_XUAT: false,
            GHI_CHU: null
        });
    }
        //End Tìm Kiếm Thông Tin hàng Hóa

    
    // Tong hop giu kho kinh doanh
    $http.post('/api/Api_DonHangPO/ListHangGiuTongHop').then(function (response) {
        $scope.listgiukho_tonghop = response.data;
    });

    // Giu kho theo sale
    $http.post('/api/Api_DonHangPO/ListHangGiuTheoSale/' + isadmin + '/' + username).then(function (response) {
        $scope.listgiukho_theosale = response.data;
    });
});
