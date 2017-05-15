
app.controller('baogiaCtrl', function ($scope, $http, baogiaService, $timeout) {

    var isadmin = $('#isadmin').val();
    var username = $('#username').val();


    var tong_gia_tri_thuc_te_tinh_cm_new = 0;
    var tong_gia_tri_theo_hop_dong_tinh_cm_new = 0;
    var tong_chi_phi_hoa_don_tinh_cm_new = 0;
    var tong_khach_nhan_tinh_cm_new = 0;


    var tong_gia_tri_thuc_te_tinh_cm_edit = 0;
    var tong_gia_tri_theo_hop_dong_tinh_cm_edit = 0;
    var tong_chi_phi_hoa_don_tinh_cm_edit = 0;
    var tong_khach_nhan_tinh_cm_edit = 0;

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

    $scope.Remove = function (index,item) {

        $scope.item = item;
        $scope.Detail.ListXoa.push({
            ID: $scope.item.ID,
            TEN_HANG: $scope.item.TEN_HANG,
            MA_HANG: $scope.item.MA_HANG,
            MA_DIEU_CHINH: $scope.item.MA_DIEU_CHINH,
            HANG_SP: $scope.item.HANG_SP,
            DVT: $scope.item.DVT,
            SO_LUONG: $scope.item.SO_LUONG,
            DON_GIA: $scope.item.DON_GIA_MOI,
            CHIET_KHAU: $scope.item.CHIET_KHAU,
            GIA_LIST: $scope.item.GIA_LIST,
            DON_GIA_NHAP: $scope.item.DON_GIA_NHAP,
            HE_SO_LOI_NHUAN: $scope.item.HE_SO_LOI_NHUAN,
            DON_GIA_BAO_DI_NET: $scope.item.DON_GIA_BAO_DI_NET,
            CM: $scope.item.CM,
            DON_GIA_MOI: $scope.item.DON_GIA_MOI,
            THUE_TNDN: $scope.item.THUE_TNDN,
            TIEN_THUE_TNDN: $scope.item.TIEN_THUE_TNDN,
            KHACH_NHAN_DUOC: $scope.item.KHACH_NHAN_DUOC,
            THANH_TIEN: $scope.item.THANH_TIEN,
            THANH_TIEN_NET: $scope.item.THANH_TIEN_NET,
            THOI_GIAN_GIAO_HANG: $scope.item.THOI_GIAN_GIAO_HANG,
            GHI_CHU: $scope.item.GHI_CHU,
        });

        $scope.Detail.ListAdd.splice(index, 1);
        var thue_suat_gtgt = $('#thue_suat_gtgt').val() || 0;
        var tong_gia_tri_thuc_te_edit = 0;
        var tong_gia_tri_theo_hop_dong_edit = 0;
        var tong_chi_phi_hoa_don_edit = 0;
        var tong_khach_nhan_edit = 0;

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            tong_gia_tri_thuc_te_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
            tong_gia_tri_theo_hop_dong_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
            tong_chi_phi_hoa_don_edit = parseFloat($scope.Detail.ListAdd[i].TIEN_THUE_TNDN + tong_chi_phi_hoa_don_edit);
            tong_khach_nhan_edit = parseFloat($scope.Detail.ListAdd[i].KHACH_NHAN_DUOC + tong_khach_nhan_edit);
        }
        $scope.tong_gia_tri_thuc_te_edit = tong_gia_tri_thuc_te_edit;
        $scope.tong_gia_tri_theo_hop_dong_edit = tong_gia_tri_theo_hop_dong_edit;
        $scope.tong_chi_phi_hoa_don_edit = tong_chi_phi_hoa_don_edit;
        $scope.tong_khach_nhan_edit = tong_khach_nhan_edit;

        $scope.gia_tri_chenh_lech_edit = parseFloat($scope.tong_gia_tri_theo_hop_dong_edit - $scope.tong_gia_tri_thuc_te_edit);

        $scope.thue_vat_edit = parseFloat($scope.tong_gia_tri_theo_hop_dong_edit * (thue_suat_gtgt / 100));


        $scope.tong_gia_tri_thu_cua_khach_edit = parseFloat($scope.tong_gia_tri_thuc_te_edit + $scope.tong_chi_phi_hoa_don_edit + $scope.thue_vat_edit + $scope.tong_khach_nhan_edit);
        if ($scope.Detail.ListXoa[0].ID != null && $scope.Detail.ListXoa[0].ID != undefined) {
            $http({
                method: 'DELETE',
                data: $scope.Detail.ListXoa,
                url: window.location.origin + '/api/Api_ChiTietBaoGia/XoaCT_BAO_GIA/' + $scope.Detail.ListXoa[0].ID
            }).then(function successCallback(response) {
                alert("Xóa thành công");

                // Cập nhật lại CSDL

                var url = document.location.href;
                url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
                url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
                url = url.substring(url.lastIndexOf("/") + 1, url.length);


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
                    TONG_TIEN: $scope.tong_gia_tri_theo_hop_dong_edit,
                    DA_DUYET: $scope.BangBaoGia[0].DA_DUYET,
                    DA_TRUNG: $scope.BangBaoGia[0].DA_TRUNG,
                    DA_HUY: $scope.BangBaoGia[0].DA_HUY,
                    TRUC_THUOC: 'HOPLONG',
                    THUE_SUAT_GTGT: $scope.BangBaoGia[0].THUE_SUAT_GTGT,
                    TIEN_THUE_GTGT: $scope.thue_vat_edit,
                    TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_edit,
                    GIA_TRI_THUC_THU_TU_KHACH: $scope.tong_gia_tri_thu_cua_khach_edit,
                    TONG_GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_edit,
                    TONG_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_edit,
                    THUC_NHAN_CUA_KHACH: $scope.tong_khach_nhan_edit,
                    DANG_CHO_PHAN_HOI: true,
                };

                $scope.arrayChiTietBaoGia = [];

                for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {


                    var ChiTietBaoGia = {
                        ID: $scope.Detail.ListAdd[i].ID,
                        TEN_HANG: $scope.Detail.ListAdd[i].TEN_HANG,
                        MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                        MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
                        HANG_SP: $scope.Detail.ListAdd[i].HANG_SP,
                        DVT: $scope.Detail.ListAdd[i].DVT,
                        SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                        DON_GIA: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                        CHIET_KHAU: $scope.Detail.ListAdd[i].CHIET_KHAU,
                        GIA_LIST: parseFloat($scope.Detail.ListAdd[i].GIA_LIST),
                        DON_GIA_NHAP: parseFloat($scope.Detail.ListAdd[i].DON_GIA_NHAP),
                        HE_SO_LOI_NHUAN: $scope.Detail.ListAdd[i].HE_SO_LOI_NHUAN,
                        DON_GIA_BAO_DI_NET: $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET,
                        CM: $scope.Detail.ListAdd[i].CM,
                        DON_GIA_MOI: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                        THUE_TNDN: $scope.Detail.ListAdd[i].THUE_TNDN,
                        TIEN_THUE_TNDN: $scope.Detail.ListAdd[i].TIEN_THUE_TNDN,
                        KHACH_NHAN_DUOC: $scope.Detail.ListAdd[i].KHACH_NHAN_DUOC,
                        THANH_TIEN: $scope.Detail.ListAdd[i].THANH_TIEN,
                        THANH_TIEN_NET: $scope.Detail.ListAdd[i].THANH_TIEN_NET,
                        THOI_GIAN_GIAO_HANG: $scope.Detail.ListAdd[i].THOI_GIAN_GIAO_HANG,
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
                            SuccessSystem("Hoàn Thành Lưu");
                        }, function errorCallback(response) {
                            ErrorSystem('Không lưu được chi tiết giữ kho');
                        });
                        return;
                    }

                }, function errorCallback(response) {
                    console.log(response);
                    ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
                });

            }, function errorCallback(response) {
                ErrorSystem('Lỗi - Xóa không thành công');
            });
        }
        $scope.Detail.ListXoa.splice(0, 1);
    }

    $scope.RemoveNew = function (index, detail) {
        $scope.Detail.ListNew.splice(index, 1);

        $scope.detail = detail;
        var phi_van_chuyen = parseFloat($('#tienvanchuyen').val()) || 0;
        var tong_gia_tri_thuc_te_new = 0;
        var tong_gia_tri_theo_hop_dong_new = 0;
        var tong_chi_phi_hoa_don_new = 0;
        var tong_khach_nhan_new = 0;

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            tong_gia_tri_thuc_te_new = parseFloat($scope.Detail.ListNew[i].thanh_tien_net + tong_gia_tri_thuc_te_new);
            tong_gia_tri_theo_hop_dong_new = parseFloat($scope.Detail.ListNew[i].thanh_tien + tong_gia_tri_theo_hop_dong_new);
            tong_chi_phi_hoa_don_new = parseFloat($scope.Detail.ListNew[i].tien_thue_tndn + tong_chi_phi_hoa_don_new);
            tong_khach_nhan_new = parseFloat($scope.Detail.ListNew[i].khach_nhan + tong_khach_nhan_new);
        }
        $scope.tong_gia_tri_thuc_te_new = tong_gia_tri_thuc_te_new;
        $scope.tong_gia_tri_theo_hop_dong_new = tong_gia_tri_theo_hop_dong_new;
        $scope.tong_chi_phi_hoa_don_new = tong_chi_phi_hoa_don_new;
        $scope.tong_khach_nhan_new = tong_khach_nhan_new;

        $scope.gia_tri_chenh_lech_new = parseFloat($scope.tong_gia_tri_theo_hop_dong_new - $scope.tong_gia_tri_thuc_te_new);

        $scope.thue_vat_new = parseFloat($scope.tong_gia_tri_theo_hop_dong_new * ($scope.thue_suat_gtgt / 100));


        $scope.tong_gia_tri_thu_cua_khach_new = parseFloat($scope.tong_gia_tri_thuc_te_new + $scope.tong_chi_phi_hoa_don_new + $scope.thue_vat_new + $scope.tong_khach_nhan_new);

        tong_gia_tri_thuc_te_tinh_cm_new = $scope.tong_gia_tri_thuc_te_new;
        tong_gia_tri_theo_hop_dong_tinh_cm_new = $scope.tong_gia_tri_theo_hop_dong_new;
        tong_chi_phi_hoa_don_tinh_cm_new = $scope.tong_chi_phi_hoa_don_new;
        tong_khach_nhan_tinh_cm_new = $scope.tong_khach_nhan_new;
    }

    $scope.kiemtra = function (item) {
        $scope.item = item;
        var thue_suat_gtgt = $('#thue_suat_gtgt').val() || 0;
        var tong_gia_tri_thuc_te_edit = 0;
        var tong_gia_tri_theo_hop_dong_edit = 0;
        var tong_chi_phi_hoa_don_edit = 0;
        var tong_khach_nhan_edit = 0;

        if (parseFloat($scope.item.GIA_LIST) != null && parseFloat($scope.item.GIA_LIST) != "") {
            $scope.item.DON_GIA_BAO_DI_NET = parseFloat($scope.item.GIA_LIST) - parseFloat((parseFloat($scope.item.GIA_LIST) * ($scope.item.CHIET_KHAU / 100)));
        } else if ($scope.item.DON_GIA_NHAP != null && $scope.item.DON_GIA_NHAP != "") {
            $scope.item.DON_GIA_BAO_DI_NET = parseFloat($scope.item.DON_GIA_NHAP) + parseFloat((parseFloat($scope.item.DON_GIA_NHAP) * ($scope.item.HE_SO_LOI_NHUAN / 100)));
        };

        if ($scope.item.CM != null && $scope.item.CM != undefined) {
            $scope.item.KHACH_NHAN_DUOC = parseFloat($scope.item.DON_GIA_BAO_DI_NET * ($scope.item.CM / 100)) * $scope.item.SO_LUONG;

            $scope.bien_trung_gian = parseFloat(($scope.item.KHACH_NHAN_DUOC * 100) / 80);
            $scope.item.TIEN_THUE_TNDN = parseFloat($scope.bien_trung_gian * ($scope.item.THUE_TNDN / 100));

            $scope.item.DON_GIA_MOI = parseFloat($scope.item.DON_GIA_BAO_DI_NET + $scope.item.KHACH_NHAN_DUOC + $scope.item.TIEN_THUE_TNDN);
        }
        //} else if ($scope.item.DON_GIA_MOI != null && $scope.item.DON_GIA_MOI != undefined && $scope.item.DON_GIA_MOI != 0) {
        //    $scope.trung_gian = parseFloat($scope.item.DON_GIA_MOI - $scope.item.DON_GIA_BAO_DI_NET);
        //    $scope.item.TIEN_THUE_TNDN = parseFloat($scope.trung_gian * ($scope.item.THUE_TNDN / 100));
        //    $scope.item.KHACH_NHAN_DUOC = parseFloat($scope.trung_gian - $scope.item.TIEN_THUE_TNDN);
        //    //$scope.item.CM = (($scope.item.KHACH_NHAN_DUOC * 100) / $scope.item.DON_GIA_MOI);
        //}

        
        

        $scope.item.THANH_TIEN = $scope.item.DON_GIA_MOI * $scope.item.SO_LUONG;
        $scope.item.THANH_TIEN_NET = $scope.item.SO_LUONG * $scope.item.DON_GIA_BAO_DI_NET;

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            tong_gia_tri_thuc_te_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
            tong_gia_tri_theo_hop_dong_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
            tong_chi_phi_hoa_don_edit = parseFloat($scope.Detail.ListAdd[i].TIEN_THUE_TNDN + tong_chi_phi_hoa_don_edit);
            tong_khach_nhan_edit = parseFloat($scope.Detail.ListAdd[i].KHACH_NHAN_DUOC + tong_khach_nhan_edit);
        }
        $scope.tong_gia_tri_thuc_te_edit = tong_gia_tri_thuc_te_edit;
        $scope.tong_gia_tri_theo_hop_dong_edit = tong_gia_tri_theo_hop_dong_edit;
        $scope.tong_chi_phi_hoa_don_edit = tong_chi_phi_hoa_don_edit;
        $scope.tong_khach_nhan_edit = tong_khach_nhan_edit;

        $scope.gia_tri_chenh_lech_edit = parseFloat($scope.tong_gia_tri_theo_hop_dong_edit - $scope.tong_gia_tri_thuc_te_edit);

        $scope.thue_vat_edit = parseFloat($scope.tong_gia_tri_theo_hop_dong_edit * (thue_suat_gtgt / 100));


        $scope.tong_gia_tri_thu_cua_khach_edit = parseFloat($scope.tong_gia_tri_thuc_te_edit + $scope.tong_chi_phi_hoa_don_edit + $scope.thue_vat_edit + $scope.tong_khach_nhan_edit);

    };

    $scope.test = function (detail) {
        $scope.detail = detail;
        var phi_van_chuyen = parseFloat($('#tienvanchuyen').val()) || 0;
        var tong_gia_tri_thuc_te_new = 0;
        var tong_gia_tri_theo_hop_dong_new = 0;
        var tong_chi_phi_hoa_don_new = 0;
        var tong_khach_nhan_new = 0;

        if (parseFloat($scope.detail.gia_list) != null && parseFloat($scope.detail.gia_list) != "") {
            $scope.detail.gia_bao_di_net = parseFloat($scope.detail.gia_list) - parseFloat((parseFloat($scope.detail.gia_list) * ($scope.detail.chiet_khau / 100)));
        } else if ($scope.detail.gia_nhap != null && $scope.detail.gia_nhap != "") {
            $scope.detail.gia_bao_di_net = parseFloat($scope.detail.gia_nhap) + parseFloat((parseFloat($scope.detail.gia_nhap) * ($scope.detail.he_so_loi_nhuan / 100)));
        };

        if ($scope.detail.hoa_hong != null && $scope.detail.hoa_hong != undefined) {
            $scope.detail.khach_nhan =parseFloat( $scope.detail.gia_bao_di_net * ($scope.detail.hoa_hong / 100)) * $scope.detail.so_luong;

            $scope.bien_trung_gian =parseFloat (($scope.detail.khach_nhan * 100) / 80);
            $scope.detail.tien_thue_tndn = parseFloat($scope.bien_trung_gian * ($scope.detail.thue_tndn / 100));

            $scope.detail.don_gia_ban = parseFloat($scope.detail.gia_bao_di_net + $scope.detail.khach_nhan + $scope.detail.tien_thue_tndn);
        }
        //else if ($scope.detail.don_gia_ban != null || $scope.detail.don_gia_ban != undefined || $scope.detail.don_gia_ban != 0) {
        //    $scope.trung_gian =parseFloat( $scope.detail.don_gia_ban - $scope.detail.gia_bao_di_net);
        //    $scope.detail.tien_thue_tndn =parseFloat( $scope.trung_gian * ($scope.detail.thue_tndn / 100));
        //    $scope.detail.khach_nhan =parseFloat( $scope.trung_gian - $scope.detail.tien_thue_tndn);
        //    //$scope.detail.hoa_hong = (($scope.detail.khach_nhan * 100) / $scope.detail.gia_bao_di_net);
        //}
       
        $scope.detail.thanh_tien = $scope.detail.don_gia_ban * $scope.detail.so_luong;
        $scope.detail.thanh_tien_net = $scope.detail.so_luong * $scope.detail.gia_bao_di_net;

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            tong_gia_tri_thuc_te_new = parseFloat($scope.Detail.ListNew[i].thanh_tien_net + tong_gia_tri_thuc_te_new);
            tong_gia_tri_theo_hop_dong_new = parseFloat($scope.Detail.ListNew[i].thanh_tien + tong_gia_tri_theo_hop_dong_new);
            tong_chi_phi_hoa_don_new = parseFloat($scope.Detail.ListNew[i].tien_thue_tndn + tong_chi_phi_hoa_don_new);
            tong_khach_nhan_new = parseFloat($scope.Detail.ListNew[i].khach_nhan + tong_khach_nhan_new);
        }
        $scope.tong_gia_tri_thuc_te_new = tong_gia_tri_thuc_te_new;
        $scope.tong_gia_tri_theo_hop_dong_new = tong_gia_tri_theo_hop_dong_new;
        $scope.tong_chi_phi_hoa_don_new = tong_chi_phi_hoa_don_new;
        $scope.tong_khach_nhan_new = tong_khach_nhan_new;

        $scope.gia_tri_chenh_lech_new = parseFloat($scope.tong_gia_tri_theo_hop_dong_new - $scope.tong_gia_tri_thuc_te_new);
        
        $scope.thue_vat_new = parseFloat($scope.tong_gia_tri_theo_hop_dong_new * ($scope.thue_suat_gtgt / 100));
       

        $scope.tong_gia_tri_thu_cua_khach_new = parseFloat($scope.tong_gia_tri_thuc_te_new + $scope.tong_chi_phi_hoa_don_new + $scope.thue_vat_new + $scope.tong_khach_nhan_new);


        tong_gia_tri_thuc_te_tinh_cm_new = $scope.tong_gia_tri_thuc_te_new;
        tong_gia_tri_theo_hop_dong_tinh_cm_new = $scope.tong_gia_tri_theo_hop_dong_new;
        tong_chi_phi_hoa_don_tinh_cm_new = $scope.tong_chi_phi_hoa_don_new;
        tong_khach_nhan_tinh_cm_new = $scope.tong_khach_nhan_new;
    };

    $scope.tinh_cm_khach = function (tien_khach_nhan) {
        var phi_van_chuyen = parseFloat($('#tienvanchuyen').val()) || 0;
        var tong_gia_tri_thuc_te_new = 0;
        var tong_gia_tri_theo_hop_dong_new = 0;
        var tong_chi_phi_hoa_don_new = 0;
        var tong_khach_nhan_new = 0;
        var chenhlech = 0;
        var khachnhan = 0;
        var newcm = 0;

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            $scope.Detail.ListNew[i].don_gia_ban = $scope.Detail.ListNew[i].gia_bao_di_net;

            $scope.Detail.ListNew[i].thanh_tien = $scope.Detail.ListNew[i].don_gia_ban * $scope.Detail.ListNew[i].so_luong;
            $scope.Detail.ListNew[i].thanh_tien_net = $scope.Detail.ListNew[i].so_luong * $scope.Detail.ListNew[i].gia_bao_di_net;
        };

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            tong_gia_tri_thuc_te_new = parseFloat($scope.Detail.ListNew[i].thanh_tien_net + tong_gia_tri_thuc_te_new);
            tong_gia_tri_theo_hop_dong_new = parseFloat($scope.Detail.ListNew[i].thanh_tien + tong_gia_tri_theo_hop_dong_new);
        }

        $scope.tong_gia_tri_thuc_te_new = tong_gia_tri_thuc_te_new;
        $scope.tong_gia_tri_theo_hop_dong_new = tong_gia_tri_theo_hop_dong_new;


        chenhlech = parseFloat( parseInt(tien_khach_nhan) - $scope.tong_gia_tri_theo_hop_dong_new);
        khachnhan = parseFloat(chenhlech * 80) / 100;
        newcm = parseFloat((khachnhan * 100) / $scope.tong_gia_tri_thuc_te_new);

        tong_gia_tri_thuc_te_new = 0;
        tong_gia_tri_theo_hop_dong_new = 0;
        tong_chi_phi_hoa_don_new = 0;
        tong_khach_nhan_new = 0;

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            $scope.Detail.ListNew[i].hoa_hong = newcm;

            $scope.Detail.ListNew[i].khach_nhan = parseFloat($scope.Detail.ListNew[i].gia_bao_di_net * ($scope.Detail.ListNew[i].hoa_hong / 100)) * $scope.Detail.ListNew[i].so_luong;

            $scope.Detail.ListNew[i].bien_trung_gian = parseFloat(($scope.Detail.ListNew[i].khach_nhan * 100) / 80);
            $scope.Detail.ListNew[i].tien_thue_tndn = parseFloat($scope.Detail.ListNew[i].bien_trung_gian * ($scope.Detail.ListNew[i].thue_tndn / 100));

            $scope.Detail.ListNew[i].don_gia_ban = parseFloat($scope.Detail.ListNew[i].gia_bao_di_net + $scope.Detail.ListNew[i].khach_nhan + $scope.Detail.ListNew[i].tien_thue_tndn);

            $scope.Detail.ListNew[i].thanh_tien = $scope.Detail.ListNew[i].don_gia_ban * $scope.Detail.ListNew[i].so_luong;
            $scope.Detail.ListNew[i].thanh_tien_net = $scope.Detail.ListNew[i].so_luong * $scope.Detail.ListNew[i].gia_bao_di_net;
        }

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            tong_gia_tri_thuc_te_new = parseFloat($scope.Detail.ListNew[i].thanh_tien_net + tong_gia_tri_thuc_te_new);
            tong_gia_tri_theo_hop_dong_new = parseFloat($scope.Detail.ListNew[i].thanh_tien + tong_gia_tri_theo_hop_dong_new);
            tong_chi_phi_hoa_don_new = parseFloat($scope.Detail.ListNew[i].tien_thue_tndn + tong_chi_phi_hoa_don_new);
            tong_khach_nhan_new = parseFloat($scope.Detail.ListNew[i].khach_nhan + tong_khach_nhan_new);
        }
        $scope.tong_gia_tri_thuc_te_new = tong_gia_tri_thuc_te_new;
        $scope.tong_gia_tri_theo_hop_dong_new = tong_gia_tri_theo_hop_dong_new;
        $scope.tong_chi_phi_hoa_don_new = tong_chi_phi_hoa_don_new;
        $scope.tong_khach_nhan_new = tong_khach_nhan_new;

        $scope.gia_tri_chenh_lech_new = parseFloat($scope.tong_gia_tri_theo_hop_dong_new - $scope.tong_gia_tri_thuc_te_new);

        $scope.thue_vat_new = parseFloat($scope.tong_gia_tri_theo_hop_dong_new * ($scope.thue_suat_gtgt / 100));


        $scope.tong_gia_tri_thu_cua_khach_new = parseFloat($scope.tong_gia_tri_thuc_te_new + $scope.tong_chi_phi_hoa_don_new + $scope.thue_vat_new + $scope.tong_khach_nhan_new);
    };

    $scope.tinh_cm_khach_edit = function (tien_khach_nhan_edit) {

        var chenhlech = 0;
        var khachnhan = 0;
        var newcm = 0;
        var thue_suat_gtgt = $('#thue_suat_gtgt').val() || 0;

        var phi_van_chuyen = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-phivanchuyen').text()) || 0;;
        var chiphixuly = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-chiphixuly').text()) || 0;;
        var thuesuatgtgt = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-thuesuatgtgt').text()) || 0;;
        var tong_gia_tri_thuc_te_edit = 0;
        var tong_gia_tri_theo_hop_dong_edit = 0;
        var tong_chi_phi_hoa_don_edit = 0;
        var tong_khach_nhan_edit = 0;

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            $scope.Detail.ListAdd[i].DON_GIA_MOI = $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET;

            $scope.Detail.ListAdd[i].THANH_TIEN = $scope.Detail.ListAdd[i].DON_GIA_MOI * $scope.Detail.ListAdd[i].SO_LUONG;
            $scope.Detail.ListAdd[i].THANH_TIEN_NET = $scope.Detail.ListAdd[i].SO_LUONG * $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET;
        };

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            tong_gia_tri_thuc_te_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
            tong_gia_tri_theo_hop_dong_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
        }

        $scope.tong_gia_tri_thuc_te_edit = tong_gia_tri_thuc_te_edit;
        $scope.tong_gia_tri_theo_hop_dong_edit = tong_gia_tri_theo_hop_dong_edit;


        chenhlech = parseFloat(tien_khach_nhan_edit - $scope.tong_gia_tri_theo_hop_dong_edit);
        khachnhan = parseFloat(chenhlech * 80) / 100;
        newcm = parseFloat((khachnhan * 100) / $scope.tong_gia_tri_thuc_te_edit);

        tong_gia_tri_thuc_te_edit = 0;
        tong_gia_tri_theo_hop_dong_edit = 0;
        tong_chi_phi_hoa_don_edit = 0;
        tong_khach_nhan_edit = 0;

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            $scope.Detail.ListAdd[i].CM = newcm;
        
            $scope.Detail.ListAdd[i].KHACH_NHAN_DUOC = parseFloat($scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET * ($scope.Detail.ListAdd[i].CM / 100)) * $scope.Detail.ListAdd[i].SO_LUONG;

            $scope.Detail.ListAdd[i].BIEN_TRUNG_GIAN = parseFloat(($scope.Detail.ListAdd[i].KHACH_NHAN_DUOC * 100) / 80);
            $scope.Detail.ListAdd[i].TIEN_THUE_TNDN = parseFloat($scope.Detail.ListAdd[i].BIEN_TRUNG_GIAN * ($scope.Detail.ListAdd[i].THUE_TNDN / 100));

            $scope.Detail.ListAdd[i].DON_GIA_MOI = parseFloat($scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET + $scope.Detail.ListAdd[i].KHACH_NHAN_DUOC + $scope.Detail.ListAdd[i].TIEN_THUE_TNDN);

            $scope.Detail.ListAdd[i].THANH_TIEN = $scope.Detail.ListAdd[i].DON_GIA_MOI * $scope.Detail.ListAdd[i].SO_LUONG;
            $scope.Detail.ListAdd[i].THANH_TIEN_NET = $scope.Detail.ListAdd[i].SO_LUONG * $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET;
        }

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            tong_gia_tri_thuc_te_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
            tong_gia_tri_theo_hop_dong_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
            tong_chi_phi_hoa_don_edit = parseFloat($scope.Detail.ListAdd[i].TIEN_THUE_TNDN + tong_chi_phi_hoa_don_edit);
            tong_khach_nhan_edit = parseFloat($scope.Detail.ListAdd[i].KHACH_NHAN_DUOC + tong_khach_nhan_edit);
        }
        $scope.tong_gia_tri_thuc_te_edit = tong_gia_tri_thuc_te_edit;
        $scope.tong_gia_tri_theo_hop_dong_edit = tong_gia_tri_theo_hop_dong_edit;
        $scope.tong_chi_phi_hoa_don_edit = tong_chi_phi_hoa_don_edit;
        $scope.tong_khach_nhan_edit = tong_khach_nhan_edit;

        $scope.gia_tri_chenh_lech_edit = parseFloat($scope.tong_gia_tri_theo_hop_dong_edit - $scope.tong_gia_tri_thuc_te_edit);

        $scope.thue_vat_edit = parseFloat($scope.tong_gia_tri_theo_hop_dong_edit * (thue_suat_gtgt / 100));



        $scope.tong_gia_tri_thu_cua_khach_edit = parseFloat($scope.tong_gia_tri_thuc_te_edit + $scope.tong_chi_phi_hoa_don_edit + $scope.thue_vat_edit + $scope.tong_khach_nhan_edit);
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
        ListNew: [],
        ListTach: [],
        ListXoa : [],
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
        THANH_TIEN_NET: 0,
        TINH_TRANG_HANG: '',
        THOI_GIAN_GIAO_HANG: '',
        NGAY_GIAO_HANG: '',
        DIA_DIEM_GIAO_HANG: '',
        GHI_CHU: '',
        BIEN_TRUNG_GIAN: 0,
        SO_LUONG_TRONG_KHO : 0,
    }];
    $scope.Detail.ListNew = [{
        ma_hang: '',
        ten_hang: '',
        so_luong: 0,
        ma_dieu_chinh: '',
        dvt: '',
        hang: '',
        gia_list: 0,
        gia_nhap: 0,
        don_gia: 0,
        he_so_loi_nhuan: 0,
        chiet_khau: 0,
        gia_bao_di_net: 0,
        thanh_tien: 0,
        thanh_tien_net: 0,
        thoi_gian_giao_hang: '',
        ghi_chu: '',
        hoa_hong: 0,
        bien_trung_gian: 0,
        so_luong_trong_kho: 0,
    }];





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
                ErrorSystem('Thiếu thông tin Mã hàng - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].SO_LUONG) {
                ErrorSystem('Thiếu thông tin số lượng giữ - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].DON_GIA_MOI) {
                ErrorSystem('Thiếu thông tin đơn giá - tại dòng ' + (i + 1));
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
            TONG_TIEN: $scope.tong_gia_tri_theo_hop_dong_edit,
            DA_DUYET: $scope.BangBaoGia[0].DA_DUYET,
            DA_TRUNG: $scope.BangBaoGia[0].DA_TRUNG,
            DA_HUY: $scope.BangBaoGia[0].DA_HUY,
            TRUC_THUOC: 'HOPLONG',
            THUE_SUAT_GTGT: $scope.BangBaoGia[0].THUE_SUAT_GTGT,
            TIEN_THUE_GTGT: $scope.thue_vat_edit,
            TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_edit,
            GIA_TRI_THUC_THU_TU_KHACH: $scope.tong_gia_tri_thu_cua_khach_edit,
            TONG_GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_edit,
            TONG_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_edit,
            THUC_NHAN_CUA_KHACH: $scope.tong_khach_nhan_edit,
            DANG_CHO_PHAN_HOI: true,
        };

    $scope.arrayChiTietBaoGia = [];

    for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
           

        var ChiTietBaoGia = {
            ID: $scope.Detail.ListAdd[i].ID,
            TEN_HANG: $scope.Detail.ListAdd[i].TEN_HANG,
            MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
            MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
            HANG_SP: $scope.Detail.ListAdd[i].HANG_SP,
            DVT: $scope.Detail.ListAdd[i].DVT,
            SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
            DON_GIA: $scope.Detail.ListAdd[i].DON_GIA_MOI,
            CHIET_KHAU: $scope.Detail.ListAdd[i].CHIET_KHAU,
            GIA_LIST: parseFloat($scope.Detail.ListAdd[i].GIA_LIST),
            DON_GIA_NHAP: parseFloat($scope.Detail.ListAdd[i].DON_GIA_NHAP),
            HE_SO_LOI_NHUAN: $scope.Detail.ListAdd[i].HE_SO_LOI_NHUAN,
            DON_GIA_BAO_DI_NET: $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET,
            CM: $scope.Detail.ListAdd[i].CM,
            DON_GIA_MOI: $scope.Detail.ListAdd[i].DON_GIA_MOI,
            THUE_TNDN: $scope.Detail.ListAdd[i].THUE_TNDN,
            TIEN_THUE_TNDN: $scope.Detail.ListAdd[i].TIEN_THUE_TNDN,
            KHACH_NHAN_DUOC: $scope.Detail.ListAdd[i].KHACH_NHAN_DUOC,
            THANH_TIEN: $scope.Detail.ListAdd[i].THANH_TIEN,
            THANH_TIEN_NET: $scope.Detail.ListAdd[i].THANH_TIEN_NET,
            THOI_GIAN_GIAO_HANG: $scope.Detail.ListAdd[i].THOI_GIAN_GIAO_HANG,
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
                SuccessSystem("Hoàn Thành Lưu");
            }, function errorCallback(response) {
                ErrorSystem('Không lưu được chi tiết giữ kho');
            });
            return;
        }
        
    }, function errorCallback(response) {
        console.log(response);
        ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
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
            TONG_TIEN: $scope.tong_gia_tri_theo_hop_dong_new,
            TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_new,
            GIA_TRI_THUC_THU_TU_KHACH: $scope.tong_gia_tri_thu_cua_khach_new,
            TONG_GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_new,
            TONG_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_new,
            THUC_NHAN_CUA_KHACH: $scope.tong_khach_nhan_new,
            DA_DUYET: false,
            DA_TRUNG: false,
            DA_HUY: false,
            TRUC_THUOC: 'HOPLONG',
            DANG_CHO_PHAN_HOI: true,
            THUE_SUAT_GTGT: $scope.thue_suat_gtgt,
            TIEN_THUE_GTGT: $scope.thue_vat_new,
        };

        $scope.arrayBaoGiaChiTiet = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {


            var BaoGiaChiTiet = {
                MA_HANG: $scope.Detail.ListNew[i].ma_hang,
                MA_DIEU_CHINH: $scope.Detail.ListNew[i].ma_dieu_chinh,
                TEN_HANG: $scope.Detail.ListNew[i].ten_hang,
                HANG_SP: $scope.Detail.ListNew[i].hang,
                SO_LUONG: $scope.Detail.ListNew[i].so_luong,
                DVT: $scope.Detail.ListNew[i].dvt,
                DON_GIA:  $scope.Detail.ListNew[i].don_gia_ban,
                THANH_TIEN: $scope.Detail.ListNew[i].thanh_tien,
                THANH_TIEN_NET: $scope.Detail.ListNew[i].thanh_tien_net,
                THOI_GIAN_GIAO_HANG: $scope.Detail.ListNew[i].thoi_gian_giao_hang,
                GIA_LIST: parseFloat($scope.Detail.ListNew[i].gia_list),
                CHIET_KHAU: $scope.Detail.ListNew[i].chiet_khau,
                DON_GIA_NHAP: parseFloat($scope.Detail.ListNew[i].gia_nhap),
                HE_SO_LOI_NHUAN: $scope.Detail.ListNew[i].he_so_loi_nhuan,
                DON_GIA_BAO_DI_NET: $scope.Detail.ListNew[i].gia_bao_di_net,
                GHI_CHU: $scope.Detail.ListNew[i].ghi_chu,
                CM: $scope.Detail.ListNew[i].hoa_hong,
                DON_GIA_MOI: $scope.Detail.ListNew[i].don_gia_ban,
                THUE_TNDN: $scope.Detail.ListNew[i].thue_tndn,
                TIEN_THUE_TNDN: $scope.Detail.ListNew[i].tien_thue_tndn,
                KHACH_NHAN_DUOC: $scope.Detail.ListNew[i].khach_nhan,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayBaoGiaChiTiet.push(BaoGiaChiTiet);
        }

        //Lưu vào CSDL
        $http.post("/api/Api_BaoGia/PostBH_BAO_GIA", $scope.BANGBAOGIA)
            .then(function successCallback(response) {
            $scope.BANGBAOGIA = response.data;
            if (!$scope.BANGBAOGIA) {
                ErrorSystem("Không lưu được thông tin chung của báo giá");
                return;
            }
            $scope.BANGBAOGIA.SO_BAO_GIA;

            for (var i = 0; i < $scope.arrayBaoGiaChiTiet.length; i++) {
                $scope.arrayBaoGiaChiTiet[i].SO_BAO_GIA = $scope.BANGBAOGIA.SO_BAO_GIA;
            }


            if ($scope.arrayBaoGiaChiTiet.length > 0) {
                $http.post("/api/ApiChiTietBaoGia/PostKH_LIEN_HE", $scope.arrayBaoGiaChiTiet)
                    .then(function successCallback(response) {
                    SuccessSystem("Lưu thành công!");
                    location.reload();
                }, function errorCallback(response) {
                    ErrorSystem("Không lưu được chi tiết của báo giá");
                });
                return;
            }

        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem("Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục");
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


    $scope.Split = function () {



        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.Detail.ListTach.length; i++) {


            var ChiTietBaoGia = {
                ID: $scope.Detail.ListAdd[i].ID,
                TEN_HANG: $scope.Detail.ListAdd[i].TEN_HANG,
                MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
                HANG_SP: $scope.Detail.ListAdd[i].HANG_SP,
                DVT: $scope.Detail.ListAdd[i].DVT,
                SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                CHIET_KHAU: $scope.Detail.ListAdd[i].CHIET_KHAU,
                GIA_LIST: parseFloat($scope.Detail.ListAdd[i].GIA_LIST),
                DON_GIA_NHAP: parseFloat($scope.Detail.ListAdd[i].DON_GIA_NHAP),
                HE_SO_LOI_NHUAN: $scope.Detail.ListAdd[i].HE_SO_LOI_NHUAN,
                DON_GIA_BAO_DI_NET: $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET,
                CM: $scope.Detail.ListAdd[i].CM,
                DON_GIA_MOI: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                THUE_TNDN: $scope.Detail.ListAdd[i].THUE_TNDN,
                TIEN_THUE_TNDN: $scope.Detail.ListAdd[i].TIEN_THUE_TNDN,
                KHACH_NHAN_DUOC: $scope.Detail.ListAdd[i].KHACH_NHAN_DUOC,
                THANH_TIEN: $scope.Detail.ListAdd[i].THANH_TIEN,
                THANH_TIEN_NET: $scope.Detail.ListAdd[i].THANH_TIEN_NET,
                THOI_GIAN_GIAO_HANG: $scope.Detail.ListAdd[i].THOI_GIAN_GIAO_HANG,
                GHI_CHU: $scope.Detail.ListAdd[i].GHI_CHU,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }

        //Lưu vào CSDL

        $http({
            method: 'POST',
            data: $scope.arrayChiTietBaoGia,
            url: window.location.origin + '/api/Api_ChiTietBaoGia/TachBaoGia/' + $scope.BangBaoGia[0].SO_BAO_GIA,
        }).then(function successCallback(response) {
            SuccessSystem('Tách thành công báo giá mới' + response.data);
           
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
    };

    $scope.Copy = function () {
        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            if (!$scope.Detail.ListAdd[i].MA_HANG) {
                ErrorSystem('Thiếu thông tin Mã hàng - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].SO_LUONG) {
                ErrorSystem('Thiếu thông tin số lượng giữ - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].DON_GIA_MOI) {
                ErrorSystem('Thiếu thông tin đơn giá - tại dòng ' + (i + 1));
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
            TONG_TIEN: $scope.tong_gia_tri_theo_hop_dong_edit,
            DA_DUYET: $scope.BangBaoGia[0].DA_DUYET,
            DA_TRUNG: $scope.BangBaoGia[0].DA_TRUNG,
            DA_HUY: $scope.BangBaoGia[0].DA_HUY,
            TRUC_THUOC: 'HOPLONG',
            THUE_SUAT_GTGT: $scope.BangBaoGia[0].THUE_SUAT_GTGT,
            TIEN_THUE_GTGT: $scope.thue_vat_edit,
            TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_edit,
            GIA_TRI_THUC_THU_TU_KHACH: $scope.tong_gia_tri_thu_cua_khach_edit,
            TONG_GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_edit,
            TONG_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_edit,
            THUC_NHAN_CUA_KHACH: $scope.tong_khach_nhan_edit,
            DANG_CHO_PHAN_HOI: true,
        };

        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {

            var ChiTietBaoGia = {
                TEN_HANG: $scope.Detail.ListAdd[i].TEN_HANG,
                MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
                HANG_SP: $scope.Detail.ListAdd[i].HANG_SP,
                DVT: $scope.Detail.ListAdd[i].DVT,
                SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                CHIET_KHAU: $scope.Detail.ListAdd[i].CHIET_KHAU,
                GIA_LIST: parseFloat($scope.Detail.ListAdd[i].GIA_LIST),
                DON_GIA_NHAP: parseFloat($scope.Detail.ListAdd[i].DON_GIA_NHAP),
                HE_SO_LOI_NHUAN: $scope.Detail.ListAdd[i].HE_SO_LOI_NHUAN,
                DON_GIA_BAO_DI_NET: $scope.Detail.ListAdd[i].DON_GIA_BAO_DI_NET,
                CM: $scope.Detail.ListAdd[i].CM,
                DON_GIA_MOI: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                THUE_TNDN: $scope.Detail.ListAdd[i].THUE_TNDN,
                TIEN_THUE_TNDN: $scope.Detail.ListAdd[i].TIEN_THUE_TNDN,
                KHACH_NHAN_DUOC: $scope.Detail.ListAdd[i].KHACH_NHAN_DUOC,
                THANH_TIEN: $scope.Detail.ListAdd[i].THANH_TIEN,
                THANH_TIEN_NET: $scope.Detail.ListAdd[i].THANH_TIEN_NET,
                THOI_GIAN_GIAO_HANG: $scope.Detail.ListAdd[i].THOI_GIAN_GIAO_HANG,
                GHI_CHU: $scope.Detail.ListAdd[i].GHI_CHU,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }

        $scope.TongHop = {
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
            TONG_TIEN: $scope.tong_gia_tri_theo_hop_dong_edit,
            DA_DUYET: $scope.BangBaoGia[0].DA_DUYET,
            DA_TRUNG: $scope.BangBaoGia[0].DA_TRUNG,
            DA_HUY: $scope.BangBaoGia[0].DA_HUY,
            TRUC_THUOC: 'HOPLONG',
            THUE_SUAT_GTGT: $scope.BangBaoGia[0].THUE_SUAT_GTGT,
            TIEN_THUE_GTGT: $scope.thue_vat_edit,
            TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_edit,
            GIA_TRI_THUC_THU_TU_KHACH: $scope.tong_gia_tri_thu_cua_khach_edit,
            TONG_GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_edit,
            TONG_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_edit,
            THUC_NHAN_CUA_KHACH: $scope.tong_khach_nhan_edit,
            DANG_CHO_PHAN_HOI: true,
            Chitiet : $scope.arrayChiTietBaoGia
        }
           
        

        //Lưu vào CSDL
        baogiaService.copynewbg($scope.TongHop).then(function successCallback(response) {
            SuccessSystem('Bạn đã sao chép thành công một báo giá mới là ' + response.data);
            reload();
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
        
    };

    $scope.GopBaoGia = function () {
        $http.post('/api/Api_BaoGia/GopBaoGia/' + $scope.baogia1 + '/' + $scope.baogia2).then(function (response) {
            SuccessSystem('Gộp 2 báo giá thành báo giá ' + response.data + 'thành công');
        }, function errorCallback(response) {
            ErrorSystem('Gộp báo giá không thành công');
        });
    };

    $scope.CreatePO = function () {

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            if (!$scope.Detail.ListAdd[i].MA_HANG) {
                ErrorSystem('Thiếu thông tin Mã hàng - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].SO_LUONG) {
                ErrorSystem('Thiếu thông tin số lượng giữ - tại dòng ' + (i + 1));
                return;
            }

            if (!$scope.Detail.ListAdd[i].DON_GIA_MOI) {
                ErrorSystem('Thiếu thông tin đơn giá - tại dòng ' + (i + 1));
                return;
            }

        }

        var so_tien_viet_bang_chu = docso($scope.tong_gia_tri_theo_hop_dong_edit);

        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {


            var ChiTietBaoGia = {
                MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
                DVT: $scope.Detail.ListAdd[i].DVT,
                SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListAdd[i].DON_GIA_MOI,
                THANH_TIEN_HANG: $scope.Detail.ListAdd[i].THANH_TIEN,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }
        $scope.Bao_Gia = {
            MA_KHACH_HANG: $scope.BangBaoGia[0].MA_KHACH_HANG,
            TEN_LIEN_HE: $scope.BangBaoGia[0].NGUOI_LIEN_HE,
            HINH_THUC_THANH_TOAN: $scope.BangBaoGia[0].PHUONG_THUC_THANH_TOAN,
            TONG_TIEN_THANH_TOAN: $scope.tong_gia_tri_thu_cua_khach_edit,
            TONG_TIEN_HANG: $scope.tong_gia_tri_thuc_te_edit,
            TONG_TIEN_THUE_GTGT: $scope.thue_vat_edit,
            SO_TIEN_VIET_BANG_CHU: docso($scope.tong_gia_tri_thu_cua_khach_edit),
            THUE_SUAT_GTGT: $scope.BangBaoGia[0].THUE_SUAT_GTGT,
            TRUC_THUOC: 'HOPLONG',
            DA_BAN_HANG: false,
            NHAN_VIEN_QUAN_LY: salehienthoi,
            SO_BAO_GIA: $scope.baogia.SO_BAO_GIA,
            NGAY_GIAO_HANG: $scope.ngay_giao_hang,
            DIA_DIEM_GIAO_HANG: $scope.dia_diem_giao_hang,
            CAN_XUAT_NGAY: $scope.can_xuat_ngay,
            CAN_LAY_HOA_DON : $scope.can_lay_hoa_don,
            ChiTietPO: $scope.arrayChiTietBaoGia,
        };
        //Lưu vào CSDL

        $http({
            method: 'POST',
            data: $scope.Bao_Gia,
            url: window.location.origin + '/api/Api_DonHangPO/PostDon_Hang_PO'
        }).then(function successCallback(response) {
            SuccessSystem('Bạn đã tạo thành công 1 đơn PO có mã là ' + response.data)
            $scope.PhuongAnKD = {
                MA_SO_PO: response.data,
                PHIEU_BAO_GIA:  $scope.BangBaoGia[0].SO_BAO_GIA,
                MA_KHACH_HANG: $scope.BangBaoGia[0].MA_KHACH_HANG,
                NOI_DUNG_PAKD: $scope.noi_dung_phuong_an_kinh_doanh,
                TONG_GIA_TRI_VTHH_DAU_VAO: $scope.tong_gia_tri_vthh_dau_vao,
                CHI_PHI_KHAC: $scope.BangBaoGia[0].PHI_VAN_CHUYEN,
                TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_edit,
                TONG_GIA_TRI_DON_HANG_THEO_PHIEU_XUAT_HOP_DONG: $scope.tong_gia_tri_theo_hop_dong_edit,
                GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_edit,
                CHI_PHI_HOA_DON: 20,
                TIEN_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_edit,
                THUE_VAT: $scope.BangBaoGia[0].THUE_SUAT_GTGT,
                TIEN_THUE_VAT: $scope.thue_vat_edit,
                TONG_GIA_TRI_THU_CUA_KHACH: $scope.tong_gia_tri_thu_cua_khach_edit,
                LOI_NHUAN_THUAN: $scope.loi_nhuan_thuan,
                CHIET_KHAU_CHO_KHACH: $scope.tong_khach_nhan_edit,
                THANH_TOAN_KHI_DAT_HANG: $scope.thanh_toan_khi_dat_hang,
                THANH_TOAN_SAU_GIAO_HANG: $scope.thanh_toan_sau_giao_hang,
                HINH_THUC_THANH_TOAN: $scope.BangBaoGia[0].PHUONG_THUC_THANH_TOAN,
                HOA_DON_CHUNG_TU: $scope.hoa_don_chung_tu,
                CONG_NO:  $scope.BangBaoGia[0].DIEU_KHOAN_THANH_TOAN,
                TRUC_THUOC: 'HOPLONG',
                NHAN_VIEN_QUAN_LY: username,
            }

            $http({
                method: 'POST',
                data: $scope.PhuongAnKD,
                url: window.location.origin + '/api/Api_PhuongAnKinhDoanh/PostBH_PHUONG_AN_KINH_DOANH'
            }).then(function successCallback(response) {
                SuccessSystem('Bạn đã tạo thành công 1 PAKD có mã là ' + response.data.MA_SO_PAKD);

            }, function errorCallback(response) {
                console.log(response);
                ErrorSystem('Sự cố hệ thống, Không lưu được PAKD, Bạn vui lòng liên hệ với admin để khắc phục ');
            });
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được đơn PO, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
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

    $http.get(window.location.origin + '/api/Api_KH/GET_KHACH_CUA_SALE/' + salehienthoi + '/' + isadmin)

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

    ////Show thông tin don hang du kien---------------------------------------------------------------------------------------------------------------
    //$scope.arrayIDDuKien = {
    //    ma_du_kien: '',
    //};

    ////mảng don hang du kien
    //$scope.arrayDuKienFinded = [];
    //$scope.arrayDuKien = [];
    //$scope.showtable_DuKien = false;

    ////get data don hang du kien
    //$http.post(window.location.origin + '/api/Api_BaoGia_DonHangDuKien')
    //     .then(function (response) {
    //         if (response.data) {
    //             $scope.arrayDuKien = response.data;
    //             $scope.arrayDuKienFinded = $scope.arrayDuKien.map(function (item) {
    //                 return item;
    //             });
    //         }

    //     }, function (error) {
    //         console.log(error);
    //     });

    ////hàm tìm kiếm
    //$scope.onDuKienFind = function () {
    //    if (!$scope.MA_DU_KIEN) {
    //        $scope.arrayDuKienFinded = $scope.arrayDuKien.map(function (item) {
    //            return item;
    //        });
    //    }
    //    $scope.arrayDuKienFinded = $scope.arrayDuKien.filter(function (item) {
    //        if (item.MA_DU_KIEN.toLowerCase().indexOf($scope.arrayIDDuKien.ma_du_kien.toLowerCase()) >= 0) {
    //            return true;
    //        } else {
    //            return false;
    //        }
    //    });
    //}

    //// hiển thị danh sách ma du kien(LẤY THEO MÃ)
    //$scope.showInfoDuKien = function (p_dt) {
    //    $scope.arrayIDDuKien.ma_du_kien = p_dt.MA_DU_KIEN;
    //    $scope.arrayIDDuKien.ngay_tao = p_dt.NGAY_TAO;
    //    $scope.showtable_DuKien = false;
    //}
    ////End Show thông tin don hang du kien--------------------------------------------------------------------------------------------




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
    $scope.check = function (mahang, tenhang, dvt, xuatxu, hang, dongia, ton_hl) {
        if (ton_hl != 0) {
            $scope.Detail.ListNew.push({
                ma_hang: mahang,
                ten_hang: tenhang,
                so_luong: 0,
                ma_dieu_chinh: '',
                dvt: dvt,
                hang: hang,
                gia_list: dongia,
                gia_nhap: 0,
                don_gia: 0,
                gia_bao_di_net: dongia,
                he_so_loi_nhuan: 0,
                chiet_khau: 0,
                thanh_tien: 0,
                thanh_tien_net: 0,
                thoi_gian_giao_hang: 'Có sẵn',
                ghi_chu: '',
                hoa_hong: 0,
            });
        } else {
            $scope.Detail.ListNew.push({
                ma_hang: mahang,
                ten_hang: tenhang,
                so_luong: 0,
                ma_dieu_chinh: '',
                dvt: dvt,
                hang: hang,
                gia_list: dongia,
                gia_nhap: 0,
                don_gia: 0,
                he_so_loi_nhuan: 0,
                chiet_khau: 0,
                gia_bao_di_net: dongia,
                thanh_tien: 0,
                thanh_tien_net: 0,
                thoi_gian_giao_hang: '',
                ghi_chu: '',
                hoa_hong: 0,
            });
        }
       
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

            if ($scope.Detail.ListAdd[0].CM != 0) {
                $scope.editCM = true;
            } else {
                $scope.editCM = false;
            }

            var phi_van_chuyen = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-phivanchuyen').text()) || 0;;
            var chiphixuly = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-chiphixuly').text()) || 0;;
            var thuesuatgtgt = parseInt($('.' + $scope.baogia.SO_BAO_GIA + '-thuesuatgtgt').text()) || 0;;
            var tong_gia_tri_thuc_te_edit = 0;
            var tong_gia_tri_theo_hop_dong_edit = 0;
            var tong_chi_phi_hoa_don_edit = 0;
            var tong_khach_nhan_edit = 0;

            for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
                tong_gia_tri_thuc_te_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN_NET + tong_gia_tri_thuc_te_edit);
                tong_gia_tri_theo_hop_dong_edit = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN + tong_gia_tri_theo_hop_dong_edit);
                tong_chi_phi_hoa_don_edit = parseFloat($scope.Detail.ListAdd[i].TIEN_THUE_TNDN + tong_chi_phi_hoa_don_edit);
                tong_khach_nhan_edit = parseFloat($scope.Detail.ListAdd[i].KHACH_NHAN_DUOC + tong_khach_nhan_edit);
            }
            $scope.tong_gia_tri_thuc_te_edit = tong_gia_tri_thuc_te_edit;
            $scope.tong_gia_tri_theo_hop_dong_edit = tong_gia_tri_theo_hop_dong_edit;
            $scope.tong_chi_phi_hoa_don_edit = tong_chi_phi_hoa_don_edit;
            $scope.tong_khach_nhan_edit = tong_khach_nhan_edit;

            $scope.gia_tri_chenh_lech_edit = parseFloat($scope.tong_gia_tri_theo_hop_dong_edit - $scope.tong_gia_tri_thuc_te_edit);

            $scope.thue_vat_edit = parseFloat($scope.tong_gia_tri_theo_hop_dong_edit * (thuesuatgtgt / 100));


            $scope.tong_gia_tri_thu_cua_khach_edit = parseFloat($scope.tong_gia_tri_thuc_te_edit + $scope.tong_chi_phi_hoa_don_edit + $scope.thue_vat_edit + $scope.tong_khach_nhan_edit);          
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
    $scope.newsave = function (mahang, tenhang, dvt, xuatxu, hang, dongia, tonhl) {
        if (tonhl != 0) {
            $scope.Detail.ListAdd.push({
                MA_HANG: mahang,
                TEN_HANG: tenhang,
                HANG_SP: hang,
                MA_DIEU_CHINH: '',
                DVT: dvt,
                SO_LUONG: 0,
                GIA_LIST: dongia,
                DON_GIA_NHAP: 0,
                DON_GIA_BAO_DI_NET: dongia,
                DON_GIA: 0,
                HE_SO_LOI_NHUAN: 0,
                CHIET_KHAU: 0,
                THANH_TIEN: 0,
                THANH_TIEN_NET: 0,
                THOI_GIAN_GIAO_HANG: 'Có sẵn',
                GHI_CHU: '',
                CM : 0,
            });
        } else {
            $scope.Detail.ListAdd.push({
                MA_HANG: mahang,
                TEN_HANG: tenhang,
                HANG_SP: hang,
                MA_DIEU_CHINH: '',
                DVT: dvt,
                SO_LUONG: 0,
                GIA_LIST: dongia,
                DON_GIA_NHAP: 0,
                DON_GIA: 0,
                DON_GIA_BAO_DI_NET: dongia, 
                HE_SO_LOI_NHUAN: 0,
                CHIET_KHAU: 0,
                THANH_TIEN: 0,
                THANH_TIEN_NET: 0,
                THOI_GIAN_GIAO_HANG: '',
                GHI_CHU: '',
                CM : 0,
            });
        }

    }
    // End hang hoa luu

    //Click chọn hàng hóa để tách
    $scope.tachbaogia = function (item) {
        $scope.item = item;
        $scope.Detail.ListTach.push({
            ID: $scope.item.ID,
            TEN_HANG: $scope.item.TEN_HANG,
            MA_HANG: $scope.item.MA_HANG,
            MA_DIEU_CHINH: $scope.item.MA_DIEU_CHINH,
            HANG_SP: $scope.item.HANG_SP,
            DVT: $scope.item.DVT,
            SO_LUONG: $scope.item.SO_LUONG,
            DON_GIA: $scope.item.DON_GIA_MOI,
            CHIET_KHAU: $scope.item.CHIET_KHAU,
            GIA_LIST: parseFloat($scope.item.GIA_LIST),
            DON_GIA_NHAP: parseFloat($scope.item.DON_GIA_NHAP),
            HE_SO_LOI_NHUAN: $scope.item.HE_SO_LOI_NHUAN,
            DON_GIA_BAO_DI_NET: $scope.item.DON_GIA_BAO_DI_NET,
            CM: $scope.item.CM,
            DON_GIA_MOI: $scope.item.DON_GIA_MOI,
            THUE_TNDN: $scope.item.THUE_TNDN,
            TIEN_THUE_TNDN: $scope.item.TIEN_THUE_TNDN,
            KHACH_NHAN_DUOC: $scope.item.KHACH_NHAN_DUOC,
            THANH_TIEN: $scope.item.THANH_TIEN,
            THANH_TIEN_NET: $scope.item.THANH_TIEN_NET,
            THOI_GIAN_GIAO_HANG: $scope.item.THOI_GIAN_GIAO_HANG,
            GHI_CHU: $scope.item.GHI_CHU,
        });
    };
    //End chọn hàng hóa tách

    //Lọc hàng hóa----------------------------------------------------------------------------------------------------


    //mảng khách hàng
    $scope.arrayHHFinded = [];
    $scope.arrayHH = [];
    $scope.showtable_hanghoa = false;

    //get data khách hàng
    
    var inputChangedPromise;
    //hàm tìm kiếm
    $scope.onHHFind = function (mh) {
        $http.get(window.location.origin + '/api/Api_HanghoaHL/GetAllHHBaoGia/' + mh)
         .then(function (response) {
             if (response.data) {
                 $scope.arrayHH = response.data;
                 $scope.arrayHHFinded = $scope.arrayHH.map(function (item) {
                     return item;
                 });
             }
         }, function (error) {
             console.log(error);
         })
    }
    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.inputstaff = function (kh, index, detail) {
        $scope.showtable_hanghoa = true;
        if (kh.SO_LUONG > 0) {
            detail.ma_hang = kh.MA_HANG;
            detail.ma_chuan = kh.MA_CHUAN;
            detail.ten_hang = kh.TEN_HANG;
            detail.so_luong = 0;
            detail.ma_dieu_chinh = kh.MA_CHUAN;
            detail.dvt = kh.DVT;
            detail.hang = kh.MA_NHOM_HANG;
            detail.gia_list = kh.GIA_LIST;
            detail.gia_nhap = 0;
            detail.don_gia = 0;
            detail.he_so_loi_nhuan = 0;
            detail.chiet_khau = 0;
            detail.gia_bao_di_net = kh.GIA_LIST;
            detail.thanh_tien = 0;
            detail.thanh_tien_net = 0;
            detail.thoi_gian_giao_hang = 'Có sẵn';
            detail.ghi_chu = '';
            detail.hoa_hong = 0;
            so_luong_trong_kho = 0;
        } else {
            detail.ma_hang = kh.MA_HANG;
            detail.ma_chuan = kh.MA_CHUAN;
            detail.ten_hang = kh.TEN_HANG;
            detail.so_luong = 0;
            detail.ma_dieu_chinh = kh.MA_CHUAN;
            detail.dvt = kh.DVT;
            detail.hang = kh.MA_NHOM_HANG;
            detail.gia_list = kh.GIA_LIST;
            detail.gia_nhap = 0;
            detail.don_gia = 0;
            detail.he_so_loi_nhuan = 0;
            detail.chiet_khau = 0;
            detail.gia_bao_di_net = kh.GIA_LIST;
            detail.thanh_tien = 0;
            detail.thanh_tien_net = 0;
            detail.thoi_gian_giao_hang = '';
            detail.ghi_chu = '';
            detail.hoa_hong = 0;
            so_luong_trong_kho = 0;
        }
        detail.showtable_hanghoa = false;
    }
    //End lọc hàng hóa----------------------------------------------------------------------------------------------------------------------


    //Lọc hàng hóa----------------------------------------------------------------------------------------------------


    //mảng khách hàng
    $scope.arrayHHEditFinded = [];
    $scope.arrayHHEdit = [];
    $scope.showtable_hanghoa_edit = false;

    //get data khách hàng

    var inputChangedPromise;


    
    //hàm tìm kiếm
    $scope.onHHEditFind = function (mh) {
        $http.get(window.location.origin + '/api/Api_HanghoaHL/GetAllHHBaoGia/' + mh)
         .then(function (response) {
             if (response.data) {
                 $scope.arrayHHEdit = response.data;
                 $scope.arrayHHEditFinded = $scope.arrayHHEdit.map(function (item) {
                     return item;
                 });
             }
         }, function (error) {
             console.log(error);
         })
    }


    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.inputstaff_edit = function (kh, index, item) {
        
        if (kh.SO_LUONG > 0) {
            item.MA_HANG = kh.MA_HANG;
            item.MA_CHUAN = kh.MA_CHUAN;
            item.TEN_HANG = kh.TEN_HANG;
            item.SO_LUONG = 0;
            item.MA_DIEU_CHINH = kh.MA_CHUAN;
            item.DVT = kh.DVT;
            item.HANG_SP = kh.MA_NHOM_HANG;
            item.GIA_LIST = kh.GIA_LIST;
            item.DON_GIA_NHAP = 0;
            item.DON_GIA = 0;
            item.HE_SO_LOI_NHUAN = 0;
            item.CHIET_KHAU = 0;
            item.DON_GIA_BAO_DI_NET = kh.GIA_LIST;
            item.THANH_TIEN = 0;
            item.THANH_TIEN_NET = 0;
            item.THOI_GIAN_GIAO_HANG = 'Có sẵn';
            item.GHI_CHU = '';
            item.CM = 0;
            item.SO_LUONG_TRONG_KHO = kh.SO_LUONG;
        } else {
            item.MA_HANG = kh.MA_HANG;
            item.MA_CHUAN = kh.MA_CHUAN;
            item.TEN_HANG = kh.TEN_HANG;
            item.SO_LUONG = 0;
            item.MA_DIEU_CHINH = kh.MA_CHUAN;
            item.DVT = kh.DVT;
            item.HANG_SP = kh.MA_NHOM_HANG;
            item.GIA_LIST = kh.GIA_LIST;
            item.DON_GIA_NHAP = 0;
            item.DON_GIA = 0;
            item.HE_SO_LOI_NHUAN = 0;
            item.CHIET_KHAU = 0;
            item.DON_GIA_BAO_DI_NET = kh.GIA_LIST;
            item.THANH_TIEN = 0;
            item.THANH_TIEN_NET = 0;
            item.THOI_GIAN_GIAO_HANG = '';
            item.GHI_CHU = '';
            item.CM = 0;
            item.SO_LUONG_TRONG_KHO = kh.SO_LUONG;
        }
        item.showtable_hanghoa_edit = false;

        //$(".tableselect").css({ "display": "none" });
    };
    
    //End lọc hàng hóa----------------------------------------------------------------------------------------------------------------------


    $scope.addnewproduct = function () {
        $scope.Detail.ListNew.push({
            ma_hang: '',
            ten_hang: '',
            so_luong: 0,
            ma_dieu_chinh: '',
            dvt: '',
            hang: '',
            gia_list: 0,
            gia_nhap: 0,
            don_gia: 0,
            he_so_loi_nhuan: 0,
            chiet_khau: 0,
            gia_bao_di_net: 0,
            thanh_tien: 0,
            thanh_tien_net: 0,
            thoi_gian_giao_hang: '',
            ghi_chu: '',
            hoa_hong: 0,
        });
    };

    $scope.NewEditProduct = function () {
        $scope.Detail.ListAdd.push({
            MA_HANG: '',
            TEN_HANG: '',
            HANG_SP: '',
            MA_DIEU_CHINH: '',
            DVT: '',
            SO_LUONG: 0,
            GIA_LIST: 0,
            DON_GIA_NHAP: 0,
            DON_GIA: 0,
            DON_GIA_BAO_DI_NET: 0,
            HE_SO_LOI_NHUAN: 0,
            CHIET_KHAU: 0,
            THANH_TIEN: 0,
            THANH_TIEN_NET: 0,
            THOI_GIAN_GIAO_HANG: '',
            GHI_CHU: '',
            CM: 0,
        });
    };

    $scope.phuongthuctt = ["Chuyển khoản", "Tiền mặt","Trả tiền sau khi nhận hàng"];
    $scope.cachtinhthanhtien = ['Giá nhập','Giá list'];
    $scope.dieukhoantt = ['5 ngày', '7 ngày', '30 ngày', 'Ngày 5 hàng tháng', 'Ngày 15 hàng tháng', 'Ngày 30 hàng tháng'];
    $scope.ck_vat = [0,5,10];

    $scope.phuongthucttnew = ["Chuyển khoản", "Tiền mặt", "Trả tiền sau khi nhận hàng"];
    $scope.cachtinhthanhtiennew = ['Giá nhập', 'Giá list'];
    $scope.dieukhoanttnew = ['5 ngày', '7 ngày', '30 ngày', 'Ngày 5 hàng tháng', 'Ngày 15 hàng tháng', 'Ngày 30 hàng tháng'];
    $scope.ck_vat_new = [0, 5, 10];
    $scope.hoadonchungtu = ['Hóa đơn đỏ(VAT)','Hóa đơn thường','Không hóa đơn']

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

    var url = document.location.href;
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);

    $scope.arrayLHFinded = [];
    $scope.arrayLH = [];
    $scope.showtable_id_lien_he = false;

    $scope.lienhekh = function (url) {
        //get data liên hệ
        $http.post(window.location.origin + '/api/Api_LienHeKhachHang/' + url)
             .then(function (response) {
                 if (response.data) {
                     $scope.arrayLH = response.data;
                     $scope.arrayLHFinded = $scope.arrayLH.map(function (item) {
                         return item;
                     });
                 }
             }, function (error) {
                 console.log(error);
             });
    }
    $scope.lienhekh(url)


    //hàm tìm kiếm
    $scope.onLienHeFind = function () {
        if (!$scope.NGUOI_LIEN_HE) {
            $scope.arrayLHFinded = $scope.arrayLH.map(function (item) {
                return item;
            });
        }
        $scope.arrayLHFinded = $scope.arrayLH.filter(function (item) {
            if (item.NGUOI_LIEN_HE.toLowerCase().indexOf($scope.arrayLienHe.nguoi_lien_he.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.showInfoLH = function (p_dt) {
        $scope.id_lien_he = p_dt.ID_LIEN_HE;
        $scope.nguoi_lien_he = p_dt.NGUOI_LIEN_HE;
        $scope.email_ca_nhan = p_dt.EMAIL_CA_NHAN;
        $scope.sdt1 = p_dt.SDT1;
        $scope.email_cong_ty = p_dt.EMAIL_CONG_TY;
        $scope.showtable_id_lien_he = false;
    }

    $scope.CreateNewFromKH = function () {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        var username = $('#username').val();
        var tongtien = parseInt($('#tongtienbaogia').text());
        $scope.BANGBAOGIA = {
            SALES_BAO_GIA: username,
            MA_KHACH_HANG: url,
            LIEN_HE_KHACH_HANG: $scope.id_lien_he,
            PHUONG_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
            HAN_THANH_TOAN: $scope.han_thanh_toan,
            HIEU_LUC_BAO_GIA: $scope.hieu_luc_bao_gia,
            DIEU_KHOAN_THANH_TOAN: $scope.dieu_khoan_thanh_toan,
            PHI_VAN_CHUYEN: $scope.phivanchuyen,
            TONG_TIEN: $scope.tong_gia_tri_theo_hop_dong_new,
            TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_new,
            GIA_TRI_THUC_THU_TU_KHACH: $scope.tong_gia_tri_thu_cua_khach_new,
            TONG_GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_new,
            TONG_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_new,
            THUC_NHAN_CUA_KHACH: $scope.tong_khach_nhan_new,
            DA_DUYET: false,
            DA_TRUNG: false,
            DA_HUY: false,
            TRUC_THUOC: 'HOPLONG',
            DANG_CHO_PHAN_HOI: true,
            THUE_SUAT_GTGT: $scope.thue_suat_gtgt,
            TIEN_THUE_GTGT: $scope.thue_vat_new,
        };

        $scope.arrayBaoGiaChiTiet = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {


            var BaoGiaChiTiet = {
                MA_HANG: $scope.Detail.ListNew[i].ma_hang,
                MA_DIEU_CHINH: $scope.Detail.ListNew[i].ma_dieu_chinh,
                TEN_HANG: $scope.Detail.ListNew[i].ten_hang,
                HANG_SP: $scope.Detail.ListNew[i].hang,
                SO_LUONG: $scope.Detail.ListNew[i].so_luong,
                DVT: $scope.Detail.ListNew[i].dvt,
                DON_GIA: $scope.Detail.ListNew[i].don_gia_ban,
                THANH_TIEN: $scope.Detail.ListNew[i].thanh_tien,
                THANH_TIEN_NET: $scope.Detail.ListNew[i].thanh_tien_net,
                THOI_GIAN_GIAO_HANG: $scope.Detail.ListNew[i].thoi_gian_giao_hang,
                GIA_LIST: parseFloat($scope.Detail.ListNew[i].gia_list),
                CHIET_KHAU: $scope.Detail.ListNew[i].chiet_khau,
                DON_GIA_NHAP: parseFloat($scope.Detail.ListNew[i].gia_nhap),
                HE_SO_LOI_NHUAN: $scope.Detail.ListNew[i].he_so_loi_nhuan,
                DON_GIA_BAO_DI_NET: $scope.Detail.ListNew[i].gia_bao_di_net,
                GHI_CHU: $scope.Detail.ListNew[i].ghi_chu,
                CM: $scope.Detail.ListNew[i].hoa_hong,
                DON_GIA_MOI: $scope.Detail.ListNew[i].don_gia_ban,
                THUE_TNDN: $scope.Detail.ListNew[i].thue_tndn,
                TIEN_THUE_TNDN: $scope.Detail.ListNew[i].tien_thue_tndn,
                KHACH_NHAN_DUOC: $scope.Detail.ListNew[i].khach_nhan,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayBaoGiaChiTiet.push(BaoGiaChiTiet);
        }

        //Lưu vào CSDL
        $http.post("/api/Api_BaoGia/BaoGiaTuKhach", $scope.BANGBAOGIA)
            .then(function successCallback(response) {
                $scope.BANGBAOGIA = response.data;
                if (!$scope.BANGBAOGIA) {
                    ErrorSystem("Không lưu được thông tin chung của báo giá");
                    return;
                }
                $scope.BANGBAOGIA.SO_BAO_GIA;

                for (var i = 0; i < $scope.arrayBaoGiaChiTiet.length; i++) {
                    $scope.arrayBaoGiaChiTiet[i].SO_BAO_GIA = $scope.BANGBAOGIA.SO_BAO_GIA;
                }


                if ($scope.arrayBaoGiaChiTiet.length > 0) {
                    $http.post("/api/ApiChiTietBaoGia/PostKH_LIEN_HE", $scope.arrayBaoGiaChiTiet)
                        .then(function successCallback(response) {
                            SuccessSystem("Lưu thành công!");
                            $scope.createnewPOvalue = true;
                            $(function () {
                                setTimeout(function () {
                                    window.location.href = "/KinhDoanh/BaoGia/BaoGiaHome";

                                }, 2000);
                            });
                        }, function errorCallback(response) {
                            ErrorSystem("Không lưu được chi tiết của báo giá");
                        });
                    return;
                }

            }, function errorCallback(response) {
                console.log(response);
                ErrorSystem("Sự cố hệ thống, Không lưu được phiếu báo giá, Bạn vui lòng liên hệ với admin để khắc phục");
            });
    }

    $scope.CreateNewPOFromKH = function () {
        var username = $('#username').val();
        var so_tien_viet_bang_chu = docso($scope.tong_gia_tri_theo_hop_dong_new);
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {


            var ChiTietBaoGia = {
                MA_HANG: $scope.Detail.ListNew[i].ma_hang,
                MA_DIEU_CHINH: $scope.Detail.ListNew[i].ma_dieu_chinh,
                DVT: $scope.Detail.ListNew[i].dvt,
                SO_LUONG: $scope.Detail.ListNew[i].so_luong,
                DON_GIA: $scope.Detail.ListNew[i].don_gia_ban,
                THANH_TIEN_HANG: $scope.Detail.ListNew[i].thanh_tien,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }
        $scope.Bao_Gia = {
            MA_KHACH_HANG: url,
            TEN_LIEN_HE: $scope.nguoi_lien_he,
            HINH_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
            TONG_TIEN_THANH_TOAN: $scope.tong_gia_tri_thu_cua_khach_new,
            TONG_TIEN_HANG: $scope.tong_gia_tri_thuc_te_new,
            TONG_TIEN_THUE_GTGT: $scope.thue_vat_new,
            SO_TIEN_VIET_BANG_CHU: docso($scope.tong_gia_tri_thu_cua_khach_new),
            THUE_SUAT_GTGT: $scope.thue_suat_gtgt,
            TRUC_THUOC: 'HOPLONG',
            DA_BAN_HANG: false,
            NHAN_VIEN_QUAN_LY: username,
            SO_BAO_GIA : $scope.BANGBAOGIA.SO_BAO_GIA,
            NGAY_GIAO_HANG: $scope.ngay_giao_hang,
            DIA_DIEM_GIAO_HANG: $scope.dia_diem_giao_hang,
            CAN_XUAT_NGAY: $scope.can_xuat_ngay,
            CAN_LAY_HOA_DON: $scope.can_lay_hoa_don,
            ChiTietPO: $scope.arrayChiTietBaoGia,
        };

        //Lưu vào CSDL



        $http({
            method: 'POST',
            data: $scope.Bao_Gia,
            url: window.location.origin + '/api/Api_DonHangPO/PostDon_Hang_PO'
        }).then(function successCallback(response) {
            SuccessSystem('Bạn đã tạo thành công 1 đơn PO có mã là ' + response.data);
            $scope.PhuongAnKD = {
                    MA_SO_PO : response.data,
                    PHIEU_BAO_GIA: $scope.BANGBAOGIA.SO_BAO_GIA,
                    MA_KHACH_HANG: url,
                    NOI_DUNG_PAKD: $scope.noi_dung_phuong_an_kinh_doanh,
                    TONG_GIA_TRI_VTHH_DAU_VAO: $scope.tong_gia_tri_vthh_dau_vao,
                    CHI_PHI_KHAC: $scope.phivanchuyen,
                    TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_new,
                    TONG_GIA_TRI_DON_HANG_THEO_PHIEU_XUAT_HOP_DONG: $scope.tong_gia_tri_theo_hop_dong_new,
                    GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_new,
                    CHI_PHI_HOA_DON: 20,
                    TIEN_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_new,
                    THUE_VAT: $scope.thue_suat_gtgt,
                    TIEN_THUE_VAT: $scope.thue_vat_new,
                    TONG_GIA_TRI_THU_CUA_KHACH: $scope.tong_gia_tri_thu_cua_khach_new,
                    LOI_NHUAN_THUAN: $scope.loi_nhuan_thuan,
                    CHIET_KHAU_CHO_KHACH: $scope.tong_khach_nhan_new,
                    THANH_TOAN_KHI_DAT_HANG: $scope.thanh_toan_khi_dat_hang,
                    THANH_TOAN_SAU_GIAO_HANG: $scope.thanh_toan_sau_giao_hang,
                    HINH_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
                    HOA_DON_CHUNG_TU: $scope.hoa_don_chung_tu,
                    CONG_NO: $scope.dieu_khoan_thanh_toan,
                    TRUC_THUOC: 'HOPLONG',
                    NHAN_VIEN_QUAN_LY: username,
                }

                $http({
                    method: 'POST',
                    data: $scope.PhuongAnKD,
                    url: window.location.origin + '/api/Api_PhuongAnKinhDoanh/PostBH_PHUONG_AN_KINH_DOANH'
                }).then(function successCallback(response) {
                    SuccessSystem('Bạn đã tạo thành công 1 đơn PO có mã là ' + response.data.MA_SO_PAKD);

                }, function errorCallback(response) {
                    console.log(response);
                    ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
                });
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
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

        $http.get('/api/Api_KH/GetCT_KH/' + url).then(function (response) {
            $scope.list_chitietkhachhangnew = response.data;
        });
    };
    $scope.new_ct_khachhang();


    $scope.CreateNewBaoGiaFromBaoGia = function () {

        var username = $('#username').val();

        $scope.BANGBAOGIA = {
            SALES_BAO_GIA: username,
            MA_KHACH_HANG: $scope.ma_khach_hang,
            LIEN_HE_KHACH_HANG: $scope.id_lien_he,
            PHUONG_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
            HAN_THANH_TOAN: $scope.han_thanh_toan,
            HIEU_LUC_BAO_GIA: $scope.hieu_luc_bao_gia,
            DIEU_KHOAN_THANH_TOAN: $scope.dieu_khoan_thanh_toan,
            PHI_VAN_CHUYEN: $scope.phivanchuyen,
            TONG_TIEN: $scope.tong_gia_tri_theo_hop_dong_new,
            TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_new,
            GIA_TRI_THUC_THU_TU_KHACH: $scope.tong_gia_tri_thu_cua_khach_new,
            TONG_GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_new,
            TONG_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_new,
            THUC_NHAN_CUA_KHACH: $scope.tong_khach_nhan_new,
            DA_DUYET: false,
            DA_TRUNG: false,
            DA_HUY: false,
            TRUC_THUOC: 'HOPLONG',
            DANG_CHO_PHAN_HOI: true,
            THUE_SUAT_GTGT: $scope.thue_suat_gtgt,
            TIEN_THUE_GTGT: $scope.thue_vat_new,
        };

        $scope.arrayBaoGiaChiTiet = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {


            var BaoGiaChiTiet = {
                MA_HANG: $scope.Detail.ListNew[i].ma_hang,
                MA_DIEU_CHINH: $scope.Detail.ListNew[i].ma_dieu_chinh,
                TEN_HANG: $scope.Detail.ListNew[i].ten_hang,
                HANG_SP: $scope.Detail.ListNew[i].hang,
                SO_LUONG: $scope.Detail.ListNew[i].so_luong,
                DVT: $scope.Detail.ListNew[i].dvt,
                DON_GIA: $scope.Detail.ListNew[i].don_gia_ban,
                THANH_TIEN: $scope.Detail.ListNew[i].thanh_tien,
                THANH_TIEN_NET: $scope.Detail.ListNew[i].thanh_tien_net,
                THOI_GIAN_GIAO_HANG: $scope.Detail.ListNew[i].thoi_gian_giao_hang,
                GIA_LIST: parseFloat($scope.Detail.ListNew[i].gia_list),
                CHIET_KHAU: $scope.Detail.ListNew[i].chiet_khau,
                DON_GIA_NHAP: parseFloat($scope.Detail.ListNew[i].gia_nhap),
                HE_SO_LOI_NHUAN: $scope.Detail.ListNew[i].he_so_loi_nhuan,
                DON_GIA_BAO_DI_NET: $scope.Detail.ListNew[i].gia_bao_di_net,
                GHI_CHU: $scope.Detail.ListNew[i].ghi_chu,
                CM: $scope.Detail.ListNew[i].hoa_hong,
                DON_GIA_MOI: $scope.Detail.ListNew[i].don_gia_ban,
                THUE_TNDN: $scope.Detail.ListNew[i].thue_tndn,
                TIEN_THUE_TNDN: $scope.Detail.ListNew[i].tien_thue_tndn,
                KHACH_NHAN_DUOC: $scope.Detail.ListNew[i].khach_nhan,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayBaoGiaChiTiet.push(BaoGiaChiTiet);
        }

        //Lưu vào CSDL
        $http.post("/api/Api_BaoGia/BaoGiaTuKhach", $scope.BANGBAOGIA)
            .then(function successCallback(response) {
                $scope.BANGBAOGIA = response.data;
                if (!$scope.BANGBAOGIA) {
                    ErrorSystem("Không lưu được thông tin chung của báo giá");
                    return;
                }
                $scope.BANGBAOGIA.SO_BAO_GIA;

                for (var i = 0; i < $scope.arrayBaoGiaChiTiet.length; i++) {
                    $scope.arrayBaoGiaChiTiet[i].SO_BAO_GIA = $scope.BANGBAOGIA.SO_BAO_GIA;
                }


                if ($scope.arrayBaoGiaChiTiet.length > 0) {
                    $http.post("/api/ApiChiTietBaoGia/PostKH_LIEN_HE", $scope.arrayBaoGiaChiTiet)
                        .then(function successCallback(response) {
                            SuccessSystem("Lưu thành công!");
                            $scope.createnewPOvalue = true;
                        }, function errorCallback(response) {
                            ErrorSystem("Không lưu được chi tiết của báo giá");
                        });
                    return;
                }

            }, function errorCallback(response) {
                console.log(response);
                ErrorSystem("Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục");
            });
    }

    $scope.CreatePONewFromBaoGia = function () {
        var username = $('#username').val();
        var so_tien_viet_bang_chu = docso($scope.tong_gia_tri_theo_hop_dong_new);
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);

        $scope.arrayChiTietBaoGia = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {


            var ChiTietBaoGia = {
                MA_HANG: $scope.Detail.ListNew[i].ma_hang,
                MA_DIEU_CHINH: $scope.Detail.ListNew[i].ma_dieu_chinh,
                DVT: $scope.Detail.ListNew[i].dvt,
                SO_LUONG: $scope.Detail.ListNew[i].so_luong,
                DON_GIA: $scope.Detail.ListNew[i].don_gia_ban,
                THANH_TIEN_HANG: $scope.Detail.ListNew[i].thanh_tien,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBaoGia.push(ChiTietBaoGia);
        }
        $scope.Bao_Gia = {
            MA_KHACH_HANG: $scope.ma_khach_hang,
            TEN_LIEN_HE: $scope.nguoi_lien_he,
            HINH_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
            TONG_TIEN_THANH_TOAN: $scope.tong_gia_tri_thu_cua_khach_new,
            TONG_TIEN_HANG: $scope.tong_gia_tri_thuc_te_new,
            TONG_TIEN_THUE_GTGT: $scope.thue_vat_new,
            SO_TIEN_VIET_BANG_CHU: docso($scope.tong_gia_tri_thu_cua_khach_new),
            THUE_SUAT_GTGT: $scope.thue_suat_gtgt,
            TRUC_THUOC: 'HOPLONG',
            DA_BAN_HANG: false,
            NHAN_VIEN_QUAN_LY: username,
            SO_BAO_GIA: $scope.BANGBAOGIA.SO_BAO_GIA,
            NGAY_GIAO_HANG: $scope.ngay_giao_hang,
            DIA_DIEM_GIAO_HANG: $scope.dia_diem_giao_hang,
            CAN_XUAT_NGAY: $scope.can_xuat_ngay,
            CAN_LAY_HOA_DON: $scope.can_lay_hoa_don,
            ChiTietPO: $scope.arrayChiTietBaoGia,
        };

        //Lưu vào CSDL



        $http({
            method: 'POST',
            data: $scope.Bao_Gia,
            url: window.location.origin + '/api/Api_DonHangPO/PostDon_Hang_PO'
        }).then(function successCallback(response) {
            SuccessSystem('Bạn đã tạo thành công 1 đơn PO có mã là ' + response.data);
            $scope.PhuongAnKD = {
                MA_SO_PO: response.data,
                PHIEU_BAO_GIA: $scope.BANGBAOGIA.SO_BAO_GIA,
                MA_KHACH_HANG: $scope.ma_khach_hang,
                NOI_DUNG_PAKD: $scope.noi_dung_phuong_an_kinh_doanh,
                TONG_GIA_TRI_VTHH_DAU_VAO: $scope.tong_gia_tri_vthh_dau_vao,
                CHI_PHI_KHAC: $scope.phivanchuyen,
                TONG_GIA_TRI_DON_HANG_THUC_TE: $scope.tong_gia_tri_thuc_te_new,
                TONG_GIA_TRI_DON_HANG_THEO_PHIEU_XUAT_HOP_DONG: $scope.tong_gia_tri_theo_hop_dong_new,
                GIA_TRI_CHENH_LECH: $scope.gia_tri_chenh_lech_new,
                CHI_PHI_HOA_DON: 20,
                TIEN_CHI_PHI_HOA_DON: $scope.tong_chi_phi_hoa_don_new,
                THUE_VAT: $scope.thue_suat_gtgt,
                TIEN_THUE_VAT: $scope.thue_vat_new,
                TONG_GIA_TRI_THU_CUA_KHACH: $scope.tong_gia_tri_thu_cua_khach_new,
                LOI_NHUAN_THUAN: $scope.loi_nhuan_thuan,
                CHIET_KHAU_CHO_KHACH: $scope.tong_khach_nhan_new,
                THANH_TOAN_KHI_DAT_HANG: $scope.thanh_toan_khi_dat_hang,
                THANH_TOAN_SAU_GIAO_HANG: $scope.thanh_toan_sau_giao_hang,
                HINH_THUC_THANH_TOAN: $scope.phuong_thuc_thanh_toan,
                HOA_DON_CHUNG_TU: $scope.hoa_don_chung_tu,
                CONG_NO: $scope.dieu_khoan_thanh_toan,
                TRUC_THUOC: 'HOPLONG',
                NHAN_VIEN_QUAN_LY: username,
            }

            $http({
                method: 'POST',
                data: $scope.PhuongAnKD,
                url: window.location.origin + '/api/Api_PhuongAnKinhDoanh/PostBH_PHUONG_AN_KINH_DOANH'
            }).then(function successCallback(response) {
                SuccessSystem('Bạn đã tạo thành công 1 đơn PO có mã là ' + response.data.MA_SO_PAKD);

            }, function errorCallback(response) {
                console.log(response);
                ErrorSystem('Sự cố hệ thống, Không thêm được phương án kinh doanh');
            });
        }, function errorCallback(response) {
            console.log(response);
            ErrorSystem('Sự cố hệ thống, Không thêm được đơn PO');
        });
    };

















    window.setInterval(function () {
        // List bao gia kinh doanh
        $http.post('/api/Api_BaoGia/ListBaoGia/' + isadmin + '/' + username).then(function (response) {
            $scope.ds_baogia_kinhdoanh = response.data;
        });

        // List bao gia kinh doanh da huy
        $http.post('/api/Api_BaoGia/ListBaoGiaDaHuy/' + isadmin + '/' + username).then(function (response) {
            $scope.ds_baogia_kinhdoanh_dahuy = response.data;
        });

        // List bao gia kinh doanh that bai
        $http.post('/api/Api_BaoGia/ListBaoGiaThatBai/' + isadmin + '/' + username).then(function (response) {
            $scope.ds_baogia_kinhdoanh_thatbai = response.data;
        });

        // List bao gia kinh doanh dang cho phan hoi
        $http.post('/api/Api_BaoGia/ListBaoGiaDangChoPhanHoi/' + isadmin + '/' + username).then(function (response) {
            $scope.ds_baogia_kinhdoanh_dangchophanhoi = response.data;
        });

        // List bao gia kinh doanh da len PO
        $http.post('/api/Api_BaoGia/ListBaoGiaDaLenPO/' + isadmin + '/' + username).then(function (response) {
            $scope.ds_baogia_kinhdoanh_dalenPO = response.data;
        });

        // List bao gia kinh doanh thanh cong
        $http.post('/api/Api_BaoGia/ListBaoGiaThanhCong/' + isadmin + '/' + username).then(function (response) {
            $scope.ds_baogia_kinhdoanh_thanhcong = response.data;
        });
    }, 5000);

    // List bao gia kinh doanh
    $http.post('/api/Api_BaoGia/ListBaoGia/' + isadmin + '/' + username).then(function (response) {
        $scope.ds_baogia_kinhdoanh = response.data;
    });

    // List bao gia kinh doanh da huy
    $http.post('/api/Api_BaoGia/ListBaoGiaDaHuy/' + isadmin + '/' + username).then(function (response) {
        $scope.ds_baogia_kinhdoanh_dahuy = response.data;
    });

    // List bao gia kinh doanh that bai
    $http.post('/api/Api_BaoGia/ListBaoGiaThatBai/' + isadmin + '/' + username).then(function (response) {
        $scope.ds_baogia_kinhdoanh_thatbai = response.data;
    });

    // List bao gia kinh doanh dang cho phan hoi
    $http.post('/api/Api_BaoGia/ListBaoGiaDangChoPhanHoi/' + isadmin + '/' + username).then(function (response) {
        $scope.ds_baogia_kinhdoanh_dangchophanhoi = response.data;
    });

    // List bao gia kinh doanh da len PO
    $http.post('/api/Api_BaoGia/ListBaoGiaDaLenPO/' + isadmin + '/' + username).then(function (response) {
        $scope.ds_baogia_kinhdoanh_dalenPO = response.data;
    });

    // List bao gia kinh doanh thanh cong
    $http.post('/api/Api_BaoGia/ListBaoGiaThanhCong/' + isadmin + '/' + username).then(function (response) {
        $scope.ds_baogia_kinhdoanh_thanhcong = response.data;
    });


    // Chon khach hang bao gia moi

    $scope.arrayNewKH_BaoGiaFinded = [];
    $scope.arrayKH_BaoGia = [];
    $scope.showtable_KH_BaoGia = false;

    $http.post(window.location.origin + '/api/Api_BaoGia/KhachHangTheoSale/' + username + '/' + isadmin)
     .then(function (response) {
         if (response.data) {
             $scope.arrayKH_BaoGia = response.data;
             $scope.arrayNewKH_BaoGiaFinded = $scope.arrayKH_BaoGia.map(function (item) {
                 return item;
             });
         }
     }, function (error) {
         console.log(error);
     });
    //hàm tìm kiếm
    $scope.onKH_BaoGiaFind = function () {
        if (!$scope.TEN_CONG_TY) {
            $scope.arrayNewKH_BaoGiaFinded = $scope.arrayKH_BaoGia.map(function (item) {
                return item;
            });
        }
        $scope.arrayNewKH_BaoGiaFinded = $scope.arrayKH_BaoGia.filter(function (item) {
            if (item.TEN_CONG_TY.toLowerCase().indexOf($scope.ten_cong_ty.toLowerCase()) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    // hiển thị danh sách đổi tượng(LẤY THEO MÃ)
    $scope.showInfoKH_BaoGia = function (p_dt) {
        $scope.ten_cong_ty = p_dt.TEN_CONG_TY;
        $scope.ma_khach_hang = p_dt.MA_KHACH_HANG;
        $scope.van_phong_giao_dich = p_dt.VAN_PHONG_GIAO_DICH;
        $scope.dia_chi_xuat_hoa_don = p_dt.DIA_CHI_XUAT_HOA_DON;
        $scope.hotline = p_dt.HOTLINE;
        $scope.showtable_KH_BaoGia = false;
        $scope.lienhekh(p_dt.MA_KHACH_HANG)
    }


    

});

app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;


            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });


            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
                return plainNumber;
            });
        }
    };
}]);