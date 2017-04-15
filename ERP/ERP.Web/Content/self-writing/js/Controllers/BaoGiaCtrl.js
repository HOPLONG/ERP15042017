
app.controller('baogiaCtrl', function ($scope, $http, baogiaService, $timeout) {

    $scope.load_baogiatheodukien = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //
        $scope.list_baogiatheodukien = [];
        baogiaService.load_baogiatheodukien(url).then(function (bcd) {
            $scope.list_baogiatheodukien = bcd;
            if ($scope.list_baogiatheodukien.length > 0) {
                $('.thongtinchungthemmoi').hide();
                $('.savethongtin').show();
            } else {              
                $('.thongtinchungthemmoi').show();
                $('.savethongtin').hide();
            }
        });
        
    };
    $scope.load_baogiatheodukien();




    $scope.kiemtra = function (item) {
        $scope.item = item;
        if ($scope.item.DON_GIA_LIST != null && $scope.item.DON_GIA_LIST != "") {
            $scope.item.DON_GIA = parseInt($scope.item.DON_GIA_LIST) - parseInt(($scope.item.DON_GIA_LIST * ($scope.item.CHIET_KHAU / 100)));
        } else if ($scope.item.DON_GIA_NHAP != null && $scope.item.DON_GIA_NHAP != "") {
            $scope.item.DON_GIA = parseInt($scope.item.DON_GIA_NHAP) + parseInt(($scope.item.DON_GIA_NHAP * ($scope.item.HE_SO_LOI_NHUAN / 100)));
        }
        $scope.item.THANH_TIEN = $scope.item.DON_GIA * $scope.item.SO_LUONG;


        var tong_thanh_tien = 0;
        var tong_tien_VAT = 0;
        var tong_tien_chua_van_chuyen = 0;
        var tong_tien_da_tinh_van_chuyen = 0;
            for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
                tong_thanh_tien = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_thanh_tien);
            }
            $scope.tong_thanh_tien_edit = tong_thanh_tien;
            $scope.tong_tien_VAT_edit = parseFloat((tong_thanh_tien / 10));
            var phi_van_chuyen = parseFloat($('#phi_van_chuyen').val()) || 0;

            tong_tien_da_tinh_van_chuyen = parseFloat($scope.tong_thanh_tien_edit + phi_van_chuyen + $scope.tong_tien_VAT_edit);
                $scope.tong_tien = tong_tien_da_tinh_van_chuyen;
    };

    $scope.test = function (detail) {
        $scope.detail = detail;
        
        if ($scope.detail.gia_list != null && $scope.detail.gia_list != "") {
            $scope.detail.don_gia = parseInt($scope.detail.gia_list) - parseInt(($scope.detail.gia_list * ($scope.detail.chiet_khau / 100)));
        } else if ($scope.detail.gia_nhap != null && $scope.detail.gia_nhap != "") {
            $scope.detail.don_gia = parseInt($scope.detail.gia_nhap) + parseInt(($scope.detail.gia_nhap * ($scope.detail.he_so_loi_nhuan / 100)));
        }
        $scope.detail.thanh_tien = $scope.detail.don_gia * $scope.detail.so_luong;



        var tong_thanh_tien_new = 0;
         tong_tien_VAT_new = 0;
        tong_tien_chua_van_chuyen_new = 0;
         tong_tien_da_tinh_van_chuyen_new = 0;
        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            tong_thanh_tien_new = parseFloat($scope.Detail.ListNew[i].thanh_tien + tong_thanh_tien_new);
        }
        $scope.tong_thanh_tien = tong_thanh_tien_new;
        $scope.tong_tien_VAT = parseFloat($scope.tong_thanh_tien / 10);

        var phi_van_chuyen = parseFloat($('#tienvanchuyen').val()) || 0;
        tong_tien_da_tinh_van_chuyen_new = parseFloat($scope.tong_thanh_tien + phi_van_chuyen + $scope.tong_tien_VAT);
        $scope.baogia = tong_tien_da_tinh_van_chuyen_new;
    };

    $scope.load_dondukien = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        baogiaService.load_dondukien(url).then(function (abc) {
            $scope.list_dondukien = abc;
        });
    };
    $scope.load_dondukien();
    //Mảng chi tiết báo giá
    $scope.Detail = {
        ListAdd: [],
        ListNew: []
    }
    $scope.Detail.ListAdd = [{
        SO_BAO_GIA: '',
        MA_HANG: '',
        SO_LUONG: 0,
        DON_GIA_LIST: 0,
        DON_GIA_NHAP : 0,
        DON_GIA: 0,
        HE_SO_LOI_NHUAN : 0,
        CHIET_KHAU: 0,
        THANH_TIEN: 0,
        TINH_TRANG_HANG: '',
        THOI_GIAN_GIAO_HANG: '',
        NGAY_GIAO_HANG: '',
        DIA_DIEM_GIAO_HANG: '',
        GHI_CHU: '',
    }];
    $scope.Detail.ListNew = [];





    var salehienthoi = $('#salehienthoi').val();
    //khai báo thông tin chung

    $scope.kiemtien = function () {
        var tongtienbaogiaabc = $scope.baogia;
        console.log(tongtienbaogiaabc);
    };


    //Khai báo đối tượng sửa vào cơ sở dữ liệu-------------------------------------
    $scope.onSave = function () {

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            if (!$scope.Detail.ListAdd[i].MA_HANG) {
                alert('Thiếu thông tin Mã hàng - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].SO_LUONG) {
                alert('Thiếu thông tin số lượng giữ - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].DON_GIA) {
                alert('Thiếu thông tin đơn giá - tại dòng ' + (i + 1));
                return;
            }

        }

        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        
        var tong_tien = parseInt($('#tong_tien').text());

        $scope.Bao_Gia = {
            SO_BAO_GIA: $scope.BangBaoGia[0].SO_BAO_GIA,
            SALES_BAO_GIA: $scope.BangBaoGia[0].SALES_BAO_GIA,
            MA_KHACH_HANG: $scope.BangBaoGia[0].MA_KHACH_HANG,
            NGAY_BAO_GIA: $scope.BangBaoGia[0].NGAY_BAO_GIA,
            MA_DU_KIEN: url,
            LIEN_HE_KHACH_HANG: $scope.BangBaoGia[0].LIEN_HE_KHACH_HANG,
            PHUONG_THUC_THANH_TOAN: $scope.BangBaoGia[0].PHUONG_THUC_THANH_TOAN,
            HAN_THANH_TOAN: $scope.BangBaoGia[0].HAN_THANH_TOAN,
            HIEU_LUC_BAO_GIA: $scope.BangBaoGia[0].HIEU_LUC_BAO_GIA,
            DIEU_KHOAN_THANH_TOAN: $scope.BangBaoGia[0].DIEU_KHOAN_THANH_TOAN,
            PHI_VAN_CHUYEN: $scope.BangBaoGia[0].PHI_VAN_CHUYEN,
            TONG_TIEN: $scope.tong_tien,
            DA_DUYET: $scope.BangBaoGia[0].DA_DUYET,
            DA_TRUNG: $scope.BangBaoGia[0].DA_TRUNG,
            DA_HUY: $scope.BangBaoGia[0].DA_HUY,
            TRUC_THUOC:'HOPLONG'
        };

    $scope.arrayChiTietBaoGia = [];

    for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
           

        var ChiTietBaoGia = {
            ID : $scope.Detail.ListAdd[i].ID,
            MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
            SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
            DON_GIA: $scope.Detail.ListAdd[i].DON_GIA,
            CHIET_KHAU: $scope.Detail.ListAdd[i].CHIET_KHAU,
            DON_GIA_LIST: $scope.Detail.ListAdd[i].DON_GIA_LIST,
            DON_GIA_NHAP: $scope.Detail.ListAdd[i].DON_GIA_NHAP,
            HE_SO_LOI_NHUAN: $scope.Detail.ListAdd[i].HE_SO_LOI_NHUAN,
            THANH_TIEN: $scope.Detail.ListAdd[i].THANH_TIEN,
            TINH_TRANG_HANG: $scope.Detail.ListAdd[i].TINH_TRANG_HANG,
            THOI_GIAN_GIAO_HANG: $scope.Detail.ListAdd[i].THOI_GIAN_GIAO_HANG,
            NGAY_GIAO_HANG: $scope.Detail.ListAdd[i].NGAY_GIAO_HANG,
            DIA_DIEM_GIAO_HANG: $scope.Detail.ListAdd[i].DIA_DIEM_GIAO_HANG,
            GHI_CHU: $scope.Detail.ListAdd[i].GHI_CHU,
        }
        //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
        $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
    }

    //Lưu vào CSDL
          
    $http({
        method: 'PUT',
        data: $scope.Bao_Gia,
        url: window.location.origin + '/api/Api_BaoGia/' + $scope.Bao_Gia.SO_BAO_GIA
    }).then(function successCallback(response) {
        $scope.Bao_Gia = response.data;

        $scope.Bao_Gia.SO_BAO_GIA;

        for (var i = 0; i < $scope.arrayChiTietBaoGia.length; i++) {
            $scope.arrayChiTietBaoGia[i].SO_BAO_GIA = $scope.Bao_Gia.SO_BAO_GIA;
        }


        if ($scope.arrayChiTietBaoGia.length > 0) {
            $http({
                method: 'POST',
                data: $scope.arrayChiTietBaoGia,
                url: window.location.origin + '/api/Api_ChiTietBaoGia/PutBH_CT_BAO_GIA'
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
}

    //End Khai báo đối tượng lưu vào cơ sở dữ liệu-----------------------------------

    //Thêm mới vào csdl
    $scope.AddNew = function () {


        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        var tongtien = parseInt($('#tongtienbaogia').text());
        $scope.BANGBAOGIA = {
            SALES_BAO_GIA: salehienthoi,
            MA_KHACH_HANG: $scope.list_dondukien[0].MA_KHACH_HANG,
            MA_DU_KIEN: url,
            LIEN_HE_KHACH_HANG: $scope.list_dondukien[0].ID_LIEN_HE,
            PHUONG_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
            HAN_THANH_TOAN: $scope.han_thanh_toan,
            HIEU_LUC_BAO_GIA: $scope.hieu_luc_bao_gia,
            DIEU_KHOAN_THANH_TOAN: $scope.dieu_khoan_thanh_toan,
            PHI_VAN_CHUYEN: $scope.phivanchuyen,
            TONG_TIEN: $scope.baogia,
            DA_DUYET: false,
            DA_TRUNG: false,
            DA_HUY: false,
            TRUC_THUOC: 'HOPLONG'
        };

        $scope.arrayBaoGiaChiTiet = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {


            var BaoGiaChiTiet = {
                MA_HANG: $scope.Detail.ListNew[i].ma_hang,
                SO_LUONG: $scope.Detail.ListNew[i].so_luong,
                DON_GIA_LIST:$scope.Detail.ListNew[i].gia_list,
                DON_GIA_NHAP:$scope.Detail.ListNew[i].gia_nhap,
                HE_SO_LOI_NHUAN: $scope.Detail.ListNew[i].he_so_loi_nhuan,
                DON_GIA: $scope.Detail.ListNew[i].don_gia,
                CHIET_KHAU: $scope.Detail.ListNew[i].chiet_khau,
                THANH_TIEN: $scope.Detail.ListNew[i].thanh_tien,
                TINH_TRANG_HANG: $scope.Detail.ListNew[i].tinh_trang_hang,
                THOI_GIAN_GIAO_HANG: $scope.Detail.ListNew[i].thoi_gian_giao_hang,
                NGAY_GIAO_HANG: $scope.Detail.ListNew[i].ngay_giao_hang,
                DON_GIA_SAU_CHIET_KHAU: $scope.Detail.ListNew[i].don_gia_sau_chiet_khau,
                DIA_DIEM_GIAO_HANG: $scope.Detail.ListNew[i].dia_diem_giao_hang,
                GHI_CHU: $scope.Detail.ListNew[i].GHI_CHU,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayBaoGiaChiTiet.push(BaoGiaChiTiet);
        }

        //Lưu vào CSDL

        $http({
            method: 'POST',
            data: $scope.BANGBAOGIA,
            url: window.location.origin + '/api/Api_BaoGia'
        }).then(function successCallback(response) {
            $scope.BANGBAOGIA = response.data;
            if (!$scope.BANGBAOGIA) {
                alert('Không lưu được thông tin chung của giữ hàng');
                return;
            }
            $scope.BANGBAOGIA.SO_BAO_GIA;

            for (var i = 0; i < $scope.arrayBaoGiaChiTiet.length; i++) {
                $scope.arrayBaoGiaChiTiet[i].SO_BAO_GIA = $scope.BANGBAOGIA.SO_BAO_GIA;
            }


            if ($scope.arrayBaoGiaChiTiet.length > 0) {
                $http({
                    method: 'POST',
                    data: $scope.arrayBaoGiaChiTiet,
                    url: window.location.origin + '/api/Api_ChiTietBaoGia'
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
    }
    //End thêm mới

    //Button hủy
    $scope.onHuy = function () {
        window.location.href = window.location.origin + '/GiuHang/Giu_Hang_HL';
    }
    //End button hủy

    $scope.CreateNewQuotation = function () {
           $('.thongtinchungthemmoi').show();
           $('.savethongtin').hide();       
    };



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
    $scope.onKHFind = function () {
        if (!$scope.TEN_CONG_TY) {
            $scope.arrayKHFinded = $scope.arrayKH.map(function (item) {
                return item;
            });
        }
        $scope.arrayKHFinded = $scope.arrayKH.filter(function (item) {
            if (item.TEN_CONG_TY.toLowerCase().indexOf($scope.arrayKhachHang.ten_cong_ty.toLowerCase()) >= 0) {
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
        $scope.arrayKhachHang.VAN_PHONG_GIAO_DICH = p_dt.VAN_PHONG_GIAO_DICH;
        $scope.arrayKhachHang.DIA_CHI_XUAT_HOA_DON = p_dt.DIA_CHI_XUAT_HOA_DON;
        $scope.showtable_ma_khach_hang = false;
    }
    //End Show thông tin khách hàng--------------------------------------------------------------------------------------------

    //Show thông tin don hang du kien---------------------------------------------------------------------------------------------------------------
    $scope.arrayIDDuKien = {
        ma_du_kien: '',
    };

    //mảng don hang du kien
    $scope.arrayDuKienFinded = [];
    $scope.arrayDuKien = [];
    $scope.showtable_DuKien = false;

    //get data don hang du kien
    $http.get(window.location.origin + '/api/Api_BaoGia_DonHangDuKien')
         .then(function (response) {
             if (response.data) {
                 $scope.arrayDuKien = response.data;
                 $scope.arrayDuKienFinded = $scope.arrayDuKien.map(function (item) {
                     return item;
                 });
             }

         }, function (error) {
             console.log(error);
         });

    //hàm tìm kiếm
    $scope.onDuKienFind = function () {
        if (!$scope.MA_DU_KIEN) {
            $scope.arrayDuKienFinded = $scope.arrayDuKien.map(function (item) {
                return item;
            });
        }
        $scope.arrayDuKienFinded = $scope.arrayDuKien.filter(function (item) {
            if (item.MA_DU_KIEN.toLowerCase().indexOf($scope.arrayIDDuKien.ma_du_kien.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // hiển thị danh sách ma du kien(LẤY THEO MÃ)
    $scope.showInfoDuKien = function (p_dt) {
        $scope.arrayIDDuKien.ma_du_kien = p_dt.MA_DU_KIEN;
        $scope.arrayIDDuKien.ngay_tao = p_dt.NGAY_TAO;
        $scope.showtable_DuKien = false;
    }
    //End Show thông tin don hang du kien--------------------------------------------------------------------------------------------




    //Show thông tin người giữ----------------------------------------------------------------------------------------------------
    $scope.arraySaleGiu = {
        username: '',
        ho_va_ten: '',
    };

    //mảng nguoi giu
    $scope.arrayNGFinded = [];
    $scope.arrayNG = [];
    $scope.showtable_sale_giu = false;

    //get data nguoi giu
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



    $scope.run_lienhe = function () {
        //Show thông tin lien he---------------------------------------------------------------------------------------------------------------
        $scope.arrayLienHe = {
            id_lien_he: '',
            nguoi_lien_he: '',
        };

        //mảng nguoi giu
        $scope.arrayLienHeFinded = [];
        $scope.arrayLH = [];
        $scope.showtable_LienHe = false;

        var makh = $scope.arrayKhachHang.ma_khach_hang;
        //get data nguoi giu
        $http.get(window.location.origin + '/api/Api_BaoGia/GetLienHeKhach/' + makh)
             .then(function (response) {
                 if (response.data) {
                     $scope.arrayLH = response.data;
                     $scope.arrayLienHeFinded = $scope.arrayLH.map(function (item) {
                         return item;
                     });
                 }
             }, function (error) {
                 console.log(error);
             });

        //hàm tìm kiếm
        $scope.onLienHeFind = function () {
            if (!$scope.NGUOI_LIEN_HE) {
                $scope.arrayLienHeFinded = $scope.arrayLH.map(function (item) {
                    return item;
                });
            }
            $scope.arrayLienHeFinded = $scope.arrayLH.filter(function (item) {
                if (item.NGUOI_LIEN_HE.toLowerCase().indexOf($scope.arrayLienHe.nguoi_lien_he.toLowerCase()) >= 0) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
        $scope.showInfoLienHe = function (p_dt) {
            $scope.arrayLienHe.id_lien_he = p_dt.ID_LIEN_HE;
            $scope.arrayLienHe.nguoi_lien_he = p_dt.NGUOI_LIEN_HE;
            $scope.showtable_LienHe = false;
        }
        //End Show thông tin lien he--------------------------------------------------------------------------------------------

    };
    
    
    
    //Tìm Kiếm Thông Tin hàng Hóa thêm mới
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
        $scope.Detail.ListNew.push({
            ma_hang: mahang,
            so_luong: 0,
            gia_list: dongia,
            gia_nhap: 0,
            don_gia: '',
            he_so_loi_nhuan: 0,
            chiet_khau: 0,
            thanh_tien: 0,
            tinh_trang_hang: '',
            thoi_gian_giao_hang: '',
            ngay_giao_hang: '',
            dia_diem_giao_hang: '',
            ghi_chu: '',

        });
        
    }

        $scope.FindProduct = function (machuan) {
    
        $http({
            method: 'GET',
            data: machuan,
            url: window.location.origin + '/api/Api_TonKhoHL/GetHH_TON_KHO/'+ machuan
        }).then(function successCallback(response) {
            $scope.danhsachhanghoa = response.data;
            
        });
    }



    $scope.thembaogia = function (baogia) {
        $scope.baogia = baogia;
        $('.thongtinchungthemmoi').hide();
        $('.savethongtin').show();

        baogiaService.get_phieubaogia($scope.baogia.SO_BAO_GIA).then(function (a) {
            $scope.BangBaoGia = a;
        });

        baogiaService.get_ct_phieubaogia($scope.baogia.SO_BAO_GIA).then(function (b) {
            $scope.Detail.ListAdd = b;
            var tong_thanh_tien = 0;
            var tong_tien_VAT = 0;
            var tong_tien_chua_van_chuyen = 0;
            var tong_tien_da_tinh_van_chuyen = 0;
            for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
                tong_thanh_tien = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_thanh_tien);
            }
            $scope.tong_thanh_tien_edit = tong_thanh_tien;
            $scope.tong_tien_VAT_edit = parseFloat($scope.tong_thanh_tien_edit / 10);
            var phi_van_chuyen = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-phivanchuyen').text());

            tong_tien_da_tinh_van_chuyen = parseFloat($scope.tong_thanh_tien_edit + phi_van_chuyen + $scope.tong_tien_VAT_edit);
            $scope.tong_tien = tong_tien_da_tinh_van_chuyen;
        });
    };
        //End Tìm Kiếm Thông Tin hàng Hóa them


    //Tìm Kiếm Thông Tin hàng Hóa lưu
    $scope.TimKiem = function (machuan) {
    
        $http({
            method: 'GET',
            data: machuan,
            url: window.location.origin + '/api/Api_TonKhoHL/GetHH_TON_KHO/'+ machuan
        }).then(function successCallback(response) {
            $scope.danhsachhanghoaluu = response.data;
            
        });
    }


    //button add check
    $scope.newsave = function (mahang, tenhang, dvt, xuatxu, dongia) {
        $scope.Detail.ListAdd.push({
            MA_HANG: mahang,
            SO_LUONG: 0,
            DON_GIA_LIST: dongia,
            DON_GIA_NHAP: 0,
            DON_GIA: 0,
            HE_SO_LOI_NHUAN: 0,
            CHIET_KHAU: 0,
            THANH_TIEN: 0,
            TINH_TRANG_HANG: '',
            THOI_GIAN_GIAO_HANG: '',
            NGAY_GIAO_HANG: '',
            DIA_DIEM_GIAO_HANG: '',
            GHI_CHU: '',
        });
    }
    // End hang hoa luu




    $scope.phuongthuctt = ["Chuyển khoản", "Tiền mặt","Trả tiền sau khi nhận hàng"];
    $scope.cachtinhthanhtien = ['Giá nhập','Giá list'];
    $scope.dieukhoantt = ['5 ngày', '7 ngày', '30 ngày', 'Ngày 5 hàng tháng', 'Ngày 15 hàng tháng', 'Ngày 30 hàng tháng'];
    $scope.ck_vat = [0,5,10];

    $scope.phuongthucttnew = ["Chuyển khoản", "Tiền mặt", "Trả tiền sau khi nhận hàng"];
    $scope.cachtinhthanhtiennew = ['Giá nhập', 'Giá list'];
    $scope.dieukhoanttnew = ['5 ngày', '7 ngày', '30 ngày', 'Ngày 5 hàng tháng', 'Ngày 15 hàng tháng', 'Ngày 30 hàng tháng'];
    $scope.ck_vat_new = [0,5,10];
});

