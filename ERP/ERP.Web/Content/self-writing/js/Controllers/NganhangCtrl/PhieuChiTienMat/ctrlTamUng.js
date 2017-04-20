
    app.controller('ctrlTamUng', ctrlTamUng);
    ctrlTamUng.$inject = ['$scope', "$location", '$http', '$uibModal'];
    function ctrlTamUng($scope, $location, $http, $uibModal) {
        //array tổng hợp
        $scope.arrayTongHop = {
            ma_doi_tuong: '',
            ma_cong_ty: '',
            ten_doi_tuong: '',
            nguoi_nhan: '',
            dia_chi: '',
            ten_ngan_hang: '',
            ly_do_thu: '',
            dien_giai_ly_do_chi: '',
            nhan_vien_chi: '',
            HO_VA_TEN: '',
            ma_phong_ban: '',
            nguoi_lap_bieu: '',
            ho_va_ten_lap_bieu: '',
            ngay_hach_toan: '',
            ngay_chung_tu: '',
            tong_tien: 0
        };


        $scope.arraydiengiai = [{
            loai_tien: '',
            ty_gia: '',
            tk_no: '',
            tk_co: '',
            so_tien: '',
            quy_doi: '',
            diengiai: '',
            tk_ngan_hang: ''
        }];

        $scope.arrayCTTC = [];

        $scope.indexcurrent = 0;

        //method change type reason.
        $scope.reasonmoney = 'TamUng';


        //mảng đối tượng
        $scope.arrayDTFinded = [];
        $scope.arrayDT = [];
        $scope.showtable_ma_doi_tuong = false;
        $scope.hovertable = false;
        $scope.hoverbtn_MDT = false;

        //save value TK ngân hàng
        $scope.arrayBanks = [];
        $scope.sotk_no = '';
        $scope.sotk_co = '';
        $scope.loadedDMTKTD = false;


        //save nhân viên
        $scope.arrayStaffs = [];
        $scope.staffThu = '';

        //phần tham chiếu chứng từ:
        $scope.usingchoise_CTTC = true;
        $scope.chung_tu_selected = '';

        //nguoi lạp bieu
        $scope.staffLapBieu = '';

        //array tk hack toan
        $scope.arrayBankHackToan = [];
        $scope.bankTKNo = {};
        $scope.bankTKCo = {};

        //chứng từ tham chiếu
        $scope.ma_chung_tu_tham_chieu = '';

        //nhà cung cấp
        $scope.arrayNCC = [];

        /**
       *Tìm Tài khoản tự động
       */
        $http.get(window.location.origin + '/api/DM_DINH_KHOAN_TU_DONG/MA_LOAI_CHUNG_TU/CHI')
         .then(function (response) {
             if (response.data) {
                 $scope.sotk_no = response.data.tk_no;
                 $scope.sotk_co = response.data.tk_co;
                 $scope.arraydiengiai[$scope.indexcurrent].tk_co = $scope.sotk_co;
                 $scope.arraydiengiai[$scope.indexcurrent].tk_no = $scope.sotk_no;
                 $scope.loadedDMTKTD = true;
             } else {
                 $scope.loadedDMTKTD = true;
             }
         }, function (error) {
             $scope.loadedDMTKTD = true;
         });

        /*
        * get Đối Tượng
        */
        $http.get(window.location.origin + '/api/Api_DM_DOI_TUONG')
         .then(function (response) {
             if (response.data) {
                 $scope.arrayDT = response.data;
                 $scope.arrayDTFinded = $scope.arrayDT.map(function (item) {
                     return item;
                 });
             }
         }, function (error) {
             console.log(error);
         });

        /**
        * get tk ngân hàng
        */
        $http.get(window.location.origin + '/api/Api_DM_TK_NGAN_HANG_NOI_BO')
            .then(function (response) {
                if (response.data) {
                    $scope.arrayBanks = response.data;
                }
            }, function (error) {
                console.log(error);
            });

        /**
        * get nhan viên
        */
        $http.get(window.location.origin + '/api/NGUOI_DUNG_FULL')
            .then(function (response) {
                if (response.data) {
                    $scope.arrayStaffs = response.data;
                }
            }, function (error) {
                console.log(error);
            });

        /**
        * get tài khoản hạch toán
        */
        $http.get(window.location.origin + '/api/Api_TaiKhoanHachToan')
            .then(function (response) {
                if (response.data) {
                    $scope.arrayBankHackToan = response.data;
                }
            }, function (error) {
                console.log(error);
            });

        /**
        * get nhà cung cấp
        */
        $http.get(window.location.origin + '/api/Api_NCCs')
           .then(function (response) {
               if (response.data) {
                   $scope.arrayNCC = response.data;
               }
           }, function (error) {
               console.log(error);
           });

        /**
        *loc dữ liệu khi input thay đổi
        */
        $scope.onDoiTuongFind = function () {
            if (!$scope.TEN_DOI_TUONG) {
                $scope.arrayDTFinded = $scope.arrayDT.map(function (item) {
                    return item;
                });
            }
            $scope.arrayDTFinded = $scope.arrayDT.filter(function (item) {
                if (item.TEN_DOI_TUONG.toLowerCase().indexOf($scope.arrayTongHop.ma_doi_tuong.toLowerCase()) >= 0) {
                    return true;
                } else {
                    return false;
                }
            });
        }
        $scope.onBlurInput_MDT = function () {
            if ($scope.hoverbtn_MDT || $scope.hovertable_MDT) {
                return;
            }
            $scope.showtable_ma_doi_tuong = false;
        }

        /**
            *Show tên nhân viên
        */
        $scope.showInfoStaff = function (p_staff) {
            $scope.arrayTongHop.nhan_vien_chi = p_staff.USERNAME;
            $scope.arrayTongHop.HO_VA_TEN = p_staff.HO_VA_TEN;
            $scope.arrayTongHop.ma_phong_ban = p_staff.MA_PHONG_BAN;
        }


        /*
        * Method Change Lý Do Thu
        */
        $scope.changeType = function ($event) {
            window.location.href = window.location.origin + '/PhieuChiTienMat/' + $scope.reasonmoney;
        };

        /*
        * method show info Đối Tượng Khi user lựa chọn.
        */
        $scope.showInfoDT = function (p_dt) {
            $scope.arrayTongHop.ma_doi_tuong = p_dt.MA_DOI_TUONG;
            $scope.arrayTongHop.ma_cong_ty = p_dt.MA_CONG_TY;
            $scope.arrayTongHop.ten_doi_tuong = p_dt.TEN_DOI_TUONG;
            $scope.arrayTongHop.dia_chi = p_dt.DIA_CHI;
            $scope.hovertable = false;
            $scope.showtable_ma_doi_tuong = false;
        }

        /**
        * method show thông tin tk
        */
        //$scope.showInfoTK = function (p_bank) {
        //    $scope.arrayTongHop.so_tk_nop = p_bank.so_tai_khoan;
        //    $scope.arrayTongHop.ten_ngan_hang = p_bank.ten_ngan_hang;
        //}

        /**
        * saff nhập biểu
        */
        $scope.setStaffLapBieu = function (p_staff) {
            $scope.arrayTongHop.nguoi_lap_bieu = p_staff.USERNAME;
            $scope.arrayTongHop.ho_va_ten_lap_bieu = p_staff.HO_VA_TEN;
        }

        /**
        *chọn tk nợ
        */
        $scope.showInfoTKNo = function (p_tkno) {
            $scope.arraydiengiai[$scope.indexcurrent].tk_no = p_tkno.SO_TK;
        }

        /**
        * chọn tk có
        */
        $scope.showInfoTKCo = function (p_tkco) {
            $scope.arraydiengiai[$scope.indexcurrent].tk_co = p_tkco.SO_TK;
        }

        /**
      * chọn tai khoan ngan hang
      */
        $scope.showInfoTKNH = function (p_bank) {
            $scope.arraydiengiai[$scope.indexcurrent].tk_ngan_hang = p_bank.SO_TAI_KHOAN;
        }

        /**
       * Thêm mới code
       */
        $scope.addTongHop = function () {
            if (!$scope.loadedDMTKTD) {
                alert('Đang tải dữ liệu');
                return;
            }
            $scope.arraydiengiai.push({
                loai_tien: '',
                ty_gia: '',
                tk_no: $scope.sotk_no,
                tk_co: $scope.sotk_co,
                so_tien: '',
                quy_doi: '',
                diengiai: '',
                tk_ngan_hang: ''
            });
            $scope.indexcurrent = $scope.arraydiengiai.length - 1;
        }

        $scope.onChangeIndex = function (p_index) {
            $scope.indexcurrent = p_index;
        }


        /**
        * Chứng từ tham chiếu
        */
        $scope.animationsEnabled = true;
        //based on size parameter the size of modal chages.
        $scope.openModal = function () {
            $scope.modalPopup().then(function (data) {
                $scope.handleSuccess(data);
            })
                  .then(null, function (reason) {
                      $scope.handleDismiss(reason);
                  });
        };

        $scope.modalPopup = function () {
            var ModalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'CTTC.html',
                controller: 'ctrlCTTC',
                //appendTo:     //appends the modal to a element
                backdrop: false,  //disables modal closing by click on the background
                //size:size,
                //template: 'myModal.html',
                //keyboard:true,     //dialog box is closed by hitting ESC key
                //openedClass:'nameofClass',  //class styles are applyed after dialog opens.
                resolve: {
                    items: function () {
                        //we can send data from here to controller using resolve...
                        return $scope.arrayCTTC;
                    }
                }
                //windowClass:'AddtionalClass',   //class that is added to styles the window template
                //windowTemplateUrl:'Modaltemplate.html',    template overrides the modal template
            });
            return ModalInstance.result;
        };

        $scope.handleSuccess = function (data) {
            $scope.usingchoise_CTTC = true;
            $scope.arrayCTTC = data;
            let t_arraycttc = '';
            $scope.arrayCTTC.map(function (item, index) {
                if (index == 0) {
                    t_arraycttc += item.ma_chung_tu;
                } else {
                    t_arraycttc += ';' + item.ma_chung_tu;
                }
            });
            $scope.ma_chung_tu_tham_chieu = t_arraycttc;
        }

        $scope.handleDismiss = function (reason) {
            $scope.usingchoise_CTTC = false;
            console.log('Modal dismissed: ' + reason);
        }

        $scope.onSave = function () {
            if (!$scope.arrayTongHop.ma_doi_tuong) {
                alert('Thiếu thông tin Mã Đối Tượng');
                return;
            }

            if (!$scope.arrayTongHop.dien_giai_ly_do_chi) {
                alert('Thiếu thông tin Diễn Giải Lý Do Chi');
                return;
            }

            if (!$scope.arrayTongHop.nguoi_lap_bieu) {
                alert('Thiếu thông tin Người Lập Biểu');
                return;
            }

            if (!$scope.arrayTongHop.ngay_hach_toan) {
                alert('Thiếu thông tin Ngày Hạch Toán');
                return;
            }

            if (!$scope.arrayTongHop.ngay_chung_tu) {
                alert('Thiếu thông tin Ngày Chứng Từ');
                return;
            }
            if ($scope.arrayTongHop.ngay_hach_toan < $scope.arrayTongHop.ngay_chung_tu) {
                alert('Ngày Hạch Toán phải lớn hơn hoặc bằng Ngày Chứng Từ');
                return;
            }

            var tongtien = 0;
            for (var i = 0; i < $scope.arraydiengiai.length; i++) {
                if (!$scope.arraydiengiai[i].loai_tien) {
                    alert('Thiếu thông tin Loại Tiền - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!$scope.arraydiengiai[i].tk_no) {
                    alert('Thiếu thông tin Tài Khoản Nợ - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!$scope.arraydiengiai[i].tk_co) {
                    alert('Thiếu thông tin Tài Khoản Có - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!$scope.arraydiengiai[i].so_tien) {
                    alert('Thiếu thông tin Số Tiền - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if ($scope.arraydiengiai[i].loai_tien == 'VND') {
                    $scope.arraydiengiai[i].ty_gia = 1;
                }

                if (!$scope.arraydiengiai[i].ty_gia) {
                    alert('Thiếu thông tin Tỷ Giá - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!$scope.arraydiengiai[i].diengiai) {
                    alert('Thiếu thông tin Diễn Giải - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }
                console.log($scope.arraydiengiai[i].so_tien);
                console.log($scope.arraydiengiai[i].ty_gia);
                $scope.arraydiengiai[i].quy_doi = $scope.arraydiengiai[i].so_tien * $scope.arraydiengiai[i].ty_gia;
                tongtien += $scope.arraydiengiai[i].quy_doi;
            }
            $scope.arrayTongHop.tong_tien = tongtien;


            $scope.Quy_Phieu_Chi = {
                NGAY_HACH_TOAN: $scope.arrayTongHop.ngay_hach_toan.format('YYYY-MM-DD'),
                NGAY_CHUNG_TU: $scope.arrayTongHop.ngay_chung_tu.format('YYYY-MM-DD'),
                MA_DOI_TUONG: $scope.arrayTongHop.ma_doi_tuong,
                NHAN_VIEN_CHI: $scope.arrayTongHop.nhan_vien_chi,
                LY_DO_CHI: 'Tạm ứng cho nhân viên',
                DIEN_GIAI_LY_DO_CHI: $scope.arrayTongHop.dien_giai_ly_do_chi,
                NGUOI_NHAN: $scope.arrayTongHop.nguoi_nhan,
                TONG_TIEN: $scope.arrayTongHop.tong_tien,
                NGUOI_LAP_BIEU: $scope.arrayTongHop.nguoi_lap_bieu,
                TRUC_THUOC: $scope.arrayTongHop.ma_cong_ty
            };

            $scope.Quy_Ct_Phieu_Chis = [];
            for (var i = 0; i < $scope.arraydiengiai.length; i++) {
                var quy_Ct_Phieu_Chi = {
                    DIEN_GIAI: $scope.arraydiengiai[i].diengiai,
                    LOAI_TIEN: $scope.arraydiengiai[i].loai_tien,
                    TY_GIA: $scope.arraydiengiai[i].ty_gia,
                    TK_NO: $scope.arraydiengiai[i].tk_no,
                    TK_CO: $scope.arraydiengiai[i].tk_co,
                    SO_TIEN: $scope.arraydiengiai[i].so_tien,
                    DON_VI: $scope.arrayTongHop.ma_phong_ban,
                    QUY_DOI: $scope.arraydiengiai[i].quy_doi,
                    MA_DOI_TUONG: $scope.arrayTongHop.ma_doi_tuong,
                    TK_NGAN_HANG: $scope.arraydiengiai[i].tk_ngan_hang,
                }
                $scope.Quy_Ct_Phieu_Chis.push(quy_Ct_Phieu_Chi);
            }

            $scope.THAM_CHIEU = [];
            for (var i = 0; i < $scope.arrayCTTC.length; i++) {
                var tHAM_CHIEU = {
                    SO_CHUNG_TU_THAM_CHIEU: $scope.arrayCTTC[i].ma_chung_tu
                }
                $scope.THAM_CHIEU.push(tHAM_CHIEU);
            }

            $http({
                method: 'POST',
                data: $scope.Quy_Phieu_Chi,
                url: window.location.origin + '/api/Api_QUY_PHIEU_CHI'
            }).then(function successCallback(response) {
                $scope.Quy_Phieu_Chi = response.data;
                if (!$scope.Quy_Phieu_Chi) {
                    alert('Tạo Lỗi 1');
                    return;
                }

                for (var i = 0; i < $scope.Quy_Ct_Phieu_Chis.length; i++) {
                    $scope.Quy_Ct_Phieu_Chis[i].SO_CHUNG_TU = $scope.Quy_Phieu_Chi.SO_CHUNG_TU;
                }

                for (var i = 0; i < $scope.THAM_CHIEU.length; i++) {
                    $scope.THAM_CHIEU[i].SO_CHUNG_TU_GOC = $scope.Quy_Phieu_Chi.SO_CHUNG_TU;
                }

                if ($scope.Quy_Ct_Phieu_Chis.length > 0) {
                    $http({
                        method: 'POST',
                        data: $scope.Quy_Ct_Phieu_Chis,
                        url: window.location.origin + '/api/Api_QUY_CT_PHIEU_CHI/Multi'
                    }).then(function successCallback(response1) {
                        if ($scope.THAM_CHIEU.length > 0) {
                            $http({
                                method: 'POST',
                                data: $scope.THAM_CHIEU,
                                url: window.location.origin + '/api/Api_XL_THAM_CHIEU_CHUNG_TU/Multi'
                            }).then(function successCallback(response) {
                                alert("Hoàn Thành Lưu");
                            }, function errorCallback(response) {
                                alert('Tạo Lỗi3');
                            });
                        } else {
                            alert("Hoàn Thành Lưu");
                        }
                    }, function errorCallback(response1) {
                        alert('Tạo Lỗi2');
                    });
                    return;
                }

                if ($scope.THAM_CHIEU.length > 0) {
                    $http({
                        method: 'POST',
                        data: $scope.THAM_CHIEU,
                        url: window.location.origin + '/api/Api_XL_THAM_CHIEU_CHUNG_TU/Multi'
                    }).then(function successCallback(response) {
                        alert("Hoàn Thành Lưu");
                    }, function errorCallback(response) {
                        alert('Tạo Lỗi3');
                    });
                } else {
                    alert("Hoàn Thành Lưu");
                }
            }, function errorCallback(response) {
                console.log(response);
                alert('Tạo Lỗi');
            });
        }

        $scope.onHuy = function () {
            window.location.href = window.location.origin + '/PhieuChiTienMat/' + $scope.reasonmoney;
        }
    }
