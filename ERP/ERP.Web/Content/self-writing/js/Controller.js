app.controller('giamdocCtrl', function (giamdocService, $scope) {
    $scope.push = function (username) {
        giamdocService.get_giamdoc(username).then(function (a) {
            $scope.listgiamdoc = a;
        });
    };

});


// Kho giu hang
app.controller('khogiuhangCtrl', function (khogiuhangService, $scope, $location, $http, $timeout, $q, $log) {
    $scope.load_khogiuhang = function () {
        khogiuhangService.get_khogiuhang().then(function (a) {
            $scope.list_khogiuhang = a;
        });
    };
    $scope.load_khogiuhang();

    $scope.save = function (entry) {
        $scope.entry = entry;

        var data_save = {
            MA_GIU_KHO: $scope.entry.MA_GIU_KHO,
            SALES_GIU: $scope.entry.SALES_GIU,
            MA_KHACH_HANG: $scope.entry.MA_KHACH_HANG,
            NGAY_GIU: $scope.entry.NGAY_GIU,
            HUY_DON_GIU: $scope.entry.HUY_DON_GIU,
            DON_DANG_XUAT: $scope.entry.DON_DANG_XUAT,
            DON_DA_HOAN_THANH: $scope.entry.DON_DA_HOAN_THANH,
        }
        khogiuhangService.save_khogiuhang($scope.entry.MA_GIU_KHO, data_save).then(function (response) {
            $scope.load_khogiuhang();
        });
    };

    $scope.save_edit = function (item) {
        $scope.item = item;
        $scope.item.THANH_TIEN = $scope.item.DON_GIA * $scope.item.SL_GIU;
        var data_save = {
            ID: $scope.item.ID,
            MA_GIU_KHO: $scope.item.MA_GIU_KHO,
            MA_HANG: $scope.item.MA_HANG,
            DVT: $scope.item.DVT,
            XUAT_XU: $scope.item.XUAT_XU,
            SL_GIU: $scope.item.SL_GIU,
            DON_GIA: $scope.item.DON_GIA,
            THANH_TIEN: $scope.item.THANH_TIEN,
            NGAY_XUAT: $scope.item.NGAY_XUAT,
            DA_XUAT: $scope.item.DA_XUAT,
            GHI_CHU : $scope.item.GHI_CHU,
        }
        khogiuhangService.save_ct_khogiuhang($scope.item.ID, data_save).then(function (response) {
            $scope.load_khogiuhang();
        });
    };


    $scope.add = function () {
        var data_add = {
            SALES_GIU: $scope.nvkd.USERNAME,
            NGAY_GIU: $scope.ngay_giu.format('DD-MM-YYYY'),
            MA_KHACH_HANG: $scope.kh.MA_KHACH_HANG,
            HUY_DON_GIU: $scope.huy_don_giu,
            DON_DANG_XUAT: $scope.don_dang_xuat,
            DON_DA_HOAN_THANH: $scope.don_da_hoan_thanh,
            TRUC_THUOC : 'HOPLONG'
        }
        khogiuhangService.add_khogiuhang(data_add).then(function successCallback(response) {
            $scope.magiuhangmoi = response.data;

            $http({
                method: 'GET',
                data: $scope.magiuhang_new,
                url: window.location.origin + '/api/Api_ChiTietKhoGiuHang/GetMaGiuHang'
            }).then(function (response) {
                $scope.load_khogiuhang();
                $scope.magiuhang_new = response.data;

                $scope.Chi_tiet_giu_hang = [];
                for (var i = 0; i < $scope.arraychitiet.length; i++) {
                    var chitiet = {
                        MA_GIU_KHO: '',
                        MA_HANG: $scope.arraychitiet[i].ma_hang,
                        SL_GIU: $scope.arraychitiet[i].so_luong_giu,
                        NGAY_XUAT: $scope.arraychitiet[i].ngay_xuat.format('DD-MM-YYYY'),
                        DA_XUAT: $scope.arraychitiet[i].da_xuat,
                        GHI_CHU: $scope.arraychitiet[i].ghi_chu,
                    }
                    $scope.Chi_tiet_giu_hang.push(chitiet);
                }

                for (var i = 0; i < $scope.Chi_tiet_giu_hang.length; i++) {
                    $scope.Chi_tiet_giu_hang[i].MA_GIU_KHO = $scope.magiuhang_new;
                }

                if ($scope.Chi_tiet_giu_hang.length > 0) {
                    $http({
                        method: 'POST',
                        data: $scope.Chi_tiet_giu_hang,
                        url: window.location.origin + '/api/Api_ChiTietKhoGiuHang'
                    }).then(function successCallback(response1) {
                        $scope.load_khogiuhang();
                    }, function errorCallback(response1) {
                        alert('Lỗi tạo chi tiết giữ hàng');
                    });

                }
            });

            
        }, function errorCallback(response) {
            alert('Tạo giữ hàng lỗi')
        });


    };

    $scope.get_chitietgiuhang = function (entry) {
        $scope.entry = entry;
        var magiukho = $scope.entry.MA_GIU_KHO;
        khogiuhangService.get_chitietgiuhang(magiukho).then(function (chitietgiukho) {
            $scope.list_chitietgiukho = chitietgiukho;
        });
    };

    var tmpDate = new Date();

    $scope.newField = {};

    $scope.editing = false;

    $scope.editAppKey = function (field) {
        
        $scope.newField = angular.copy(field);
    }

    $scope.saveField = function (index) {
        if ($scope.editing !== false) {
            $scope.appkeys[$scope.editing] = $scope.newField;
            $scope.editing = false;
        }
    };

    $scope.cancel = function (index) {
        //if ($scope.editing !== false) {
        //    $scope.appkeys[$scope.editing] = $scope.newField;
        //    $scope.editing = false;
        //}
        $scope.load_khogiuhang();
    };



    $scope.arraychitiet = [{
        ma_hang: '',
        so_luong_giu: '',
        ngay_xuat: '',
        da_xuat: '',
        ghi_chu: '',
    }]

    $scope.addtoshow = function () {
        
        $scope.range = function (min, soluong, step) {
            var soluong = $('#number').val();
            step = step || 1;
            var input = [];
            for (var i = min; i <= soluong; i += step) input.push(i);
            return input;
        };
        $('.themchitiet').show();
    };

    

    $scope.test = function () {
        var self = this;
        var abc = $scope.item.USERNAME;
        console.log(abc);
    };

    //Lọc nhân viên
    $scope.arrayNVFinded = [];
    $scope.arrayStaffs = [];
    $scope.showtable_ho_va_ten = false;

    $http.get(window.location.origin + '/api/Api_NhanvienKD')
            .then(function (response) {
                if (response.data) {
                    $scope.arrayStaffs = response.data;
                    $scope.arrayNVFinded = $scope.arrayStaffs.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.onNhanVienFind = function () {
        if (!$scope.HO_VA_TEN) {
            $scope.arrayNVFinded = $scope.arrayStaffs.map(function (item) {
                return item;
            });
        }
        $scope.arrayNVFinded = $scope.arrayStaffs.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.nvkd.HO_VA_TEN.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfoStaff = function (staff) {
        $scope.nvkd = staff;
        $scope.showtable_ho_va_ten = false;
    }
    // End Lọc nhân viên

    // Lọc khách hàng
    $scope.arrayKHFinded = [];
    $scope.arrayClient = [];
    $scope.showtable_khach_hang = false;

    $http.get(window.location.origin + '/api/Api_ListKH')
            .then(function (response) {
                if (response.data) {
                    $scope.arrayClient = response.data;
                    $scope.arrayKHFinded = $scope.arrayClient.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.onKHFind = function () {
        if (!$scope.TEN_CONG_TY) {
            $scope.arrayKHFinded = $scope.arrayClient.map(function (item) {
                return item;
            });
        }
        $scope.arrayKHFinded = $scope.arrayClient.filter(function (item) {
            if (item.TEN_CONG_TY.toLowerCase().indexOf($scope.kh.TEN_CONG_TY.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfoKH = function (staff) {
        $scope.kh = staff;
        $scope.showtable_khach_hang = false;
    }
    // End lọc khách hàng
});
// End kho giu hang


// Khach hang
app.controller('khachhangCtrl', function (khachhangService, $scope, $http, $location) {
    //Phan trang kh
    function pageClick2(pageNumber) {
        var salestao = $('#salehienthoi').val();
        $("#page-number-2").text(pageNumber);
        $http({
            method: 'POST',
            data: $scope.filtered,
            url: window.location.origin + '/api/Api_KH/PhantrangKH/' + pageNumber + '/' + salestao
        }).then(function successCallback(response) {
            $scope.filtered = response.data;
        });
    }
        var itemsCount = 2000;
        var itemsOnPage = 10;


        var pagination2 = new Pagination({
            container: $("#pagination-2"),
            pageClickCallback: pageClick2,
            maxVisibleElements: 16,
            showInput: true,
            inputTitle: "Go to page"
        });
        pagination2.make(itemsCount, itemsOnPage);
    //End phan trang kh

    //Phan trang thong ke mua hang
        function pageClick3(pageNumber) {
            $("#page-number-3").text(pageNumber);
            var makh = $('#MA_KHach_HANG').text();
            $http({
                method: 'POST',
                data: $scope.thong_ke_mua_hang,
                url: window.location.origin + '/api/Api_KH/ThongKeMuaHang/' + makh + '/' + pageNumber
            }).then(function successCallback(response) {
                $scope.thong_ke_mua_hang = response.data;
            });
        }

        var tongso = 2000;
        var sohienthi = 10;


        var pagination3 = new Pagination({
            container: $("#pagination-3"),
            pageClickCallback: pageClick3,
            maxVisibleElements: 10,
            showInput: true,
            inputTitle: "Go to page"
        });
        pagination3.make(tongso, sohienthi);
    // End phan trang thong ke mua hang


        function phantrangkh(pageNumber) {
        var salestao = $('#salehienthoi').val();
        $http({
            method: 'POST',
            data: $scope.filtered,
            url: window.location.origin + '/api/Api_KH/PhantrangKH/' + pageNumber + '/' + salestao
        }).then(function successCallback(response) {
            $scope.filtered = response.data;
        });
    };
        phantrangkh(1);


        function thongkemuahang(pageNumber) {
            var salestao = $('#salehienthoi').val();
            $http({
                method: 'POST',
                data: $scope.filtered,
                url: window.location.origin + '/api/Api_KH/PhantrangKH/' + pageNumber + '/' + salestao
            }).then(function successCallback(response) {
                $scope.filtered = response.data;
            });
        };
        phantrangkh(1);

    $scope.createnew = function () {
        var salestao = $('#salehienthoi').val();
        var logo = $('#imgInp').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];


        $("textarea[name=themghichu]").val(CKEDITOR.instances.themghichu.getData());
        var themghichu = $("[name=themghichu]").val();


        $scope.Thong_tin_KH = {
            LOGO: name_without_ext,
            TEN_CONG_TY: $scope.arraythongtin.ten_cong_ty,
            VAN_PHONG_GIAO_DICH: $scope.arraythongtin.van_phong_giao_dich,
            DIA_CHI_XUAT_HOA_DON: $scope.arraythongtin.dia_chi_xuat_hoa_don,
            MA_SO_THUE: $scope.arraythongtin.ma_so_thue,
            WEBSITE: $scope.arraythongtin.website,
            HOTLINE: $scope.arraythongtin.hotline,
            FAX: $scope.arraythongtin.fax,
            DIEU_KHOAN_THANH_TOAN: $scope.arraythongtin.dieu_khoan_thanh_toan,
            SO_NGAY_DUOC_NO: $scope.arraythongtin.so_ngay_duoc_no,
            SO_NO_TOI_DA: $scope.arraythongtin.so_no_toi_da,
            EMAIL: $scope.arraythongtin.email,
            GHI_CHU: themghichu,
            TINH: $scope.arraythongtin.tinh,
            TINH_TRANG_HOAT_DONG: $scope.arraythongtin.tinh_trang_hoat_dong,
            QUOC_GIA: $scope.arraythongtin.quoc_gia,
            TRUC_THUOC: 'HOPLONG',
            SALES_TAO: salestao,
        }


        $scope.Tai_khoan_KH = [];
        for (var i = 0; i < $scope.arraytaikhoan.length; i++) {
            var tai_khoan = {
                MA_KHACH_HANG: '',
                SO_TAI_KHOAN: $scope.arraytaikhoan[i].so_tai_khoan,
                TEN_TAI_KHOAN: $scope.arraytaikhoan[i].ten_tai_khoan,
                TEN_NGAN_HANG: $scope.arraytaikhoan[i].ten_ngan_hang,
                CHI_NHANH: $scope.arraytaikhoan[i].chi_nhanh,
                TINH_TP: $scope.arraytaikhoan[i].tinh_tp,
                LOAI_TAI_KHOAN: $scope.arraytaikhoan[i].loai_tai_khoan,
            }
            $scope.Tai_khoan_KH.push(tai_khoan);
        }


        $scope.Lien_he_TK = [];
        for (var i = 0; i < $scope.arraylienhe.length; i++) {
            var lien_he = {
                MA_KHACH_HANG: '',
                NGUOI_LIEN_HE: $scope.arraylienhe[i].nguoi_lien_he,
                CHUC_VU: $scope.arraylienhe[i].chuc_vu,
                PHONG_BAN: $scope.arraylienhe[i].phong_ban,
                NGAY_SINH: $scope.arraylienhe[i].ngay_sinh,
                GIOI_TINH: $scope.arraylienhe[i].gioi_tinh,
                EMAIL_CA_NHAN: $scope.arraylienhe[i].email_ca_nhan,
                EMAIL_CONG_TY: $scope.arraylienhe[i].email_cong_ty,
                SKYPE: $scope.arraylienhe[i].skype,
                FACEBOOK: $scope.arraylienhe[i].facebook,
                SDT1: $scope.arraylienhe[i].so_dien_thoai1,
                SDT2: $scope.arraylienhe[i].so_dien_thoai2,
                SALES_PHU_TRACH: $scope.arraylienhe[i].sales_phu_trach,
                SALES_MOI : $scope.arraylienhe[i].sales_moi,
                SALES_CU: $scope.arraylienhe[i].sales_cu,
                SALE_HIEN_THOI: $scope.arraylienhe[i].sales_phu_trach,
                TINH_TRANG_LAM_VIEC: $scope.arraylienhe[i].tinh_trang_lam_viec,
            }
            $scope.Lien_he_TK.push(lien_he);
        }


        $http({
            method: 'POST',
            data: $scope.Thong_tin_KH,
            url: window.location.origin + '/api/Api_KH'
        }).then(function successCallback(response) {
            $scope.Thong_tin_KH = response.data;

            $http({
                method: 'GET',
                data: $scope.lastmakh,
                url: window.location.origin + '/api/Api_KH/GetIdKH'
            }).then(function successCallback(response) {
                $scope.lastmakh = response.data;

                var phanloaikh_add = {
                    MA_KHACH_HANG: $scope.lastmakh,
                    MA_LOAI_KHACH: $scope.ma_loai_khach,
                    NHOM_NGANH : $scope.nhom_nganh
                }
                khachhangService.add_phanloaikh(phanloaikh_add).then(function (response) {
                    $scope.load_khachhang('A');
                });

                var chuyensale_add = {
                    MA_KHACH_HANG: $scope.lastmakh,
                    SALE_HIEN_THOI : salestao,
                }
                khachhangService.add_saletao(chuyensale_add).then(function (response) {
                    $scope.load_khachhang('A');
                });

                if (!$scope.Thong_tin_KH) {
                    alert('Thông tin chung Khách hàng lỗi');
                    return;
                }

                for (var i = 0; i < $scope.Tai_khoan_KH.length; i++) {
                    $scope.Tai_khoan_KH[i].MA_KHACH_HANG = $scope.lastmakh;
                }

                for (var i = 0; i < $scope.Lien_he_TK.length; i++) {
                    $scope.Lien_he_TK[i].MA_KHACH_HANG = $scope.lastmakh;
                }

                if ($scope.Lien_he_TK.length > 0) {
                    $http({
                        method: 'POST',
                        data: $scope.Lien_he_TK,
                        url: window.location.origin + '/api/Api_ArrayLienHeKH'
                    }).then(function successCallback(zzz) {

                    }, function errorCallback(zzz) {
                        alert('Liên hệ Khách hàng lỗi');
                    });

                }

                if ($scope.Tai_khoan_KH.length > 0) {
                    $http({
                        method: 'POST',
                        data: $scope.Tai_khoan_KH,
                        url: window.location.origin + '/api/Api_TaiKhoanKH/' + $scope.lastmakh
                    }).then(function successCallback(response1) {

                    }, function errorCallback(response1) {
                        alert('Tài khoản khách hàng lỗi');
                    });
                }                
            });
           
        });
    };

   //Load khách Hàng
   
    $scope.load_khachhang = function (tukhoa) {
        var salehienthoi = $('#salehienthoi').val();
        khachhangService.get_khachhang(salehienthoi, tukhoa).then(function (a) {
            $scope.list_kh = a;
        });
    };
    $scope.load_khachhang('A');

    $scope.load_phanloaikhach = function () {
        khachhangService.get_phanloaikhach().then(function (b) {
            $scope.list_phanloai = b;
        });
    };
    $scope.load_phanloaikhach();

    $scope.load_nhanvienkd = function () {
        khachhangService.get_nhanvienkd().then(function (c) {
            $scope.list_nhanvienkd = c;
        });
    };
    $scope.load_nhanvienkd();

    $scope.load_loaitaikhoan = function () {
        khachhangService.get_loaitk().then(function (h) {
            $scope.list_loaitaikhoan = h;
        });
    };
    $scope.load_loaitaikhoan();

    $scope.get_lienhe = function (makh) {
        khachhangService.get_lienhekh(makh).then(function (a) {
            $scope.list_lienhe = a;
        });
    };

    $scope.get_taikhoan = function (makh) {
        khachhangService.get_taikhoankh(makh).then(function (b) {
            $scope.list_taikhoankh = b;
        });
    };

    $scope.get_thongkemuahang = function (makh) {
        $http({
            method: 'POST',
            data: $scope.thong_ke_mua_hang,
            url: window.location.origin + '/api/Api_KH/ThongKeMuaHang/' + makh + '/' + 1
        }).then(function successCallback(response) {
            $scope.thong_ke_mua_hang = response.data;
        });
    };

    $scope.get_phanhoi = function (makh) {
        khachhangService.get_phanhoi(makh).then(function (c) {
            $scope.list_phanhoi = c;
        });
    };

    $scope.transfer = function (item) {
        $scope.item = item;
    };

    $scope.details = function (lienhe) {
        $scope.lienhe = lienhe;
    };

    $scope.edit = function (item) {
        $scope.kh = item;
        var ghichuvalue = $('.' + item.MA_KHACH_HANG + '-1').html();
        CKEDITOR.instances.editghichu.setData(ghichuvalue);
    };

    $scope.EditLienHe = function (lienhe) {
        $scope.editlh = lienhe;
    };

    $scope.save = function (makh, id) {
        var logo = $('#imgEdit').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];

        $("textarea[name=editghichu]").val(CKEDITOR.instances.editghichu.getData());
        var editghichu = $("[name=editghichu]").val();

        var kh_save = {
            MA_KHACH_HANG: makh,
            TEN_CONG_TY: $scope.kh.TEN_CONG_TY,
            VAN_PHONG_GIAO_DICH: $scope.kh.VAN_PHONG_GIAO_DICH,
            DIA_CHI_XUAT_HOA_DON: $scope.kh.DIA_CHI_XUAT_HOA_DON,
            TINH: $scope.kh.TINH,
            QUOC_GIA: $scope.kh.QUOC_GIA,
            MST: $scope.kh.MST,
            HOTLINE: $scope.kh.HOTLINE,
            EMAIL: $scope.kh.EMAIL,
            FAX: $scope.kh.FAX,
            LOGO: name_without_ext,
            TINH_TRANG_HOAT_DONG: $scope.kh.TINH_TRANG_HOAT_DONG,
            WEBSITE: $scope.kh.WEBSITE,
            DIEU_KHOAN_THANH_TOAN: $scope.kh.DIEU_KHOAN_THANH_TOAN,
            SO_NGAY_DUOC_NO: $scope.kh.SO_NGAY_DUOC_NO,
            SO_NO_TOI_DA: $scope.kh.SO_NO_TOI_DA,
            GHI_CHU: editghichu,
            TRUC_THUOC: "HOPLONG"
        }
        khachhangService.save_khachhang(makh, kh_save).then(function (response) {
            $scope.load_khachhang('A');
            var phanloai_save = {
                ID: id,
                MA_KHACH_HANG: makh,
                MA_LOAI_KHACH: $scope.kh.MA_LOAI_KHACH
            }
            var phanloai_add = {
                MA_KHACH_HANG: makh,
                MA_LOAI_KHACH: $scope.kh.MA_LOAI_KHACH
            }
            if (id != null) {
                khachhangService.save_phanloaikh(id, phanloai_save).then(function (response) {
                    $scope.load_khachhang('A');
                    $scope.new_ct_khachhang();
                });
            } else if (id == null && $scope.kh.MA_LOAI_KHACH != null) {
                khachhangService.add_phanloaikh(phanloai_add).then(function (response) {
                    $scope.load_khachhang('A');
                    $scope.new_ct_khachhang();
                });
            }
           
        });
    };

    $scope.savelienhe = function (idlienhe) {
        var data_save = {
            ID_LIEN_HE: idlienhe,
            MA_KHACH_HANG: $scope.editlh.MA_KHACH_HANG,
            NGUOI_LIEN_HE: $scope.editlh.NGUOI_LIEN_HE,
            CHUC_VU: $scope.editlh.CHUC_VU,
            PHONG_BAN: $scope.editlh.PHONG_BAN,
            NGAY_SINH: $scope.editlh.NGAY_SINH,
            GIOI_TINH: $scope.editlh.GIOI_TINH,
            EMAIL_CA_NHAN: $scope.editlh.EMAIL_CA_NHAN,
            EMAIL_CONG_TY: $scope.editlh.EMAIL_CONG_TY,
            SKYPE: $scope.editlh.SKYPE,
            FACEBOOK: $scope.editlh.FACEBOOK,
            GHI_CHU: $scope.editlh.GHI_CHU,
            SDT1: $scope.editlh.SDT1,
            SDT2: $scope.editlh.SDT2,
            TINH_TRANG_LAM_VIEC: $scope.editlh.TINH_TRANG_LAM_VIEC,
        }
        khachhangService.save_lienhe(idlienhe, data_save).then(function (response) {
            $scope.load_khachhang();

            var data_savesalesphutrach = {
                SALES_CU: $scope.editlh.SALES_CU,
                SALES_MOI: $scope.editlh.SALES_MOI,
                ID_LIEN_HE: idlienhe,
                SALES_PHU_TRACH: $scope.editlh.SALES_PHU_TRACH,
                NGAY_KET_THUC_PHU_TRACH: $scope.editlh.NGAY_KET_THUC_PHU_TRACH,
                TRANG_THAI : $scope.editlh.TRANG_THAI,
            }
            khachhangService.save_salesphutrach($scope.editlh.SALES_PHU_TRACH, idlienhe, data_savesalesphutrach).then(function (response) {
                $scope.load_khachhang('A');
                $scope.new_ct_khachhang();
            });

        });
    };

    $scope.addnew = function (makh) {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        var data_add = {
            MA_KHACH_HANG: makh,
            NGUOI_LIEN_HE: $scope.nguoi_lien_he,
            CHUC_VU: $scope.chuc_vu,
            PHONG_BAN: $scope.phong_ban,
            NGAY_SINH: $scope.ngay_sinh,
            GIOI_TINH: $scope.gioi_tinh,
            EMAIL_CA_NHAN: $scope.email_ca_nhan,
            EMAIL_CONG_TY: $scope.email_cong_ty,
            SKYPE: $scope.skype,
            FACEBOOK: $scope.facebook,
            GHI_CHU: $scope.ghi_chu_lh,
            SDT1: $scope.so_dien_thoai1,
            TINH_TRANG_LAM_VIEC : $scope.tinh_trang_lam_viec,
            SDT2: $scope.so_dien_thoai2,
            SALES_PHU_TRACH: $scope.nvkd.USERNAME,
            SALES_MOI: $scope.sales_moi,
            SALES_CU : $scope.sales_cu,
        }
        khachhangService.add_lienhe(data_add).then(function (response) {
            $scope.load_khachhang('A');
            $scope.new_ct_khachhang();
        });
    };

    $scope.addnewtk = function (makh) {
        var data_add = {
            MA_KHACH_HANG: makh,
            SO_TAI_KHOAN: $scope.so_tai_khoan,
            TEN_TAI_KHOAN: $scope.ten_tai_khoan,
            TEN_NGAN_HANG: $scope.ten_ngan_hang,
            CHI_NHANH: $scope.chi_nhanh,
            TINH_TP: $scope.tinh_tp,
            GHI_CHU: $scope.ghi_chu_tk,
            LOAI_TAI_KHOAN: $scope.loai_tai_khoan
        }
        khachhangService.add_taikhoan(data_add).then(function (response) {
            $scope.load_khachhang('A');
            $scope.new_ct_khachhang();
        });
    };

    $scope.addnewphanhoi = function (makh) {
        $("textarea[name=phanhoimoi]").val(CKEDITOR.instances.phanhoimoi.getData());
        var phanhoimoi = $("[name=phanhoimoi]").val();
        var username = $('#salehienthoi').val();
        var data_add = {
            MA_KHACH_HANG: makh,
            NGUOI_PHAN_HOI: username,
            THONG_TIN_PHAN_HOI: phanhoimoi,
        }
        khachhangService.add_phanhoi(data_add).then(function (response) {
            $scope.load_khachhang('A');
            $scope.new_ct_khachhang();
        });
    };

    $scope.dieukhoantt = ['5 ngày', '7 ngày', '30 ngày', 'Ngày 5 hàng tháng', 'Ngày 15 hàng tháng', 'Ngày 30 hàng tháng'];
    $scope.tinhtranghoatdong = ['Cầm chừng', 'Bình thường', 'Sắp phá sản', 'Đã phá sản'];
    $scope.tinh_trang = ['Còn công tác', 'Đã luân chuyển', 'Đã nghỉ việc', 'Chuyển công ty khác'];
    $scope.range = function (min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };

    var tmpDate = new Date();

    $scope.newField = {};

    $scope.editing = false;

    $scope.editAppKey = function (field) {

        $scope.item = field;

    }

    $scope.saveField = function (index) {
        if ($scope.editing !== false) {
            $scope.appkeys[$scope.editing] = $scope.newField;
            $scope.editing = false;
        }

    };

    $scope.cancel = function (index) {
        //if ($scope.editing !== false) {
        //    $scope.appkeys[$scope.editing] = $scope.newField;
        //    $scope.editing = false;
        //}
        $scope.load_khachhang('A');
    };

    $scope.load_nhanvienkd = function () {
        khachhangService.get_nhanvienkd().then(function (c) {
            $scope.list_nhanvienkd = c;
        });
    };
    $scope.load_nhanvienkd();

    $scope.arraythongtin = {
        ma_khach_hang: '',
        ten_cong_ty: '',
        van_phong_giao_dich: '',
        dia_chi_xuat_hoa_don: '',
        ma_so_thue: '',
        website: '',
        hotline: '',
        fax: '',
        dieu_khoan_thanh_toan: '',
        so_ngay_duoc_no: '',
        so_no_toi_da: '',
        email: '',
        ghi_chu: '',
        tinh: '',
        tinh_trang_hoat_dong: '',
        quoc_gia: '',
        truc_thuoc: 'HOPLONG',
    };


    $scope.arraylienhe = [{
        ma_khach_hang: '',
        nguoi_lien_he: '',
        chuc_vu: '',
        gioi_tinh: '',
        phong_ban: '',
        ngay_sinh: '',
        so_dien_thoai1: '',
        so_dien_thoai2: '',
        email_ca_nhan: '',
        email_cong_ty: '',
        skype: '',
        facebook: '',
        sales_phu_trach: '',
        sales_cu: '',
        sales_moi: '',
        tinh_trang_lam_viec : '',
    }];

    $scope.arraytaikhoan = [{
        ma_khach_hang: '',
        so_tai_khoan: '',
        ten_tai_khoan: '',
        ten_ngan_hang: '',
        chi_nhanh: '',
        tinh_tp: '',
        loai_tai_khoan: '',
    }];

    //Lọc nhân viên
    $scope.arrayNVFinded = [];
    $scope.arrayStaffs = [];
    $scope.showtable_ho_va_ten = false;

    $http.get(window.location.origin + '/api/Api_NhanvienKD')
            .then(function (response) {
                if (response.data) {
                    $scope.arrayStaffs = response.data;
                    $scope.arrayNVFinded = $scope.arrayStaffs.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.onNhanVienFind = function () {
        if (!$scope.HO_VA_TEN) {
            $scope.arrayNVFinded = $scope.arrayStaffs.map(function (item) {
                return item;
            });
        }
        $scope.arrayNVFinded = $scope.arrayStaffs.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.nvkd.HO_VA_TEN.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfoStaff = function (staff) {
        $scope.nvkd = staff;
        $scope.showtable_ho_va_ten = false;
    }
    // End Lọc nhân viên

    $scope.chuyensale = function (item) {
        $scope.item = item;
        var data = {
            MA_KHACH_HANG: $scope.item.MA_KHACH_HANG,
            SALE_HIEN_THOI : $scope.item.USERNAME,
        }
        khachhangService.save_listchuyensale(data).then(function () {
            $scope.load_khachhang('A');
        });
    };


    $scope.new_ct_khachhang = function () {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        khachhangService.chitietkhachhang(url).then(function (abc) {
            $scope.list_chitietkhachhangnew = abc;
        });
    };
    $scope.new_ct_khachhang();

    $scope.addnew_lienhe_ct = function (makh) {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        var data_add = {
            MA_KHACH_HANG: url,
            NGUOI_LIEN_HE: $scope.nguoi_lien_he,
            CHUC_VU: $scope.chuc_vu,
            PHONG_BAN: $scope.phong_ban,
            NGAY_SINH: $scope.ngay_sinh,
            GIOI_TINH: $scope.gioi_tinh,
            EMAIL_CA_NHAN: $scope.email_ca_nhan,
            EMAIL_CONG_TY: $scope.email_cong_ty,
            SKYPE: $scope.skype,
            FACEBOOK: $scope.facebook,
            GHI_CHU: $scope.ghi_chu_lh,
            SDT1: $scope.so_dien_thoai1,
            TINH_TRANG_LAM_VIEC: $scope.tinh_trang_lam_viec,
            SDT2: $scope.so_dien_thoai2,
            SALES_PHU_TRACH: $scope.nvkd.USERNAME,
            SALES_MOI: $scope.sales_moi,
            SALES_CU: $scope.sales_cu,
        }
        khachhangService.add_lienhe(data_add).then(function (response) {
            $scope.load_khachhang('A');
            $scope.new_ct_khachhang();
        });
    };

    $scope.save_chitiet_kh = function (makh, id) {
        var logo = $('#imgEdit').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];

        $("textarea[name=editghichu]").val(CKEDITOR.instances.editghichu.getData());
        var editghichu = $("[name=editghichu]").val();

        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        var kh_save = {
            MA_KHACH_HANG: url,
            TEN_CONG_TY: $scope.kh.TEN_CONG_TY,
            VAN_PHONG_GIAO_DICH: $scope.kh.VAN_PHONG_GIAO_DICH,
            DIA_CHI_XUAT_HOA_DON: $scope.kh.DIA_CHI_XUAT_HOA_DON,
            TINH: $scope.kh.TINH,
            QUOC_GIA: $scope.kh.QUOC_GIA,
            MST: $scope.kh.MST,
            HOTLINE: $scope.kh.HOTLINE,
            EMAIL: $scope.kh.EMAIL,
            FAX: $scope.kh.FAX,
            LOGO: name_without_ext,
            TINH_TRANG_HOAT_DONG: $scope.kh.TINH_TRANG_HOAT_DONG,
            WEBSITE: $scope.kh.WEBSITE,
            DIEU_KHOAN_THANH_TOAN: $scope.kh.DIEU_KHOAN_THANH_TOAN,
            SO_NGAY_DUOC_NO: $scope.kh.SO_NGAY_DUOC_NO,
            SO_NO_TOI_DA: $scope.kh.SO_NO_TOI_DA,
            GHI_CHU: editghichu,
            TRUC_THUOC: "HOPLONG"
        }
        khachhangService.save_khachhang(url, kh_save).then(function (response) {
            $scope.load_khachhang('A');
            var phanloai_save = {
                ID: id,
                MA_KHACH_HANG: url,
                MA_LOAI_KHACH: $scope.kh.MA_LOAI_KHACH
            }
            var phanloai_add = {
                MA_KHACH_HANG: url,
                MA_LOAI_KHACH: $scope.kh.MA_LOAI_KHACH
            }
            if (id != null) {
                khachhangService.save_phanloaikh(id, phanloai_save).then(function (response) {
                    $scope.load_khachhang('A');
                    $scope.new_ct_khachhang();
                });
            } else if (id == null && $scope.kh.MA_LOAI_KHACH != null) {
                khachhangService.add_phanloaikh(phanloai_add).then(function (response) {
                    $scope.load_khachhang('A');
                    $scope.new_ct_khachhang();
                });
            }

        });
    };


   

});

// End khach hang



//Nha cung cap
app.controller('nhacungcapCtrl', function (nhacungcapService, $scope, $http, $location) {
    $scope.createnew = function () {
        var logo = $('#imgInp').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];
        $scope.Thong_tin_NCC = {
            MA_NHA_CUNG_CAP: $scope.arraythongtin.ma_nha_cung_cap,
            TEN_NHA_CUNG_CAP: $scope.arraythongtin.ten_nha_cung_cap,
            VAN_PHONG_GIAO_DICH: $scope.arraythongtin.van_phong_giao_dich,
            DIA_CHI_XUAT_HOA_DON: $scope.arraythongtin.dia_chi_xuat_hoa_don,
            MA_SO_THUE: $scope.arraythongtin.ma_so_thue,
            WEBSITE: $scope.arraythongtin.website,
            SDT: $scope.arraythongtin.sdt,
            LOGO: name_without_ext,
            FAX: $scope.arraythongtin.fax,
            DIEU_KHOAN_THANH_TOAN: $scope.arraythongtin.dieu_khoan_thanh_toan,
            SO_NGAY_DUOC_NO: $scope.arraythongtin.so_ngay_duoc_no,
            SO_NO_TOI_DA: $scope.arraythongtin.so_no_toi_da,
            EMAIL: $scope.arraythongtin.email,
            GHI_CHU: $scope.arraythongtin.ghi_chu,
            DANH_GIA: $scope.arraythongtin.danh_gia,
            PHAN_LOAI_NCC: $scope.arraythongtin.ma_loai_ncc,
        }

        $scope.Tai_khoan_NCC = [];
        for (var i = 0; i < $scope.arraytaikhoan.length; i++) {
            var tai_khoan = {
                MA_NHA_CUNG_CAP: '',
                SO_TAI_KHOAN: $scope.arraytaikhoan[i].so_tai_khoan,
                TEN_TAI_KHOAN: $scope.arraytaikhoan[i].ten_tai_khoan,
                TEN_NGAN_HANG: $scope.arraytaikhoan[i].ten_ngan_hang,
                CHI_NHANH: $scope.arraytaikhoan[i].chi_nhanh,
                TINH_TP: $scope.arraytaikhoan[i].tinh_tp,
                LOAI_TAI_KHOAN: $scope.arraytaikhoan[i].loai_tai_khoan,
            }
            $scope.Tai_khoan_NCC.push(tai_khoan);
        }

        $scope.ma_nhom_hang = [{
            ma_nha_cung_cap: '',
            ma_nhom_hang: '',
        }];

        $scope.Loai_HANG_CUNG_CAP = [];
        for (var i = 0; i < $scope.checked_fruits.length; i++) {
            var loai_hang = {
                MA_NHA_CUNG_CAP: '',
                MA_NHOM_HANG: $scope.checked_fruits[i],
            }
            $scope.Loai_HANG_CUNG_CAP.push(loai_hang);
        }


        $scope.Lien_he_TK = [];
        for (var i = 0; i < $scope.arraylienhe.length; i++) {
            var lien_he = {
                MA_NHA_CUNG_CAP: '',
                NGUOI_LIEN_HE: $scope.arraylienhe[i].nguoi_lien_he,
                CHUC_VU: $scope.arraylienhe[i].chuc_vu,
                PHONG_BAN: $scope.arraylienhe[i].phong_ban,
                NGAY_SINH: $scope.arraylienhe[i].ngay_sinh,
                GIOI_TINH: $scope.arraylienhe[i].gioi_tinh,
                EMAIL_CA_NHAN: $scope.arraylienhe[i].email_ca_nhan,
                EMAIL_CONG_TY: $scope.arraylienhe[i].email_cong_ty,
                SKYPE: $scope.arraylienhe[i].skype,
                FACEBOOK: $scope.arraylienhe[i].facebook,
                SO_DIEN_THOAI_1: $scope.arraylienhe[i].so_dien_thoai1,
                SO_DIEN_THOAI_2: $scope.arraylienhe[i].so_dien_thoai2,
                PUR_PHU_TRACH: $scope.arraylienhe[i].pur_phu_trach,
            }
            $scope.Lien_he_TK.push(lien_he);
        }



        $http({
            method: 'POST',
            data: $scope.Thong_tin_NCC,
            url: window.location.origin + '/api/Api_NhaCungCap'
        }).then(function successCallback(response) {
            $scope.Thong_tin_NCC = response.data;


            if (!$scope.Thong_tin_NCC) {
                alert('Tạo nhà cung cấp lỗi');
                return;
            }

            for (var i = 0; i < $scope.Loai_HANG_CUNG_CAP.length; i++) {
                $scope.Loai_HANG_CUNG_CAP[i].MA_NHA_CUNG_CAP = $scope.Thong_tin_NCC.MA_NHA_CUNG_CAP;
            }

            for (var i = 0; i < $scope.Tai_khoan_NCC.length; i++) {
                $scope.Tai_khoan_NCC[i].MA_NHA_CUNG_CAP = $scope.Thong_tin_NCC.MA_NHA_CUNG_CAP;
            }

            for (var i = 0; i < $scope.Lien_he_TK.length; i++) {
                $scope.Lien_he_TK[i].MA_NHA_CUNG_CAP = $scope.Thong_tin_NCC.MA_NHA_CUNG_CAP;
            }

            if ($scope.Lien_he_TK.length > 0) {
                $http({
                    method: 'POST',
                    data: $scope.Lien_he_TK,
                    url: window.location.origin + '/api/Api_ArrayLienHeNCC'
                }).then(function successCallback(zzz) {
                }, function errorCallback(zzz) {
                    alert('Tạo liên hệ lỗi');
                });

            }

            if ($scope.Loai_HANG_CUNG_CAP.length > 0) {
                $http({
                    method: 'POST',
                    data: $scope.Loai_HANG_CUNG_CAP,
                    url: window.location.origin + '/api/Api_LoaiHangCungCap/' + $scope.Thong_tin_NCC.MA_NHA_CUNG_CAP
                }).then(function successCallback(response1) {

                }, function errorCallback(response1) {
                    alert('Tạo loại hàng cung cấp lỗi');
                });

            }


            if ($scope.Tai_khoan_NCC.length > 0) {
                $http({
                    method: 'POST',
                    data: $scope.Tai_khoan_NCC,
                    url: window.location.origin + '/api/Api_TaiKhoanNCC/' + $scope.Thong_tin_NCC.MA_NHA_CUNG_CAP
                }).then(function successCallback(response1) {

                }, function errorCallback(response1) {
                    alert('Tạo tài khoản nhà cung cấp lỗi');
                });

            }
        });
    };

    $scope.loai_hang_cung_cap = function (mancc) {
        nhacungcapService.get_loaihangcungcap(mancc).then(function (loaihangcungcap) {
            $scope.list_loai_hang_cung_cap = loaihangcungcap;
        });
    };

    $scope.load_nhacungcap = function () {
        nhacungcapService.get_nhacungcap().then(function (a) {
            $scope.list_nhacungcap = a;
        });
    };
    $scope.load_nhacungcap();

    $scope.load_phanloaincc = function () {
        nhacungcapService.get_phanloaincc().then(function (b) {
            $scope.list_phanloai = b;
        });
    };
    $scope.load_phanloaincc();

    $scope.load_nhanvienmua = function () {
        nhacungcapService.get_nhanvienmua().then(function (c) {
            $scope.list_nhanvienmua = c;
        });
    };
    $scope.load_nhanvienmua();

    $scope.load_loaitaikhoan = function () {
        nhacungcapService.get_loaitk().then(function (h) {
            $scope.list_loaitaikhoan = h;
        });
    };
    $scope.load_loaitaikhoan();

    $scope.load_nhomvthh = function () {
        nhacungcapService.get_nhomvthh().then(function (k) {
            $scope.list_nhomvthh = k;
        });
    };
    $scope.load_nhomvthh();

    $scope.get_lienhencc = function (mancc) {
        nhacungcapService.get_lienhenhacungcap(mancc).then(function (lienhe) {
            $scope.list_lienhencc = lienhe;
        });
    };

    $scope.get_taikhoanncc = function (mancc) {
        nhacungcapService.get_taikhoanncc(mancc).then(function (taikhoanncc) {
            $scope.list_taikhoanncc = taikhoanncc;
        });
    };

    $scope.transfer = function (item) {
        $scope.item = item;
    };

    $scope.edit = function (item) {
        $scope.ncc = item;
    };

    $scope.details = function (lienhe) {
        $scope.lienhe = lienhe;
    };

    $scope.EditLienHe = function (lienhe) {
        $scope.editlh = lienhe;
    };

    $scope.save = function (mancc) {
        var logo = $('#imgEdit').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];
        var kh_save = {
            MA_NHA_CUNG_CAP: mancc,
            TEN_NHA_CUNG_CAP: $scope.ncc.TEN_NHA_CUNG_CAP,
            VAN_PHONG_GIAO_DICH: $scope.ncc.VAN_PHONG_GIAO_DICH,
            DIA_CHI_XUAT_HOA_DON: $scope.ncc.DIA_CHI_XUAT_HOA_DON,
            PHAN_LOAI_NCC: $scope.ncc.MA_LOAI_NCC,
            MST: $scope.ncc.MST,
            SDT: $scope.ncc.SDT,
            EMAIL: $scope.ncc.EMAIL,
            FAX: $scope.ncc.FAX,
            LOGO: name_without_ext,
            WEBSITE: $scope.ncc.WEBSITE,
            DIEU_KHOAN_THANH_TOAN: $scope.ncc.DIEU_KHOAN_THANH_TOAN,
            SO_NGAY_DUOC_NO: $scope.ncc.SO_NGAY_DUOC_NO,
            SO_NO_TOI_DA: $scope.ncc.SO_NO_TOI_DA,
            GHI_CHU: $scope.ncc.GHI_CHU,
            DANH_GIA: $scope.ncc.DANH_GIA,
        }
        nhacungcapService.save_nhacungcap(mancc, kh_save).then(function (response) {
            $scope.load_nhacungcap();
        });
    };

    $scope.savelienhencc = function (idlienhe) {
        var data_save = {
            ID_LIEN_HE: idlienhe,
            MA_NHA_CUNG_CAP: $scope.editlh.MA_NHA_CUNG_CAP,
            NGUOI_LIEN_HE: $scope.editlh.NGUOI_LIEN_HE,
            CHUC_VU: $scope.editlh.CHUC_VU,
            PHONG_BAN: $scope.editlh.PHONG_BAN,
            NGAY_SINH: $scope.editlh.NGAY_SINH,
            GIOI_TINH: $scope.editlh.GIOI_TINH,
            EMAIL_CA_NHAN: $scope.editlh.EMAIL_CA_NHAN,
            EMAIL_CONG_TY: $scope.editlh.EMAIL_CONG_TY,
            SKYPE: $scope.editlh.SKYPE,
            FACEBOOK: $scope.editlh.FACEBOOK,
            GHI_CHU: $scope.editlh.GHI_CHU,
            SO_DIEN_THOAI_1: $scope.editlh.SO_DIEN_THOAI_1,
            SO_DIEN_THOAI_2: $scope.editlh.SO_DIEN_THOAI_2,
        }
        nhacungcapService.save_lienhencc(idlienhe, data_save).then(function (response) {
            $scope.load_nhacungcap();
        });
    };

    $scope.addnew = function (mancc) {
        var data_add = {
            MA_NHA_CUNG_CAP: mancc,
            NGUOI_LIEN_HE: $scope.nguoi_lien_he,
            CHUC_VU: $scope.chuc_vu,
            PHONG_BAN: $scope.phong_ban,
            NGAY_SINH: $scope.ngay_sinh,
            GIOI_TINH: $scope.gioi_tinh,
            EMAIL_CA_NHAN: $scope.email_ca_nhan,
            EMAIL_CONG_TY: $scope.email_cong_ty,
            SKYPE: $scope.skype,
            FACEBOOK: $scope.facebook,
            GHI_CHU: $scope.ghi_chu_lh,
            SO_DIEN_THOAI_1: $scope.so_dien_thoai1,
            SO_DIEN_THOAI_2: $scope.so_dien_thoai2,
            PUR_PHU_TRACH: $scope.pur_phu_trach,
        }
        nhacungcapService.add_lienhencc(data_add).then(function (response) {
            $scope.load_nhacungcap();
        });
    };

    $scope.addnewtk = function (mancc) {
        var data_add = {
            MA_NHA_CUNG_CAP: mancc,
            SO_TAI_KHOAN: $scope.so_tai_khoan,
            TEN_TAI_KHOAN: $scope.ten_tai_khoan,
            TEN_NGAN_HANG: $scope.ten_ngan_hang,
            CHI_NHANH: $scope.chi_nhanh,
            TINH_TP: $scope.tinh_tp,
            GHI_CHU: $scope.ghi_chu_tk,
            LOAI_TAI_KHOAN: $scope.loai_tai_khoan
        }
        nhacungcapService.add_taikhoan(data_add).then(function (response) {
            $scope.load_nhacungcap();
        });
    };

    $scope.dieukhoantt = ['5 ngày', '7 ngày', '30 ngày', 'Ngày 5 hàng tháng', 'Ngày 15 hàng tháng', 'Ngày 30 hàng tháng'];

    $scope.checked_fruits = [];



    $scope.range = function (min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };

    $scope.arraythongtin = {
        ma_nha_cung_cap: '',
        ten_nha_cung_cap: '',
        van_phong_giao_dich: '',
        dia_chi_xuat_hoa_don: '',
        ma_so_thue: '',
        website: '',
        sdt: '',
        fax: '',
        dieu_khoan_thanh_toan: '',
        so_ngay_duoc_no: '',
        so_no_toi_da: '',
        email: '',
        ghi_chu: '',
        danh_gia: '',
        phan_loai_ncc: '',
    };


    $scope.arraylienhe = [{
        ma_nha_cung_cap: '',
        nguoi_lien_he: '',
        chuc_vu: '',
        gioi_tinh: '',
        phong_ban: '',
        ngay_sinh: '',
        so_dien_thoai1: '',
        so_dien_thoai2: '',
        email_ca_nhan: '',
        email_cong_ty: '',
        skype: '',
        facebook: '',
        pur_phu_trach: '',
    }];

    $scope.arraytaikhoan = [{
        ma_nha_cung_cap: '',
        so_tai_khoan: '',
        ten_tai_khoan: '',
        ten_ngan_hang: '',
        chi_nhanh: '',
        tinh_tp: '',
        loai_tai_khoan: '',
    }];


});
//end nha cung cap


app.controller('hanghoaCtrl', function (hanghoaService, $scope) {
    $scope.timkiemhanghoa = function (ma_chuan) {
        hanghoaService.find_hanghoa(ma_chuan).then(function (d) {
            $scope.danhsachtimkiem = d;
        });
    }
    $scope.loadHangHoa = function (MA_NHOM_HANG) {
        hanghoaService.get_hanghoa(MA_NHOM_HANG).then(function (d) {
            $scope.danhsachhanghoa = d;
        });

        hanghoaService.get_nhomhang().then(function (a) {
            $scope.danhsachnhomhang = a;
        });
    };
    $scope.loadQuanTam = function () {
        var quantam = $('#userquantam').val();
        hanghoaService.get_quantam(quantam).then(function (z) {
            $scope.danhsachquantam = z;
        });
    }
    $scope.loadQuanTam();
    $scope.loadHangHoa('AUTONICS');

    //$scope.manhomhang = "AUTONICS";

    $scope.add = function () {

        var a = $('#imgInp').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];

        $("textarea[name=thongso]").val(CKEDITOR.instances.thongso.getData());
        $("textarea[name=donggoi]").val(CKEDITOR.instances.donggoi.getData());
        var thongso = $("[name=thongso]").val();
        var donggoi = $("[name=donggoi]").val();
        var data_add = {
            MA_HANG: $scope.mahang,
            MA_CHUAN: $scope.machuan,
            THONG_SO: $scope.thongso,
            MA_NHAP_HANG: $scope.manhaphang,
            TEN_HANG: $scope.tenhang,
            MA_NHOM_HANG: $scope.manhomhang,
            KHOI_LUONG: $scope.khoiluong,
            XUAT_XU: $scope.xuatxu,
            THONG_SO_KY_THUAT: thongso,
            GIA_NHAP: $scope.gianhap,
            GIA_LIST: $scope.gialist,
            QUY_CACH_DONG_GOI: donggoi,
            DISCONTINUE: $scope.discontinue,
            MA_CHUYEN_DOI: $scope.machuyendoi,
            BAO_HANH: $scope.baohanh,
            DON_VI_TINH: $scope.donvitinh,
            HINH_ANH: name_without_ext,
            GHI_CHU: $scope.ghichu,
            TK_HACH_TOAN_KHO: $scope.tkhachtoankho,
            TK_DOANH_THU: $scope.tkdoanhthu,
            TK_CHI_PHI: $scope.tkchiphi
        }
        hanghoaService.add(data_add).then(function (response) {
            $scope.loadHangHoa();
            $('#imgInp').val() = '';
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;
        var donggoivalue = $('.' + item.MA_HANG + '-1').html();
        CKEDITOR.instances.editdonggoi.setData(donggoivalue);
        var thongsovalue = $('.' + item.MA_HANG + '-2').html();
        CKEDITOR.instances.editthongso.setData(thongsovalue);
    }

    $scope.save = function (mahang) {
        $("textarea[name=editthongso]").val(CKEDITOR.instances.editthongso.getData());
        $("textarea[name=editdonggoi]").val(CKEDITOR.instances.editdonggoi.getData());
        var thongso = $("[name=editthongso]").val();
        var donggoi = $("[name=editdonggoi]").val();
        var a = $('#imgEdit').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];
        var data_update = {
            MA_HANG: $scope.item.MA_HANG,
            MA_CHUAN: $scope.item.MA_CHUAN,
            THONG_SO: $scope.item.THONG_SO,
            MA_NHAP_HANG: $scope.item.MA_NHAP_HANG,
            TEN_HANG: $scope.item.TEN_HANG,
            MA_NHOM_HANG: $scope.item.MA_NHOM_HANG,
            KHOI_LUONG: $scope.item.KHOI_LUONG,
            XUAT_XU: $scope.item.XUAT_XU,
            THONG_SO_KY_THUAT: thongso,
            GIA_NHAP: $scope.item.GIA_NHAP,
            GIA_LIST: $scope.item.GIA_LIST,
            QUY_CACH_DONG_GOI: donggoi,
            DISCONTINUE: $scope.item.discontinue,
            MA_CHUYEN_DOI: $scope.item.MA_CHUYEN_DOI,
            BAO_HANH: $scope.item.BAO_HANH,
            DON_VI_TINH: $scope.item.DON_VI_TINH,
            HINH_ANH: name_without_ext,
            GHI_CHU: $scope.item.GHI_CHU,
            TK_HACH_TOAN_KHO: $scope.item.TK_HACH_TOAN_KHO,
            TK_DOANH_THU: $scope.item.TK_DOANH_THU,
            TK_CHI_PHI: $scope.item.TK_CHI_PHI
        }
        hanghoaService.save(mahang, data_update).then(function (response) {
            $scope.loadHangHoa();
        });
    }

    $scope.delete = function (mahang) {
        var data_delete = {
            MA_HANG: mahang
        }
        hanghoaService.delete(mahang, data_delete).then(function (response) {
            $scope.loadHangHoa();
        });
    };
    //$scope.get_tonkho = function (id) {
    //    hanghoaService.get_hangtonkho(id).then(function (a) {
    //        $scope.danhsachtonkho = a;
    //    });
    //};
    //$scope.get_tonkho();
    $scope.getTotal = function (type) {
        var total = 0;
        angular.forEach($scope.danhsachtonkho, function (el) {
            total += el[type];
        });
        return total;
    };

});

app.controller('NhomvthhCtrl', function (NhomvthhService, $scope) {
    $scope.loadHangSP = function () {
        NhomvthhService.get_hangsp().then(function (a) {
            $scope.danhsachsp = a;
        });
    };
    $scope.loadHangSP();
    $scope.add = function () {
        var data_add = {
            MA_NHOM_HANG_CHI_TIET: $scope.manhomhangchitiet,
            CHUNG_LOAI_HANG: $scope.chungloaihang,
            MA_NHOM_HANG_CHA: $scope.manhomhangcha,
            GHI_CHU: $scope.ghichu

        }
        NhomvthhService.add(data_add).then(function (response) {
            $scope.loadHangSP();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (hangsp) {
        var data_update = {
            MA_NHOM_HANG_CHI_TIET: $scope.item.MA_NHOM_HANG_CHI_TIET,
            CHUNG_LOAI_HANG: $scope.item.CHUNG_LOAI_HANG,
            MA_NHOM_HANG_CHA: $scope.item.MA_NHOM_HANG_CHA,
            GHI_CHU: $scope.item.GHI_CHU

        }
        NhomvthhService.save(hangsp, data_update).then(function (response) {
            $scope.loadHangHoa();
        });
    }

    $scope.delete = function (hangsp) {
        var data_delete = {
            MA_NHOM_HANG_CHI_TIET: hangsp
        }
        NhomvthhService.delete(hangsp, data_delete).then(function (response) {
            $scope.loadHangSP();
        });
    };

    $scope.whatclass = function (somevalue) {
        if (somevalue != null) {
            return "text-center"
        }
    };
});

app.controller('khoCtrl', function (khoService, $scope) {
    $scope.loadKho = function () {
        khoService.get_kho().then(function (a) {
            $scope.danhsachkho = a;
        });
    };
    $scope.loadKho();

    $scope.add = function () {
        var data_add = {
            MA_KHO: $scope.ma_kho,
            TEN_KHO: $scope.ten_kho,
            DIA_CHI_KHO: $scope.dia_chi,
            MA_KHO_CHA: $scope.ma_kho_cha,
            TRUC_THUOC: "HOPLONG",
            GHI_CHU: $scope.ghi_chu,
        }
        khoService.add(data_add).then(function (response) {
            $scope.loadKho();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;
    }

    $scope.save = function (makho) {
        var data_update = {
            MA_KHO: $scope.item.MA_KHO,
            TEN_KHO: $scope.item.TEN_KHO,
            DIA_CHI_KHO: $scope.item.DIA_CHI_KHO,
            MA_KHO_CHA: $scope.item.MA_KHO_CHA,
            TRUC_THUOC: "HOPLONG",
            GHI_CHU: $scope.item.GHI_CHU,
        }
        khoService.save(makho, data_update).then(function (response) {
            $scope.loadKho();
        });
    }

    $scope.delete = function (makho) {
        var data_delete = {
            MA_KHO: makho
        }
        khoService.delete(makho, data_delete).then(function (response) {
            $scope.loadKho();
        });
    };
});

app.controller('userCtrl', function (userService, $scope) {
    $scope.loadUser = function () {
        userService.get_user().then(function (a) {
            $scope.danhsachuser = a;
        });
    };


    $scope.loadUser();



    $scope.add = function () {
        $("textarea[name=thanhtich]").val(CKEDITOR.instances.thanhtich.getData());
        var thanhtich = $("[name=thanhtich]").val();
        $("textarea[name=linh_vuc_cong_tac]").val(CKEDITOR.instances.linh_vuc_cong_tac.getData());
        var linh_vuc_cong_tac = $("[name=linh_vuc_cong_tac]").val();
        var a = $('#imgInp').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];
        var data_add = {
            USERNAME: $scope.username,
            PASSWORD: $scope.password,
            HO_VA_TEN: $scope.hovaten,
            SDT: $scope.sdt,
            EMAIL: $scope.email,
            AVATAR: name_without_ext,
            IS_ADMIN: $scope.admin,
            ALLOWED: $scope.allowed,
            MA_CONG_TY: "HOPLONG",
        }
        userService.add(data_add).then(function (response) {
            $scope.loadUser();
            var nhanvien_add = {
                USERNAME: $scope.username,
                GIOI_TINH: $scope.gioitinh,
                NGAY_SINH: $scope.ngaysinh,
                QUE_QUAN: $scope.quequan,
                THANH_TICH_CONG_TAC: thanhtich,
                TRINH_DO_HOC_VAN: $scope.trinhdohocvan,
                LINH_VUC_CONG_TAC: linh_vuc_cong_tac,
                MA_PHONG_BAN: $scope.maphongban
            }
            userService.add_nhanvien(nhanvien_add).then(function (response) {
                $scope.loadUser();
            });
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;
    }

    $scope.transfer = function (nv) {
        $scope.nv = nv;
    }

    $scope.update_nv = function (nv) {
        $scope.nv = nv;
        var thanhtichvalue = $('.' + nv.USERNAME + '-1').html();
        CKEDITOR.instances.editthanhtich.setData(thanhtichvalue);
        var linhvuccongtacvalue = $('.' + nv.USERNAME + '-2').html();
        CKEDITOR.instances.editlinh_vuc_cong_tac.setData(linhvuccongtacvalue);
    }

    $scope.save = function (username) {
        $("textarea[name=editthanhtich]").val(CKEDITOR.instances.editthanhtich.getData());
        var editthanhtich = $("[name=editthanhtich]").val();
        $("textarea[name=editlinh_vuc_cong_tac]").val(CKEDITOR.instances.editlinh_vuc_cong_tac.getData());
        var editlinh_vuc_cong_tac = $("[name=editlinh_vuc_cong_tac]").val();
        var a = $('#imgEdit').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];
        var data_update = {
            ID: username,
            USERNAME: $scope.nv.USERNAME,
            PASSWORD: $scope.nv.PASSWORD,
            HO_VA_TEN: $scope.nv.HO_VA_TEN,
            SDT: $scope.nv.SDT,
            AVATAR: name_without_ext,
            EMAIL: $scope.nv.EMAIL,
            IS_ADMIN: $scope.nv.IS_ADMIN,
            ALLOWED: $scope.nv.ALLOWED,
            MA_CONG_TY: "HOPLONG",
        }
        userService.save(username, data_update).then(function (response) {
            $scope.loadUser();
            var nhanvien_update = {
                USERNAME: $scope.nv.USERNAME,
                GIOI_TINH: $scope.nv.GIOI_TINH,
                NGAY_SINH: $scope.nv.NGAY_SINH,
                QUE_QUAN: $scope.nv.QUE_QUAN,
                THANH_TICH_CONG_TAC: editthanhtich,
                LINH_VUC_CONG_TAC: editlinh_vuc_cong_tac,
                TRINH_DO_HOC_VAN: $scope.nv.TRINH_DO_HOC_VAN,
                MA_PHONG_BAN: $scope.nv.MA_PHONG_BAN
            }
            userService.save_nhanvien(username, nhanvien_update).then(function (response) {
                $scope.loadUser();
            });
        });
    };
});

app.controller('nhanvienCtrl', function (nhanvienService, $scope) {
    $scope.get_nhanvien = function (username) {
        nhanvienService.get_nhanvien(username).then(function (d) {
            $scope.nhanvien = d;
        });
    };
});

app.controller('phongbanCtrl', function (phongbanService, $scope) {
    $scope.loadPhongban = function () {
        phongbanService.get_phongban().then(function (a) {
            $scope.danhsachphongban = a;
        });
    };

    $scope.loadPhongban();


    $scope.pass = function (nhanvien) {
        $scope.nhanvien = nhanvien;
    }


    $scope.edit = function (item) {
        $scope.item = item;
    }


    $scope.save = function (maphongban) {
        var data_update = {
            MA_PHONG_BAN: maphongban,
            TEN_PHONG_BAN: $scope.item.TEN_PHONG_BAN,
            SDT: $scope.item.SDT,
            MA_CONG_TY: "HOPLONG",
            GHI_CHU: $scope.item.GHI_CHU,
        }
        phongbanService.save(maphongban, data_update).then(function (response) {
            $scope.loadPhongban();
        });
    };

    $scope.delete = function (maphongban) {
        var data_delete = {
            MA_PHONG_BAN: maphongban,
        }
        phongbanService.delete(maphongban).then(function (response) {
            $scope.loadPhongban();
        });
    };
});

app.controller('nhanvienphongbanCtrl', function (nhanvienphongbanService, $scope) {
    $scope.get_listnhanvien = function (maphongban) {
        nhanvienphongbanService.get_nhanvien(maphongban).then(function (d) {
            $scope.listnhanvien = d;
        });
    };
});

app.controller('taikhoanCtrl', function (taikhoanService, $scope) {
    $scope.loadTaikhoan = function () {
        taikhoanService.get_taikhoan().then(function (a) {
            $scope.danhsachtk = a;
        });
    };

    $scope.loadTaikhoan();

    $scope.whatclass = function (somevalue) {
        if (somevalue != null) {
            return "text-center"
        }
    };

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            SO_TK: $scope.stk,
            TEN_TK: $scope.tentaikhoan,
            TINH_CHAT: $scope.tinhchat,
            TEN_TA: $scope.tentienganh,
            TK_CAP_CHA: $scope.tk_capcha,
            DIEN_GIAI: $scope.diengiai,
        }
        taikhoanService.add(data_add).then(function (response) {
            $scope.loadTaikhoan();
        });
    };

    $scope.save = function (sotk) {
        var data_update = {
            SO_TK: sotk,
            TEN_TK: $scope.item.TEN_TK,
            TINH_CHAT: $scope.item.TINH_CHAT,
            TEN_TA: $scope.item.TEN_TA,
            TK_CAP_CHA: $scope.item.TK_CAP_CHA,
            DIEN_GIAI: $scope.item.DIEN_GIAI,
        }
        taikhoanService.save(sotk, data_update).then(function (response) {
            $scope.loadTaikhoan();
        });
    };

    $scope.delete = function (sotk) {
        var data_delete = {
            SO_TK: sotk
        }

        taikhoanService.delete(sotk).then(function (response) {
            $scope.loadTaikhoan();
        });
    };
});

app.controller('danhmucCtrl', function (danhmucService, $scope) {
    $scope.loadDanhMuc = function () {
        danhmucService.get_danhmuc().then(function (a) {
            $scope.danhsachdanhmuc = a;
        });
    };

    $scope.transfer = function (madanhmuc) {
        danhmucService.get_post(madanhmuc).then(function (z) {
            $scope.listpost = z;
        });
    };
    $scope.transfer('04');
    $scope.loadDanhMuc();
    $scope.checked_fruits = [];

    $scope.save = function () {
        var a = $('#imgInp').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];
        $("textarea[name=noidung]").val(CKEDITOR.instances.noidung.getData());
        var danhmuc = $("[name=noidung]").val();
        var username = $('#username').val();
        var data_add = {
            TIEU_DE_BAI_VIET: $scope.tieude,
            NOI_DUNG_BAI_VIET: danhmuc,
            ANH_BAI_VIET: name_without_ext,
            NGUOI_DANG_BAI: username,
        }
        danhmucService.add_danhmuc(data_add).then(function (response) {


            var postcate = {
                tieu_de_bai_viet: $scope.tieude,
                ma_danh_muc: $scope.checked_fruits[0]
            }
            danhmucService.add_postcategories(postcate).then(function (response) {
                $scope.loadDanhMuc();
                reload();

            });
        });
    };
});


app.controller('imgCtrl', function ($scope) {
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    function read_editURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#edit_img').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function () {
        readURL(this);
    });
    $("#imgEdit").change(function () {
        read_editURL(this);
    });
});

app.controller('menuCtrl', function (menuService, $scope) {
    $scope.load_menu = function () {
        var username = $('#username').val();
        menuService.get_menu(username).then(function (a) {
            $scope.danhsachmenu = a;
        });
    };
    $scope.load_menu();

    $scope.edit = function (menucha) {
        var username = $('#username').val();
        menuService.get_menucha(username, menucha).then(function (a) {
            $scope.danhsachmenucha = a;
        });
    };
    $scope.edit("TRANG_CA_NHAN");
    $scope.push = function (zzz) {
        var username = $('#username').val();
        menuService.get_listmenucha(username, zzz).then(function (z) {
            $scope.listmenu = z;
        });
    };

    var maphongban = $('#maphongban').val();
    var username = $('#username').val();

    $scope.get = function (tendangnhap) {
        var username = $('#username').val();
        if (tendangnhap == username) {
            return ('hienthi');
        } else {
            return ('bienmat');
        }
    };

    $scope.check = function (trangthai) {
        if (trangthai == true) {
            return ('hienthi');
        } else {
            return ('bienmat');
        }
    };

    $scope.click = function (abc, item) {
        var maphongban = $('#maphongban').val();
        var username = $('#username').val();
        $scope.item = item;
        var a = $scope.item.TRANG_THAI;
        var data_save = {
            MA_PHONG_BAN: maphongban,
            USERNAME: username,
            TRANG_THAI: a,
            MA_MENU: abc
        }
        menuService.save_menu(maphongban, username, abc, data_save).then(function (response) {
            $scope.load_menu();
        });
    }
});

app.controller('userdetailCtrl', function (userdetailService, $scope) {
    $scope.load_userdetails = function () {
        var username = $('#username').val();
        userdetailService.get_details(username).then(function (a) {
            $scope.list_details = a;
        });
    };
    $scope.load_nguoidungdetails = function (id) {

        userdetailService.get_details(id).then(function (a) {
            $scope.list_details = a;
        });
    };

    $scope.loadUser = function () {
        userdetailService.get_user().then(function (a) {
            $scope.danhsachuser = a;
        });
    };

    $scope.transfer = function (item) {
        $scope.item = item;
    };

    $scope.edit = function (username) {
        var a = $('#imgInp').val();
        var name_without_ext = (a.split('\\').pop().split('/').pop().split())[0];
        var data_save = {
            AVATAR: name_without_ext
        }
        userdetailService.edit_image(username, data_save).then(function (response) {
            $scope.load_userdetails();
        });
    };

    $scope.load_userdetails();

    $scope.changepw = function () {
        var username = $('#username').val();
        var oldpw = $scope.oldpw;
        var newpw = $scope.newpw;

        var data_save = {
            PASSWORD: newpw
        }
        userdetailService.save_pw(username, oldpw, data_save).then(function (response) {
            $scope.loadUser();
            $scope.load_userdetails();
            $scope.oldpw = '';
            $scope.newpw = '';
            $('.successful').css('display', 'block');
            $window.sessionStorage["windowKey"] = null;
        });

    };


});

app.controller('bangchamcongCtrl', function (bangchamcongService, $scope) {
    $scope.load_chamcong = function () {
        var username = $('#username').val();
        bangchamcongService.get_chamcong(username).then(function (a) {
            $scope.list_chamcong = a;
        });
    };
    $scope.load_chamcong();
});

app.controller('bangluongCtrl', function (bangluongService, $scope) {
    $scope.load_bangluong = function () {
        var username = $('#username').val();
        bangluongService.get_bangluong(username).then(function (a) {
            $scope.list_bangluong = a;
        });
    };
    $scope.load_bangluong();
});

app.controller('addmenuCtrl', function (addmenuService, menuService, $scope) {
    $scope.load_menu = function () {
        addmenuService.get_menu().then(function (a) {
            $scope.dsmenu = a;
        });
    };
    $scope.load_menu();

    $scope.add = function () {
        var data_add = {
            MA_MENU: $scope.ma_menu,
            TEN_MENU: $scope.ten_menu,
            LINK: $scope.link_menu,
            MENU_CHA: $scope.menu_cha
        }
        addmenuService.add_menu(data_add).then(function (response) {
            $scope.load_menu();
        });
    }

    $scope.edit = function (menucha) {
        var username = $('#username').val();
        menuService.get_menucha(username, menucha).then(function (a) {
            $scope.danhsachmenucha = a;
        });
        $('#editbtn').show();
    };

    $scope.push = function (zzz) {
        var username = $('#username').val();
        menuService.get_listmenucha(username, zzz).then(function (z) {
            $scope.listmenu = z;
        });
    };

    $scope.send = function (abc) {
        $scope.newmodel = abc;
    };

    $scope.save = function (mamenu) {
        var data_save = {
            MA_MENU: mamenu,
            TEN_MENU: $scope.newmodel.TEN_MENU,
            LINK: $scope.newmodel.LINK,
            MENU_CHA: $scope.newmodel.MENU_CHA
        }
        addmenuService.save_menu(mamenu, data_save).then(function (response) {
            $scope.load_menu();
        });
    };

    $scope.delete = function (mamenu) {
        var data_delete = {
            MA_MENU: mamenu
        }
        addmenuService.delete_menu(mamenu, data_delete).then(function (response) {
            $scope.load_menu();
        });
    };
});

app.controller('tonghopnvCtrl', function (tonghopnvService, $scope) {
    $scope.load_tonghop = function () {
        tonghopnvService.get_tonghop().then(function (a) {
            $scope.listtonghop = a;
        });
    };
    $scope.load_tonghop();
});


app.controller('dsnghiepvuCtrl', function (dsnghiepvuService, $scope) {
    $scope.load_dsnghiepvu = function (id_menu) {

        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        console.log(url);

        var pathArray = window.location.pathname.split('/');
        dsnghiepvuService.get_dsnghiepvu(url).then(function (a) {
            $scope.dsnghiepvu = a;
        });
    };
    $scope.load_dsnghiepvu();

    $scope.edit = function (item) {
        $scope.item = item;

    }

    $scope.save = function (id) {

        var data_update = {
            MO_TA: $scope.item.MO_TA

        }
        dsnghiepvuService.save_nv(id, data_update).then(function (response) {
            $scope.load_dsnghiepvu();
        });
    }
});

app.controller('danhsachnghiepvuCtrl', function (danhsachnghiepvuService, $scope) {

    $scope.loaddanhsachnghiepvu = function () {
        danhsachnghiepvuService.get_nv().then(function (d) {
            $scope.danhsachnghiepvu = d;
        });

    };
    $scope.loaddanhsachnghiepvu();
    $scope.edit = function (item) {
        $scope.item = item;

    }

    $scope.save = function (id) {

        var data_update = {
            TEN_NGHIEP_VU: $scope.item.TEN_NGHIEP_VU

        }
        danhsachnghiepvuService.save_nv(id, data_update).then(function (response) {
            $scope.loaddanhsachnghiepvu();
        });
    }
});

app.controller('chitietbaivietCtrl', function (chitietbaivietService, $scope) {
    $scope.checkid = function (item) {
        var nguoidangbai = item;
        console.log(nguoidangbai);
        var username = $('#username').val();
        if (username == nguoidangbai || username == "admin") {
            return "show";
        } else {
            return "notshow";
        }
    }
    $scope.checkid();

    $scope.load_chitietbaiviet = function () {

        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        var pathArray = window.location.pathname.split('/');
        chitietbaivietService.get_chitietbaiviet(url).then(function (a) {
            $scope.listchitiet = a;
        });
    };
    $scope.load_chitietbaiviet();

    $scope.edit = function (item) {
        $scope.item = item;
        var noidungvalue = $('.' + item.MA_BAI_VIET + '-1').html();
        CKEDITOR.instances.editnoidung.setData(noidungvalue);
    }

    $scope.save = function (mabaiviet) {
        $("textarea[name=editnoidung]").val(CKEDITOR.instances.editnoidung.getData());
        var editnoidung = $("[name=editnoidung]").val();
        var data_save = {
            MA_BAI_VIET: mabaiviet,
            NOI_DUNG_BAI_VIET: editnoidung,
            TIEU_DE_BAI_VIET: $scope.item.TIEU_DE_BAI_VIET,
        }
        chitietbaivietService.save(mabaiviet, data_save).then(function (response) {
            $scope.load_chitietbaiviet();
        });
    }
});


app.controller('phanquyenmenuCtrl', function (phanquyenService, $scope) {
    $scope.load_menu = function () {
        phanquyenService.get_dsphanquyen().then(function (a) {
            $scope.dsmenu = a;
        });
    };
    $scope.load_menu();

    $scope.transfer = function (mamenu) {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        $scope.item = mamenu;
        var tenmenu = $scope.item.MA_MENU;
        var pathArray = window.location.pathname.split('/');
        phanquyenService.check_trangthai(url, tenmenu).then(function (a) {
            $scope.listtrangthai = a;
            if ($scope.listtrangthai == true) {
                $scope.return = function () {
                    return ("hienthi");
                }
                $scope.class = function () {
                    return ("nothienthi");
                }
                $scope.kiemtra = function () {
                    return ("hienthi");
                };
                phanquyenService.get_trangthai(url, tenmenu).then(function (b) {
                    $scope.danhsachtrangthai = b;
                });
            } else {
                $scope.return = function () {
                    return ("nothienthi");
                }
                $scope.class = function () {
                    return ("hienthi");
                }
                $scope.kiemtra = function () {
                    return ("nothienthi");
                };
                $scope.create = function () {
                    var data_addnew = {
                        TRANG_THAI: 1,
                        MA_MENU: tenmenu,
                        USERNAME: url,
                    }
                    phanquyenService.add_trangthai(data_addnew).then(function (response) {
                        $scope.load_menu();
                        $scope.ketqua = "Successful!"
                        $scope.kiemtra = function () {
                            return ("hienthi");
                        };
                    });
                };
            }
        });
    };

    $scope.click = function (trangthai, mamenu) {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        var pathArray = window.location.pathname.split('/');
        var data_save = {
            USERNAME: url,
            TRANG_THAI: trangthai,
            MA_MENU: mamenu
        }
        phanquyenService.save_trangthai(url, mamenu, data_save).then(function (response) {
            $scope.load_menu();
        });
    }

});



app.controller('lichsuCtrl', function (lichsuService, $scope) {
    $scope.load_lichsu = function () {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        lichsuService.get_lichsu(url).then(function (a) {
            $scope.list_lichsu = a;
        });
    };
    $scope.load_lichsu();
    $scope.show = function (lichsu) {
        if (lichsu != "") {
            return ("nothienthi");
        } else {
            return ("hienthi");
        }
    }
});



app.controller('nhomnghiepvuCtrl', function (nhomnghiepvuService, $scope) {
    $scope.load_nhomnghiepvu = function () {
        nhomnghiepvuService.get_nhomnghiepvu().then(function (a) {
            $scope.list_nhomnghiepvu = a;
        });
    };
    $scope.load_nhomnghiepvu();

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            TEN_NHOM: $scope.tennhom,
            DIEN_GIAI: $scope.diengiai,
            TRUC_THUOC: "HOPLONG"
        }
        nhomnghiepvuService.add_nhomnghiepvu(data_add).then(function (response) {
            $scope.load_nhomnghiepvu();
        });
    };

    $scope.save = function (tennhom) {
        var data_save = {
            TEN_NHOM: tennhom,
            DIEN_GIAI: $scope.item.DIEN_GIAI,
            TRUC_THUOC: "HOPLONG"
        }
        nhomnghiepvuService.save_nhomnghiepvu(tennhom, data_save).then(function (response) {
            $scope.load_nhomnghiepvu();
        });
    };

    $scope.delete = function (tennhom) {
        var data_delete = {
            TEN_NHOM: tennhom
        }
        nhomnghiepvuService.delete_nhomnghiepvu(tennhom, data_delete).then(function (response) {
            $scope.load_nhomnghiepvu();
        });
    };

    $scope.open = function (tennhom) {
        $('#myDetails').modal('toggle');
        var tennhom = tennhom;
        nhomnghiepvuService.get_details(tennhom).then(function (z) {
            $scope.list_hovaten = z;
        });
        nhomnghiepvuService.get_mota(tennhom).then(function (h) {
            $scope.list_mota = h;
        });
        $scope.transfer = function (hovaten) {
            $scope.item = hovaten;
            var username = $scope.item.USERNAME;
            nhomnghiepvuService.get_trangthai(username).then(function (a) {
                $scope.trangthai = a;
                $scope.insert = function () {
                    nhomnghiepvuService.insert(tennhom, username);
                    $scope.checkthis = function () {
                        return ("nothienthi");
                    };
                };
                if ($scope.trangthai == true) {
                    $scope.checkthis = function () {
                        return ("nothienthi");
                    };
                } else {
                    $scope.checkthis = function () {
                        return ("hienthi");
                    };
                }
            });
        };
    };
});


app.controller('chitietnghiepvuCtrl', function (chitietnghiepvuService, $scope) {
    $scope.load_chitietnghiepvu = function () {
        chitietnghiepvuService.get_chitietnghiepvu().then(function (a) {
            $scope.list_chitietnghiepvu = a;
        });
    };
    $scope.load_chitietnghiepvu();


    $scope.transfer = function (item) {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        $scope.item = item;
        var mamota = $scope.item.ID;
        var pathArray = window.location.pathname.split('/');
        chitietnghiepvuService.get_trangthai(url, mamota).then(function (a) {
            $scope.listtrangthai = a;
            if ($scope.listtrangthai == true) {
                $scope.class = function () {
                    return ("hienthi");
                };
                $scope.delete = function () {
                    chitietnghiepvuService.delete_chitietnhomnghiepvu(url, mamota).then(function (response) {
                        reload();
                    });
                };
            } else {
                $scope.class = function () {
                    return ("nothienthi");
                };
                $scope.create = function () {
                    var data_add = {
                        ID_NHOM_NGHIEP_VU: url,
                        ID_CHI_TIET_NGHIEP_VU: mamota,
                    }
                    chitietnghiepvuService.add_chitietnhomnghiepvu(data_add);
                    //chitietnghiepvuService.add_chitietnhomnghiepvu(data_add).then(function (response) {
                    //reload();
                    // });
                };
            }
        });
    };


});


app.controller('themnghiepvuCtrl', function (themnghiepvuService, $scope) {
    $scope.load_nguoidung = function () {
        themnghiepvuService.get_user().then(function (a) {
            $scope.list_nguoidung = a;
        });
    };
    $scope.load_nguoidung();

    $scope.transfer = function (item) {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        $scope.item = item;
        var username = $scope.item.USERNAME;
        var pathArray = window.location.pathname.split('/');
        themnghiepvuService.get_trangthai(url, username).then(function (a) {
            $scope.listtrangthai = a;
            if ($scope.listtrangthai == true) {
                $scope.class = function () {
                    return ("hienthi");
                };
                $scope.delete = function () {
                    themnghiepvuService.delete_nghiepvunguoidung(url, username).then(function (response) {
                        reload();
                    });
                };
            } else {
                $scope.class = function () {
                    return ("nothienthi");
                };
                $scope.create = function () {
                    var data_add = {
                        ID_NHOM_NGHIEP_VU: url,
                        USERNAME: username,
                    }
                    themnghiepvuService.add_nghiepvunguoidung(data_add).then(function (response) {
                        $scope.ketqua = "Successful!"
                        $scope.kiemtra = function () {
                            return ("hienthi");
                        };
                    });
                };
            }
        });
    };
});

app.controller('congtyCtrl', function (congtyService, $scope) {
    $scope.load_congty = function () {
        congtyService.get_congty().then(function (a) {
            $scope.listcongty = a;
        });
    };
    $scope.load_congty();

    $scope.add = function () {
        var data_add = {
            MA_CONG_TY: $scope.macongty,
            TEN_CONG_TY: $scope.tencongty,
            NGAY_THANH_LAP: $scope.ngaythanhlap,
            EMAIL: $scope.email,
            FAX: $scope.fax,
            SDT: $scope.sdt,
            MST: $scope.mst,
            LOGO: $scope.logo,
            DIA_CHI: $scope.diachi,
            DIA_CHI_XUAT_HOA_DON: $scope.diachixuathoadon,
            CONG_TY_ME: $scope.congtyme,
            CAP_TO_CHUC: $scope.captochuc,
            GHI_CHU: $scope.ghi_chu
        }
        congtyService.add_congty(data_add).then(function (response) {
            $scope.load_congty();
        });
    };
    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.save = function (macongty) {
        var data_save = {
            MA_CONG_TY: macongty,
            TEN_CONG_TY: $scope.item.TEN_CONG_TY,
            NGAY_THANH_LAP: $scope.item.NGAY_THANH_LAP,
            EMAIL: $scope.item.EMAIL,
            FAX: $scope.item.FAX,
            SDT: $scope.item.SDT,
            MST: $scope.item.MST,
            LOGO: $scope.item.LOGO,
            DIA_CHI: $scope.item.DIA_CHI,
            DIA_CHI_XUAT_HOA_DON: $scope.item.DIA_CHI_XUAT_HOA_DON,
            CONG_TY_ME: $scope.item.CONG_TY_ME,
            CAP_TO_CHUC: $scope.item.CAP_TO_CHUC,
            GHI_CHU: $scope.item.GHI_CHU,
        }
        congtyService.save_congty(macongty, data_save).then(function (response) {
            $scope.load_congty();
        });
    };

    $scope.delete = function (macongty) {
        var data_delete = {
            MA_CONG_TY: macongty
        }
        congtyService.delete_congty(macongty, data_delete).then(function (response) {
            $scope.load_congty();
        });
    };
});


app.controller('mohinhcongtyCtrl', function (mohinhcongtyService, $scope) {
    $scope.load_mohinhcongty = function () {
        mohinhcongtyService.get_mohinhcongty().then(function (a) {
            $scope.listmohinhcongty = a;
        });
    };
    $scope.load_mohinhcongty();

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            MA_MO_HINH: $scope.ma_mo_hinh,
            TEN_MO_HINH: $scope.ten_mo_hinh,
            GHI_CHU: $scope.ghi_chu
        }
        mohinhcongtyService.add_mohinhcongty(data_add).then(function (response) {
            $scope.load_mohinhcongty();
        });
    };

    $scope.save = function (mamohinh) {
        var data_save = {
            MA_MO_HINH: mamohinh,
            TEN_MO_HINH: $scope.item.TEN_MO_HINH,
            GHI_CHU: $scope.item.GHI_CHU
        }
        mohinhcongtyService.save_mohinhcongty(mamohinh, data_save).then(function (response) {
            $scope.load_mohinhcongty();
        });
    };

    $scope.delete = function (mamohinh) {
        var data_delete = {
            MA_MO_HINH: mamohinh
        }
        mohinhcongtyService.delete_mohinhcongty(mamohinh, data_delete).then(function (response) {
            $scope.load_mohinhcongty();
        });
    };
});

app.controller('dichvuCtrl', function (dichvuService, $scope) {
    $scope.load_dichvu = function () {
        dichvuService.get_dichvu().then(function (a) {
            $scope.listdichvu = a;
        });
    };
    $scope.load_dichvu();

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            MA_DICH_VU: $scope.ma_dich_vu,
            TEN_DICH_VU: $scope.ten_dich_vu,
            GHI_CHU: $scope.ghi_chu
        }
        dichvuService.add_dichvu(data_add).then(function (response) {
            $scope.load_dichvu();
        });
    };

    $scope.save = function (madichvu) {
        var data_save = {
            MA_DICH_VU: madichvu,
            TEN_DICH_VU: $scope.item.TEN_DICH_VU,
            GHI_CHU: $scope.item.GHI_CHU
        }
        dichvuService.save_dichvu(madichvu, data_save).then(function (response) {
            $scope.load_dichvu();
        });
    };

    $scope.delete = function (madichvu) {
        var data_delete = {
            MA_DICH_VU: madichvu
        }
        dichvuService.delete_dichvu(madichvu, data_delete).then(function (response) {
            $scope.load_dichvu();
        });
    };
});


app.controller('hangduocquantamCtrl', function (hangduocquantamService, $scope) {
    $scope.load_hangduocquantam = function () {
        hangduocquantamService.get_hangduocquantam().then(function (a) {
            $scope.list_hangduocquantam = a;
        });
    };
    $scope.load_hangduocquantam();
});


app.controller('DangkypheduyetCtrl', function (DangkypheduyetService, $scope) {
    $scope.Dangkypheduyet = function () {
        DangkypheduyetService.get_dangkypheduyet().then(function (a) {
            $scope.dangkypheduyet = a;
        });
    };
    $scope.Dangkypheduyet();
    $scope.add = function () {
        var data_add = {
            ID: $scope.id,
            MA_PHE_DUYET: $scope.mapheduyet,
            NGUOI_PHE_DUYET: $scope.nguoipheduyet,
            TRUC_THUOC: 'HOPLONG',
            GHI_CHU: $scope.ghichu

        }

        DangkypheduyetService.add(data_add).then(function (response) {
            $scope.Dangkypheduyet();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            ID: $scope.item.ID,
            MA_PHE_DUYET: $scope.item.MA_PHE_DUYET,
            NGUOI_PHE_DUYET: $scope.item.NGUOI_PHE_DUYET,
            TRUC_THUOC: $scope.item.TRUC_THUOC,
            GHI_CHU: $scope.item.GHI_CHU

        }
        DangkypheduyetService.save(id, data_update).then(function (response) {
            $scope.Dangkypheduyet();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            ID: id
        }
        DangkypheduyetService.delete(id, data_delete).then(function (response) {
            $scope.Dangkypheduyet();
        });
    };

});

//Định khoản tự động
app.controller('DinhkhoantudongCtrl', function (DinhkhoantudongService, $scope) {
    $scope.Dinhkhoantudong = function () {
        DinhkhoantudongService.get_dinhkhoantudong().then(function (a) {
            $scope.dinhkhoantudong = a;
        });
    };
    $scope.Dinhkhoantudong();
    $scope.add = function () {
        var data_add = {
            ID: $scope.id,
            MA_LOAI_CHUNG_TU: $scope.maloaichungtu,
            MA_LY_DO: $scope.malydo,
            TEN_LY_DO: $scope.tenlydo,
            TK_NO: $scope.tkno,
            TK_CO: $scope.tkco

        }


        DinhkhoantudongService.add(data_add).then(function (response) {
            $scope.Dinhkhoantudong();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            ID: $scope.item.ID,
            MA_LOAI_CHUNG_TU: $scope.item.MA_LOAI_CHUNG_TU,
            MA_LY_DO: $scope.item.MA_LY_DO,
            TEN_LY_DO: $scope.item.TEN_LY_DO,
            TK_NO: $scope.item.TK_NO,
            TK_CO: $scope.item.TK_CO

        }
        DinhkhoantudongService.save(id, data_update).then(function (response) {
            $scope.Dinhkhoantudong();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            ID: id
        }
        DinhkhoantudongService.delete(id, data_delete).then(function (response) {
            $scope.Dinhkhoantudong();
        });
    };

});
// Loại chứng từ
app.controller('LoaichungtuCtrl', function (LoaichungtuService, $scope) {
    $scope.Loaichungtu = function () {
        LoaichungtuService.get_loaichungtu().then(function (a) {
            $scope.loaichungtu = a;
        });
    };
    $scope.Loaichungtu();
    $scope.add = function () {
        var data_add = {
            MA_LOAI_CHUNG_TU: $scope.maloaichungtu,
            TEN_LOAI_CHUNG_TU: $scope.tenloaichungtu
        }


        LoaichungtuService.add(data_add).then(function (response) {
            $scope.Loaichungtu();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            MA_LOAI_CHUNG_TU: $scope.item.MA_LOAI_CHUNG_TU,
            TEN_LOAI_CHUNG_TU: $scope.item.TEN_LOAI_CHUNG_TU
        }
        LoaichungtuService.save(id, data_update).then(function (response) {
            $scope.Loaichungtu();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MA_LOAI_CHUNG_TU: id
        }
        LoaichungtuService.delete(id, data_delete).then(function (response) {
            $scope.Loaichungtu();
        });
    };

});

// Loại đối tượng
app.controller('LoaidoituongCtrl', function (LoaidoituongService, $scope) {
    $scope.Loaidoituong = function () {
        LoaidoituongService.get_loaidoituong().then(function (a) {
            $scope.loaidoituong = a;
        });
    };
    $scope.Loaidoituong();
    $scope.add = function () {
        var data_add = {
            MA_LOAI_DOI_TUONG: $scope.maloaidoituong,
            TEN_LOAI_DOI_TUONG: $scope.tenloaidoituong
        }


        LoaidoituongService.add(data_add).then(function (response) {
            $scope.Loaidoituong();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            MA_LOAI_DOI_TUONG: $scope.item.MA_LOAI_DOI_TUONG,
            TEN_LOAI_DOI_TUONG: $scope.item.TEN_LOAI_DOI_TUONG
        }
        LoaidoituongService.save(id, data_update).then(function (response) {
            $scope.Loaidoituong();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MA_LOAI_DOI_TUONG: id
        }
        LoaidoituongService.delete(id, data_delete).then(function (response) {
            $scope.Loaidoituong();
        });
    };

});

// Loại tài khoản ngân hàng
app.controller('LoaitknganhangCtrl', function (LoaitknganhangService, $scope) {
    $scope.Loaitknganhang = function () {
        LoaitknganhangService.get_loaitknganhang().then(function (a) {
            $scope.loaitknganhang = a;
        });
    };
    $scope.Loaitknganhang();
    $scope.add = function () {
        var data_add = {
            MA_LOAI: $scope.maloai,
            TEN_LOAI: $scope.tenloai
        }


        LoaitknganhangService.add(data_add).then(function (response) {
            $scope.Loaitknganhang();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            MA_LOAI: $scope.item.MA_LOAI,
            TEN_LOAI: $scope.item.TEN_LOAI
        }
        LoaitknganhangService.save(id, data_update).then(function (response) {
            $scope.Loaitknganhang();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MA_LOAI: id
        }
        LoaitknganhangService.delete(id, data_delete).then(function (response) {
            $scope.Loaitknganhang();
        });
    };

});

// Loại tài khoản ngân hàng nội bộ
app.controller('LoaitknganhangnoiboCtrl', function (LoaitknganhangnoiboService, $scope) {
    $scope.Loaitknganhangnoibo = function () {
        LoaitknganhangnoiboService.get_loaitknganhangnoibo().then(function (a) {
            $scope.loaitknganhangnoibo = a;
        });
    };
    $scope.Loaitknganhangnoibo();
    $scope.add = function () {
        var data_add = {
            SO_TAI_KHOAN: $scope.sotaikhoan,
            MA_CONG_TY: 'HOPLONG',
            TEN_TAI_KHOAN: $scope.tentaikhoan,
            LOAI_TAI_KHOAN: $scope.loaitaikhoan,
            TEN_NGAN_HANG: $scope.tennganhang,
            CHI_NHANH: $scope.chinhanh,
            TINH_TP: $scope.tinhtp,
            GHI_CHU: $scope.ghichu
        }

        LoaitknganhangnoiboService.add(data_add).then(function (response) {
            $scope.Loaitknganhangnoibo();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            SO_TAI_KHOAN: $scope.item.SO_TAI_KHOAN,
            MA_CONG_TY: $scope.item.MA_CONG_TY,
            TEN_TAI_KHOAN: $scope.item.TEN_TAI_KHOAN,
            LOAI_TAI_KHOAN: $scope.item.LOAI_TAI_KHOAN,
            TEN_NGAN_HANG: $scope.item.TEN_NGAN_HANG,
            CHI_NHANH: $scope.item.CHI_NHANH,
            TINH_TP: $scope.item.TINH_TP,
            GHI_CHU: $scope.item.GHI_CHU
        }
        LoaitknganhangnoiboService.save(id, data_update).then(function (response) {
            $scope.Loaitknganhangnoibo();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MA_LOAI: id
        }
        LoaitknganhangnoiboService.delete(id, data_delete).then(function (response) {
            $scope.Loaitknganhangnoibo();
        });
    };

});

// Mẫu số hóa đơn
app.controller('MausohoadonCtrl', function (MausohoadonService, $scope) {
    $scope.Mausohoadon = function () {
        MausohoadonService.get_mausohoadon().then(function (a) {
            $scope.mausohoadon = a;
        });
    };
    $scope.Mausohoadon();
    $scope.add = function () {
        var data_add = {
            MAU_SO: $scope.mauso,
            TEN_MAU: $scope.tenmau
        }


        MausohoadonService.add(data_add).then(function (response) {
            $scope.Mausohoadon();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {
        var data_update = {
            MAU_SO: $scope.item.MAU_SO,
            TEN_MAU: $scope.item.TEN_MAU
        }
        MausohoadonService.save(id, data_update).then(function (response) {
            $scope.Mausohoadon();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MAU_SO: id
        }
        MausohoadonService.delete(id, data_delete).then(function (response) {
            $scope.Mausohoadon();
        });
    };

});


app.controller('thamchieuchungtuCtrl', function (thamchieuchungtuService, $scope) {
    $scope.load_thamchieu = function () {
        thamchieuchungtuService.get_thamchieu().then(function (a) {
            $scope.listthamchieu = a;
        });
    };

    $scope.load_chungtu = function () {
        thamchieuchungtuService.get_chungtu().then(function (a) {
            $scope.listchungtu = a;
        });
    };

    $scope.load_chungtu();
    $scope.load_thamchieu();

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            SO_CHUNG_TU_GOC: $scope.so_chung_tu_goc,
            SO_CHUNG_TU_THAM_CHIEU: $scope.so_chung_tu_tham_chieu,
        }
        thamchieuchungtuService.add_thamchieu(data_add).then(function (response) {
            $scope.load_thamchieu();
        });
    };

    $scope.save = function (id) {
        console.log(id)
        var data_save = {
            ID: id,
            SO_CHUNG_TU_GOC: $scope.item.SO_CHUNG_TU_GOC,
            SO_CHUNG_TU_THAM_CHIEU: $scope.item.SO_CHUNG_TU_THAM_CHIEU,
        }
        thamchieuchungtuService.save_thamchieu(id, data_save).then(function (response) {
            $scope.load_thamchieu();
        });
    };

    $scope.delete = function (id) {
        var data_delete = {

        }
        thamchieuchungtuService.delete_thamchieu(id, data_delete).then(function (response) {
            $scope.load_thamchieu();
        });
    };
});

app.controller('salephutrachCtrl', function (salephutrachService, khachhangService, $scope, $http) {
    $scope.load_salephutrach = function () {
        salephutrachService.get_salephutrach().then(function (a) {
            $scope.listsalephutrach = a;
        });
    };

    $scope.load_nhanvienphutrach = function () {
        salephutrachService.get_nhanvienphutrach().then(function (a) {
            $scope.listnhanvienphutrach = a;
        });
    };

    $scope.load_lienhe = function () {
        salephutrachService.get_idlienhe().then(function (a) {
            $scope.listlienhe = a;
        });
    };

    $scope.load_nhanvienkd = function () {
        khachhangService.get_nhanvienkd().then(function (c) {
            $scope.list_nhanvienkd = c;
        });
    };
    $scope.load_nhanvienkd();
    $scope.load_salephutrach();
    $scope.load_nhanvienphutrach();
    $scope.load_lienhe();

    $scope.edit = function (item) {
        $scope.item = item;     
    };

    $scope.add = function () {
        var data_add = {
            ID_LIEN_HE : $scope.newlienhe.ID_LIEN_HE,
            SALES_PHU_TRACH: $scope.new.USERNAME,
            NGAY_BAT_DAU_PHU_TRACH: $scope.ngay_bat_dau_phu_trach,
            NGAY_KET_THUC_PHU_TRACH: $scope.ngay_ket_thuc_phu_trach,
            TRANG_THAI: $scope.trangthai,
            SALES_CU: $scope.sales_cu,
            SALES_MOI : $scope.sales_moi
        }
        salephutrachService.add_salephutrach(data_add).then(function (response) {
            $scope.load_salephutrach();
        });
    };

    $scope.save = function (id) {
        var data_save = {
            ID: id,
            ID_LIEN_HE: $scope.item.ID_LIEN_HE,
            SALES_PHU_TRACH: $scope.item.SALES_PHU_TRACH,
            NGAY_BAT_DAU_PHU_TRACH: $scope.item.NGAY_BAT_DAU_PHU_TRACH,
            NGAY_KET_THUC_PHU_TRACH: $scope.item.NGAY_KET_THUC_PHU_TRACH,
            TRANG_THAI: $scope.item.TRANG_THAI,
            SALES_CU: $scope.item.SALES_CU,
            SALES_MOI : $scope.item.SALES_MOI,
        }
        salephutrachService.save_salephutrach(id, data_save).then(function (response) {
            $scope.load_salephutrach();
        });
    };

    $scope.delete = function (id) {
        var data_delete = {

        }
        salephutrachService.delete_salephutrach(id, data_delete).then(function (response) {
            $scope.load_salephutrach();
        });
    };

    //Lọc lien he them moi
    $scope.arrayLienHenewFinded = [];
    $scope.arraynewLienHe = [];
    $scope.showtable_lienhenew = false;

    $http.get(window.location.origin + '/api/Api_ListLienHeKH')
            .then(function (response) {
                if (response.data) {
                    $scope.arraynewLienHe = response.data;
                    $scope.arrayLienHenewFinded = $scope.arraynewLienHe.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.newlienheFind = function () {
        if (!$scope.newlienhe.NGUOI_LIEN_HE) {
            $scope.arrayLienHenewFinded = $scope.arraynewLienHe.map(function (item) {
                return item;
            });
        }
        $scope.arrayLienHenewFinded = $scope.arraynewLienHe.filter(function (item) {
            if (item.NGUOI_LIEN_HE.toLowerCase().indexOf($scope.newlienhe.NGUOI_LIEN_HE.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfoLHnewStaff = function (staff) {
        $scope.newlienhe = staff;
        $scope.showtable_lienhenew = false;
    }
    // End Lọc lien he them moi

    //Lọc nhân viên them moi
    $scope.arraynewNVFinded = [];
    $scope.arraynewStaffs = [];
    $scope.showtable_ho_va_ten_new = false;

    $http.get(window.location.origin + '/api/Api_NhanvienKD')
            .then(function (response) {
                if (response.data) {
                    $scope.arraynewStaffs = response.data;
                    $scope.arraynewNVFinded = $scope.arraynewStaffs.map(function (item) {
                        return item;
                    });
                }
            }, function (error) {
                console.log(error);
            });

    $scope.onNhanVienNewFind = function () {
        if (!$scope.new.HO_VA_TEN) {
            $scope.arraynewNVFinded = $scope.arraynewStaffs.map(function (item) {
                return item;
            });
        }
        $scope.arraynewNVFinded = $scope.arraynewStaffs.filter(function (item) {
            if (item.HO_VA_TEN.toLowerCase().indexOf($scope.new.HO_VA_TEN.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    $scope.showInfonewStaff = function (staff) {
        $scope.new = staff;
        $scope.showtable_ho_va_ten_new = false;
    }
    // End Lọc nhân viên them moi
   
});


app.controller('purphutrachCtrl', function (purphutrachService, $scope) {
    $scope.load_purphutrach = function () {
        purphutrachService.get_purphutrach().then(function (a) {
            $scope.listpurphutrach = a;
        });
    };

    $scope.load_nhanvienpurphutrach = function () {
        purphutrachService.get_nhanvienpurphutrach().then(function (a) {
            $scope.listnhanvienpurphutrach = a;
        });
    };

    $scope.load_lienhe = function () {
        purphutrachService.get_idlienhe().then(function (a) {
            $scope.listlienhe = a;
        });
    };


    $scope.load_purphutrach();
    $scope.load_nhanvienpurphutrach();
    $scope.load_lienhe();

    $scope.edit = function (item) {
        $scope.item = item;
    };

    $scope.add = function () {
        var data_add = {
            ID_LIEN_HE: $scope.id_lien_he,
            PUR_PHU_TRACH: $scope.pur_phu_trach,
            NGAY_BAT_DAU_PHU_TRACH: $scope.ngay_bat_dau_phu_trach,
            NGAY_KET_THUC_PHU_TRACH: $scope.ngay_ket_thuc_phu_trach,
            TRANG_THAI: $scope.trangthai,
        }
        purphutrachService.add_purphutrach(data_add).then(function (response) {
            $scope.load_purphutrach();
        });
    };

    $scope.save = function (id) {
        var data_save = {
            ID: id,
            ID_LIEN_HE: $scope.item.ID_LIEN_HE,
            PUR_PHU_TRACH: $scope.item.PUR_PHU_TRACH,
            NGAY_BAT_DAU_PHU_TRACH: $scope.item.NGAY_BAT_DAU_PHU_TRACH,
            NGAY_KET_THUC_PHU_TRACH: $scope.item.NGAY_KET_THUC_PHU_TRACH,
            TRANG_THAI: $scope.item.TRANG_THAI,
        }
        purphutrachService.save_purphutrach(id, data_save).then(function (response) {
            $scope.load_purphutrach();
        });
    };

    $scope.delete = function (id) {
        var data_delete = {

        }
        purphutrachService.delete_purphutrach(id, data_delete).then(function (response) {
            $scope.load_purphutrach();
        });
    };
});

// Đơn hàng dự kiến
app.controller('DonhangdukienCtrl', function (DonhangdukienService, $scope) {
    $scope.Donhangdukien = function () {
        var username = $('#username').val();
        DonhangdukienService.get_donhangdukien(username).then(function (a) {
            $scope.donhangdukien = a;
        });
        DonhangdukienService.get_khachhang().then(function (b) {
            $scope.danhsachkhachhang = b;
        });
    };
    $scope.Donhangdukien();
    $scope.add = function () {

        var data_add = {
            MA_DU_KIEN: $scope.madukien,
            MA_KHACH_HANG: $scope.makhachhang,
            THANH_CONG: $scope.thanhcong,
            THAT_BAI: $scope.thatbai,
            LY_DO_THAT_BAI: $scope.lydothatbai,
            TRUC_THUOC: 'HOPLONG'
        }


        DonhangdukienService.add(data_add).then(function (response) {
            $scope.Donhangdukien();
        });
    }

    $scope.edit = function (item) {
        $scope.item = item;

    }
    $scope.passing = function (item) {
        $scope.item = item;
    }

    $scope.save = function (id) {

        var data_update = {
            MAU_DU_KIEN: $scope.item.MAU_DU_KIEN,
            MA_KHACH_HANG: $scope.item.MA_KHACH_HANG,
            THANH_CONG: $scope.item.THANH_CONG,
            THAT_BAI: $scope.item.THAT_BAI,
            LY_DO_THAT_BAI: $scope.item.LY_DO_THAT_BAI,
            TRUC_THUOC: $scope.item.TRUC_THUOC
        }
        DonhangdukienService.save(id, thanhcong, thatbai, data_update).then(function (response) {
            $scope.Donhangdukien();
        });
    }

    $scope.delete = function (id) {
        var data_delete = {
            MAU_DU_KIEN: id
        }
        DonhangdukienService.delete(id, data_delete).then(function (response) {
            $scope.Donhangdukien();
        });
    };

});

app.controller('productdetailsCtrl', function (productdetailsService, $scope) {
    $scope.load_productdetails = function () {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        productdetailsService.get_productdetails(url).then(function (a) {
            $scope.list_productdetails = a;
        });
    };
    $scope.load_productdetails();
});



// Các phần bổ trợ,không sửa xóa,viết code js ở trên đoạn này
function reload() {
    location.reload();
}

function change() {
    $('.listmenu').toggle();
}

function accept() {
    $('.listmenu').css('display', 'none');
    reload();
}
app.directive('checkList', function () {
    return {
        scope: {
            list: '=checkList',
            value: '@'
        },
        link: function (scope, elem, attrs) {
            var handler = function (setup) {
                var checked = elem.prop('checked');
                var index = scope.list.indexOf(scope.value);

                if (checked && index == -1) {
                    if (setup) elem.prop('checked', false);
                    else scope.list.push(scope.value);
                } else if (!checked && index != -1) {
                    if (setup) elem.prop('checked', true);
                    else scope.list.splice(index, 1);
                }
            };

            var setupHandler = handler.bind(null, true);
            var changeHandler = handler.bind(null, false);

            elem.on('change', function () {
                scope.$apply(changeHandler);
            });
            scope.$watch('list', setupHandler, true);
        }
    };
});

app.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });

app.filter('stringToDate', function ($filter) {
    return function (ele, dateFormat) {
        return $filter('date')(new Date(ele), dateFormat);
    }
})

function help_left() {
    $('.help_left').show();
    $('.nohelp_left').hide();
    $('.container_right').hide();
}

function nohelp_left() {
    $('.help_left').hide();
    $('.nohelp_left').show();
    $('.container_right').show();
}

function help_right() {
    $('.help_right').show();
    $('.nohelp_right').hide();
    $('.container_left').hide();
}

function nohelp_right() {
    $('.help_right').hide();
    $('.nohelp_right').show();
    $('.container_left').show();
}

// End bổ trợ




