// Khach hang
app.controller('khachhangCtrl', function (khachhangService, $scope, $http, $location) {

    $scope.createnew = function () {
        var salestao = $('#salehienthoi').val();
        var logo = $('#imgInp').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];
        $scope.Thong_tin_KH = {
            MA_KHACH_HANG: $scope.arraythongtin.ma_khach_hang,
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
            GHI_CHU: $scope.arraythongtin.ghi_chu,
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
                SALES_MOI: $scope.arraylienhe[i].sales_moi,
                SALES_CU: $scope.arraylienhe[i].sales_cu,
                SALE_HIEN_THOI: $scope.arraylienhe[i].sales_phu_trach,
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
                    NHOM_NGANH: $scope.nhom_nganh
                }
                khachhangService.add_phanloaikh(phanloaikh_add).then(function (response) {
                    $scope.load_khachhang('A');
                });

                var chuyensale_add = {
                    MA_KHACH_HANG: $scope.lastmakh,
                    SALE_HIEN_THOI: salestao,
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
        khachhangService.get_lienhekh(makh).then(function (lienhe) {
            $scope.list_lienhe = lienhe;
        });
    };

    $scope.get_taikhoan = function (makh) {
        khachhangService.get_taikhoankh(makh).then(function (taikhoankh) {
            $scope.list_taikhoankh = taikhoankh;
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
    };

    $scope.EditLienHe = function (lienhe) {
        $scope.editlh = lienhe;
    };

    $scope.save = function (makh, id) {
        var logo = $('#imgEdit').val();
        var name_without_ext = (logo.split('\\').pop().split('/').pop().split())[0];
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
            GHI_CHU: $scope.kh.GHI_CHU,
            TRUC_THUOC: "HOPLONG"
        }
        khachhangService.save_khachhang(makh, kh_save).then(function (response) {
            $scope.load_khachhang('A');
            var phanloai_save = {
                ID: id,
                MA_KHACH_HANG: makh,
                MA_LOAI_KHACH: $scope.kh.MA_LOAI_KHACH
            }
            khachhangService.save_phanloaikh(id, phanloai_save).then(function (response) {
                $scope.load_khachhang('A');
            });
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
        }
        khachhangService.save_lienhe(idlienhe, data_save).then(function (response) {
            $scope.load_khachhang();

            var data_savesalesphutrach = {
                SALES_CU: $scope.editlh.SALES_CU,
                SALES_MOI: $scope.editlh.SALES_MOI,
                ID_LIEN_HE: idlienhe,
                SALES_PHU_TRACH: $scope.editlh.SALES_PHU_TRACH,
                NGAY_KET_THUC_PHU_TRACH: $scope.editlh.NGAY_KET_THUC_PHU_TRACH,
                TRANG_THAI: $scope.editlh.TRANG_THAI,
            }
            khachhangService.save_salesphutrach($scope.editlh.SALES_PHU_TRACH, idlienhe, data_savesalesphutrach).then(function (response) {
                $scope.load_khachhang();
            });

        });
    };

    $scope.addnew = function (makh) {
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
            SDT2: $scope.so_dien_thoai2,
            SALES_PHU_TRACH: $scope.nvkd.USERNAME,
            SALES_MOI: $scope.sales_moi,
            SALES_CU: $scope.sales_cu,
        }
        khachhangService.add_lienhe(data_add).then(function (response) {
            $scope.load_khachhang();
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
            $scope.load_khachhang();
        });
    };

    $scope.dieukhoantt = ['5 ngày', '7 ngày', '30 ngày', 'Ngày 5 hàng tháng', 'Ngày 15 hàng tháng', 'Ngày 30 hàng tháng'];
    $scope.tinhtranghoatdong = ['Cầm chừng', 'Bình thường', 'Sắp phá sản', 'Đã phá sản'];

    $scope.range = function (min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };


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
});
// End khach hang
